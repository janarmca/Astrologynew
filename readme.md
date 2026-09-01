# 🔮 தமிழ் ஜாதக வெப்சைட்

Lahiri Ayanamsa (Thirukanitha Panchangam) பயன்படுத்தி தமிழில் ஜாதகம் கணக்கிடும் இலவச வெப்சைட்.

## ✨ அம்சங்கள்

- ✅ Lahiri Ayanamsa (Thirukanitha Panchangam)
- ✅ 12 ராசி கட்டங்கள் (தென்னிந்திய முறை)
- ✅ தசா-புக்தி கணக்கீடு
- ✅ Latitude/Longitude ஆதரவு
- ✅ தமிழ் இடைமுகம்
- ✅ VedAstro API ஒருங்கிணைப்பு

## 🚀 பயன்படுத்தும் முறை

1. `index.html` மற்றும் `app.js` ஐ ஒரே கோப்புறையில் சேமிக்கவும்
2. `index.html` ஐ Browser இல் திறக்கவும்
3. பிறந்த தேதி, நேரம், ஊர், API Key உள்ளிடவும்
4. "ஜாதகம் கணக்கிடு" பட்டனை கிளிக் செய்யவும்

## 🔑 API Key

- VedAstro இலவச API Key: `FreeAPIUser`
- [vedastro.org](https://vedastro.org) இல் பதிவு செய்து API Key பெறவும்

## 📐 Ayanamsa

- **Lahiri Ayanamsa** (Thirukanitha Panchangam) - தமிழ்நாட்டில் மிகவும் பரவலானது
- API இல் `Ayanamsa: "LAHIRI"` பயன்படுத்தப்படுகிறது

## 🧪 சோதனை

```javascript
// Browser Console இல்
await TamilHoroscope.test('25/10/1992', '14:30', 'சென்னை')
