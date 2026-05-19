# AI-Powered GeoGebra Simulation (No API Key)

Bu proje, **tam çalışan** bir GeoGebra simülasyon arayüzü sağlar:
- Tarayıcıda doğrudan GeoGebra Graphing açılır.
- Yerel (offline) kural-tabanlı bir “AI Assistant” ile doğal dilde komut verip adım üretebilirsin.
- **API key gerekmez.**

## Çalıştırma

Sadece statik dosya sunucusu ile aç:

```bash
python3 -m http.server 8080
```

Sonra tarayıcıda:

`http://localhost:8080`

## Özellikler

- GeoGebra canvas + toolbar
- Elle komut çalıştırma (ör: `f(x)=sin(x)`)
- Demo yükleme
- AI prompt ile komut planı üretme ve tek tık uygulama

## AI (Anahtarsız) Nasıl Çalışıyor?

`app.js` içinde bir local parser var. Prompt içindeki anahtar kelimelere göre GeoGebra komutları öneriyor:
- parabola
- sine/sin
- derivative/türev
- integral/alan
- random + fit/regression

Bu yüzden dış API yok, key yok, ve anında çalışır.
