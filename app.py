from pathlib import Path
import sys

import requests
from playwright.sync_api import sync_playwright

TOR_PROXY = "socks5h://127.0.0.1:9050"
CHECK_URL = "https://check.torproject.org/api/ip"
OUTPUT = Path("artifacts/tor-check.png")


def ensure_tor_proxy() -> None:
    try:
        response = requests.get(
            CHECK_URL,
            proxies={"http": TOR_PROXY, "https": TOR_PROXY},
            timeout=20,
        )
        response.raise_for_status()
        data = response.json()
        if not data.get("IsTor"):
            raise RuntimeError(
                "Tor proxyye bağlanıldı ama trafik Tor gibi görünmüyor."
            )
        print(f"Tor çıkış IP: {data.get('IP')}")
    except Exception as exc:
        raise RuntimeError(
            "Tor proxy (127.0.0.1:9050) hazır değil. Önce Tor servisini başlatın."
        ) from exc


def run_browser() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            proxy={"server": "socks5://127.0.0.1:9050"},
        )
        page = browser.new_page()
        page.goto("https://check.torproject.org/", wait_until="domcontentloaded")
        page.screenshot(path=str(OUTPUT), full_page=True)
        title = page.title()
        print(f"Açılan sayfa başlığı: {title}")
        browser.close()


if __name__ == "__main__":
    try:
        ensure_tor_proxy()
        run_browser()
        print(f"Ekran görüntüsü kaydedildi: {OUTPUT}")
    except Exception as err:
        print(f"Hata: {err}")
        sys.exit(1)
