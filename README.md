# Browser Workflow (Tor benzeri VPN/proxy)

Bu repo, tarayıcıyı bir workflow içinde **Tor SOCKS5 proxy** üzerinden açmak için örnek bir kurulum içerir.

> Not: Gerçek "built-in VPN" tarayıcı içinde sihirli bir özellik değil; genelde bir proxy/VPN servisine bağlanılır.
> Buradaki yaklaşım: Chromium + Tor SOCKS5 (`socks5://127.0.0.1:9050`).

## Kurulum

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Çalıştırma

Önce sistemde Tor servisini açın (veya Docker ile çalıştırın), sonra:

```bash
python app.py
```

Script şu adımları yapar:
1. Tor proxy erişimini kontrol eder.
2. Playwright ile Chromium'u **proxy üzerinden** başlatır.
3. `https://check.torproject.org/` sayfasını açar.
4. Ekran görüntüsünü `artifacts/tor-check.png` olarak kaydeder.

## GitHub Actions

`.github/workflows/tor-browser.yml` workflow'u:
- Ubuntu runner'da Tor ve bağımlılıkları kurar
- Scripti çalıştırır
- Ekran görüntüsünü artifact olarak yükler

