// ============================================================
// TAMIL HOROSCOPE APP - AstroVedika API (FULLY FIXED)
// API Key: 34e79705-9a11-5e56-b5ea-a189f8d60942
// ============================================================

// ✅ YOUR API KEY
const CONFIG = {
    API_KEY: '34e79705-9a11-5e56-b5ea-a189f8d60942',
    BASE_URL: 'https://api.astrovedika.com/v1',
    LANGUAGE: 'ta',
    AYANAMSA: 'lahiri'
};

// ============================================================
// 1. TAMIL NAMES
// ============================================================

const PLANET_NAMES_TAMIL = {
    'Sun': 'சூரியன்',
    'Moon': 'சந்திரன்',
    'Mars': 'செவ்வாய்',
    'Mercury': 'புதன்',
    'Jupiter': 'குரு',
    'Venus': 'சுக்கிரன்',
    'Saturn': 'சனி',
    'Rahu': 'ராகு',
    'Ketu': 'கேது'
};

const ZODIAC_SIGNS_TAMIL = [
    'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
    'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
    'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

// ============================================================
// 2. LOCATIONS
// ============================================================

const LOCATIONS = {
    'சென்னை': { name: 'Chennai', lat: 13.0827, lon: 80.2707, tz: '+05:30' },
    'மதுரை': { name: 'Madurai', lat: 9.9252, lon: 78.1198, tz: '+05:30' },
    'கோயம்புத்தூர்': { name: 'Coimbatore', lat: 11.0168, lon: 76.9558, tz: '+05:30' },
    'திருச்சி': { name: 'Tiruchirappalli', lat: 10.7905, lon: 78.7047, tz: '+05:30' },
    'சேலம்': { name: 'Salem', lat: 11.6643, lon: 78.1460, tz: '+05:30' },
    'திருநெல்வேலி': { name: 'Tirunelveli', lat: 8.7139, lon: 77.7567, tz: '+05:30' },
    'தஞ்சாவூர்': { name: 'Thanjavur', lat: 10.7870, lon: 79.1378, tz: '+05:30' },
    'புதுச்சேரி': { name: 'Puducherry', lat: 11.9416, lon: 79.8083, tz: '+05:30' },
    'காஞ்சிபுரம்': { name: 'Kanchipuram', lat: 12.8354, lon: 79.7054, tz: '+05:30' },
    'திண்டுக்கல்': { name: 'Dindigul', lat: 10.3623, lon: 77.9695, tz: '+05:30' },
    'நாகர்கோவில்': { name: 'Nagercoil', lat: 8.1780, lon: 77.4312, tz: '+05:30' },
    'கன்னியாகுமரி': { name: 'Kanyakumari', lat: 8.0883, lon: 77.5385, tz: '+05:30' },
    'வேலூர்': { name: 'Vellore', lat: 12.9165, lon: 79.1325, tz: '+05:30' },
    'ஈரோடு': { name: 'Erode', lat: 11.3410, lon: 77.7172, tz: '+05:30' },
    'தூத்துக்குடி': { name: 'Thoothukudi', lat: 8.7642, lon: 78.1348, tz: '+05:30' }
};

// ============================================================
// 3. HELPERS
// ============================================================

function getTamilSignIndex(tamilSign) {
    const map = {
        'மேஷம்': 0, 'ரிஷபம்': 1, 'மிதுனம்': 2, 'கடகம்': 3,
        'சிம்மம்': 4, 'கன்னி': 5, 'துலாம்': 6, 'விருச்சிகம்': 7,
        'தனுசு': 8, 'மகரம்': 9, 'கும்பம்': 10, 'மீனம்': 11,
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
    };
    return map[tamilSign] !== undefined ? map[tamilSign] : 0;
}

function getSignIndex(signName) {
    if (!signName) return 0;
    const map = {
        'Aries': 0, 'Taurus': 1, 'Gemini': 2, 'Cancer': 3,
        'Leo': 4, 'Virgo': 5, 'Libra': 6, 'Scorpio': 7,
        'Sagittarius': 8, 'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11,
        'மேஷம்': 0, 'ரிஷபம்': 1, 'மிதுனம்': 2, 'கடகம்': 3,
        'சிம்மம்': 4, 'கன்னி': 5, 'துலாம்': 6, 'விருச்சிகம்': 7,
        'தனுசு': 8, 'மகரம்': 9, 'கும்பம்': 10, 'மீனம்': 11
    };
    return map[signName] !== undefined ? map[signName] : 0;
}

async function getLocationCoordinates(cityName, userLat, userLon) {
    if (userLat !== undefined && userLon !== undefined) {
        return { lat: parseFloat(userLat), lon: parseFloat(userLon), name: 'Custom', tz: '+05:30' };
    }
    if (cityName && LOCATIONS[cityName]) {
        return LOCATIONS[cityName];
    }
    if (cityName) {
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;
            const response = await fetch(url, { headers: { 'User-Agent': 'TamilHoroscopeApp/1.0' } });
            const data = await response.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), name: data[0].display_name, tz: '+05:30' };
            }
        } catch (e) { console.error('Location fetch error:', e); }
    }
    throw new Error('இருப்பிட தரவு கிடைக்கவில்லை.');
}

// ============================================================
// 4. ✅ FIXED: ASTROVEDIKA API CALL
// ============================================================

async function calculateHoroscope(dob, time, city, apiKey, userLat, userLon) {
    try {
        const finalKey = apiKey || CONFIG.API_KEY;
        const location = await getLocationCoordinates(city, userLat, userLon);

        console.log('📡 Calling AstroVedika API...');

        const response = await fetch(`${CONFIG.BASE_URL}/horoscope`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': finalKey
            },
            body: JSON.stringify({
                date: dob,
                time: time,
                latitude: location.lat,
                longitude: location.lon,
                language: CONFIG.LANGUAGE,
                ayanamsa: CONFIG.AYANAMSA
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`API பிழை: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ API Response:', data);

        if (data.status !== 'success') {
            throw new Error(data.message || 'API Error');
        }

        // ✅ FIXED: Process planets
        const planetPositions = extractPlanets(data);

        // ✅ FIXED: Get Dasha
        const dashaData = await getDasha(dob, time, location, finalKey);

        return {
            status: 'success',
            planets: planetPositions,
            dasha: dashaData,
            location: location,
            birthTime: `${time} ${dob}`,
            ayanamsa: 'LAHIRI',
            lagna: data.data?.lagna || null,
            rawData: data
        };

    } catch (error) {
        console.error('Error:', error);
        return { status: 'error', message: error.message };
    }
}

// ============================================================
// 5. ✅ FIXED: EXTRACT PLANETS
// ============================================================

function extractPlanets(data) {
    const planets = {};
    
    console.log('🔍 Extracting planets from:', data);
    
    // AstroVedika Response Structure
    if (data.data) {
        // Get planets
        if (data.data.planets && Array.isArray(data.data.planets)) {
            data.data.planets.forEach(planet => {
                const planetName = planet.name || planet.Planet;
                const signName = planet.sign || planet.Sign;
                const signIndex = getSignIndex(signName);
                
                planets[planetName] = {
                    sign: signIndex,
                    signName: ZODIAC_SIGNS_TAMIL[signIndex] || signName,
                    house: planet.house || planet.House || 0,
                    degree: planet.degree || planet.Degree || 0,
                    prediction: planet.prediction || planet.Prediction || ''
                };
            });
        }
        
        // Get Lagna
        if (data.data.lagna) {
            const lagnaSign = data.data.lagna;
            const signIndex = getSignIndex(lagnaSign);
            planets['Ascendant'] = {
                sign: signIndex,
                signName: ZODIAC_SIGNS_TAMIL[signIndex] || lagnaSign,
                house: 1,
                degree: data.data.lagna_degree || 0,
                prediction: 'லக்னம்'
            };
        }
        
        // Alternative: If planets are in different format
        if (data.data.planet_positions) {
            for (const [key, value] of Object.entries(data.data.planet_positions)) {
                const signIndex = getSignIndex(value.sign);
                planets[key] = {
                    sign: signIndex,
                    signName: ZODIAC_SIGNS_TAMIL[signIndex] || value.sign,
                    house: value.house || 0,
                    degree: value.degree || 0
                };
            }
        }
    }
    
    console.log('✅ Extracted Planets:', planets);
    return planets;
}

// ============================================================
// 6. ✅ FIXED: DASHA API
// ============================================================

async function getDasha(dob, time, location, apiKey) {
    try {
        const finalKey = apiKey || CONFIG.API_KEY;
        
        const response = await fetch(`${CONFIG.BASE_URL}/dasha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': finalKey
            },
            body: JSON.stringify({
                date: dob,
                time: time,
                latitude: location.lat,
                longitude: location.lon,
                language: CONFIG.LANGUAGE,
                ayanamsa: CONFIG.AYANAMSA
            })
        });

        if (!response.ok) return null;
        
        const data = await response.json();
        console.log('📊 Dasha Response:', data);
        
        if (data.status !== 'success') return null;
        
        return {
            currentDasha: data.data?.current_dasha || data.data?.mahadasha || null,
            currentBhukti: data.data?.current_bhukti || data.data?.antardasha || null
        };

    } catch (error) {
        console.error('Dasha error:', error);
        return null;
    }
}

// ============================================================
// 7. ✅ FIXED: CHART BUILD
// ============================================================

function buildChartGrid() {
    const grid = document.getElementById('chart-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const positions = [
        { id: 'p10', pos: 'position-10' }, { id: 'p11', pos: 'position-11' },
        { id: 'p12', pos: 'position-12' }, { id: 'p9', pos: 'position-9' },
        { id: 'p1', pos: 'position-1' }, { id: 'p2', pos: 'position-2' },
        { id: 'p8', pos: 'position-8' }, { id: 'p7', pos: 'position-7' },
        { id: 'p3', pos: 'position-3' }, { id: 'p6', pos: 'position-6' },
        { id: 'p5', pos: 'position-5' }, { id: 'p4', pos: 'position-4' }
    ];

    positions.forEach((item, index) => {
        const houseNum = index + 1;
        const div = document.createElement('div');
        div.id = item.id;
        div.className = `house house-${houseNum} ${item.pos}`;
        div.innerHTML = `
            <div class="house-number">${houseNum}</div>
            <div class="house-sign" id="sign-${item.id}">${ZODIAC_SIGNS_TAMIL[houseNum - 1]}</div>
            <div class="planet-names" id="planets-${item.id}">−</div>
        `;
        grid.appendChild(div);
    });
}

// ============================================================
// 8. ✅ FIXED: DISPLAY HOROSCOPE
// ============================================================

function prepareChartData(planetData) {
    const chart = Array(12).fill(null).map(() => []);
    if (!planetData) return chart;

    for (const [planet, data] of Object.entries(planetData)) {
        if (planet === 'Ascendant') {
            if (chart[0]) {
                chart[0].push({ name: 'லக்னம்', key: 'Ascendant', isAscendant: true });
            }
            continue;
        }
        const signIndex = data.sign;
        if (signIndex !== undefined && signIndex >= 0 && signIndex < 12) {
            const tamilName = PLANET_NAMES_TAMIL[planet] || planet;
            chart[signIndex].push({ 
                name: tamilName, 
                key: planet, 
                isAscendant: false,
                prediction: data.prediction || ''
            });
        }
    }
    return chart;
}

function displayHoroscope(result) {
    if (result.status === 'error') {
        alert(`❌ பிழை: ${result.message}`);
        return;
    }

    console.log('📊 Displaying Horoscope:', result);

    const chartData = prepareChartData(result.planets);

    // Update each house
    for (let i = 0; i < 12; i++) {
        const houseId = `p${i + 1}`;
        const planetContainer = document.getElementById(`planets-${houseId}`);
        if (planetContainer) {
            const planets = chartData[i] || [];
            if (planets.length > 0) {
                planetContainer.textContent = planets.map(p => p.name).join(', ');
                planetContainer.style.color = '#34495e';
                planetContainer.style.fontWeight = '500';
            } else {
                planetContainer.textContent = '−';
                planetContainer.style.color = '#ccc';
                planetContainer.style.fontWeight = 'normal';
            }
        }
    }

    // Show Lagna
    if (result.lagna) {
        const p1 = document.getElementById('p1');
        if (p1) {
            let lagnaLabel = p1.querySelector('.lagna-label');
            if (!lagnaLabel) {
                lagnaLabel = document.createElement('div');
                lagnaLabel.className = 'lagna-label';
                p1.appendChild(lagnaLabel);
            }
            const lagnaSign = result.lagna;
            lagnaLabel.textContent = `⬆️ லக்னம்: ${lagnaSign}`;
        }
    }

    // Display Dasha
    displayDasha(result.dasha);
    
    // Display Birth Info
    displayBirthInfo(result);
    
    // ✅ FIXED: Display Predictions
    displayPredictions(result.rawData, result.planets);

    showToast('✅ ஜாதகம் கணக்கிடப்பட்டது!', 'success');
}

// ============================================================
// 9. ✅ FIXED: DISPLAY PREDICTIONS
// ============================================================

function displayPredictions(rawData, planets) {
    const container = document.getElementById('predictions-container');
    if (!container) return;

    let html = `
        <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">📜 ஜாதக பலன்கள்</h3>
    `;

    let hasPredictions = false;

    // From rawData
    if (rawData && rawData.data && rawData.data.planets) {
        rawData.data.planets.forEach(planet => {
            if (planet.prediction) {
                hasPredictions = true;
                html += `
                    <div class="prediction-card">
                        <div class="planet-name">🪐 ${planet.name || planet.Planet}</div>
                        <div class="planet-sign">${planet.sign || planet.Sign} - ${planet.house || planet.House}வது கட்டம்</div>
                        <div class="prediction-text">${planet.prediction}</div>
                    </div>
                `;
            }
        });
    }

    // From planets data
    if (planets) {
        for (const [name, data] of Object.entries(planets)) {
            if (data.prediction && name !== 'Ascendant') {
                hasPredictions = true;
                html += `
                    <div class="prediction-card">
                        <div class="planet-name">🪐 ${name}</div>
                        <div class="planet-sign">${data.signName} - ${data.house}வது கட்டம்</div>
                        <div class="prediction-text">${data.prediction}</div>
                    </div>
                `;
            }
        }
    }

    if (!hasPredictions) {
        html += `
            <div style="text-align: center; padding: 20px; color: #999;">
                <p>📖 பலன்கள் கிடைக்கவில்லை. API Response-ஐ Check செய்யவும்.</p>
                <p style="font-size: 12px; margin-top: 10px;">Debug: Console-ல் API Response-ஐ பார்க்கவும்</p>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

// ============================================================
// 10. DISPLAY DASHA
// ============================================================

function displayDasha(dashaData) {
    const container = document.getElementById('dasha-info');
    if (!container) return;

    if (!dashaData || !dashaData.currentDasha) {
        container.innerHTML = `<p style="color: #999; text-align: center; padding: 20px;">தசா தரவு கிடைக்கவில்லை</p>`;
        return;
    }

    let html = `<div class="dasha-grid">`;
    if (dashaData.currentDasha) {
        html += `
            <div class="dasha-card" style="border-left-color: #3498db;">
                <div class="label">📊 மஹாதசா</div>
                <div class="value">${dashaData.currentDasha}</div>
            </div>
        `;
    }
    if (dashaData.currentBhukti) {
        html += `
            <div class="dasha-card" style="border-left-color: #f39c12;">
                <div class="label">🔄 புக்தி</div>
                <div class="value">${dashaData.currentBhukti}</div>
            </div>
        `;
    }
    html += `</div>`;
    container.innerHTML = html;
}

function displayBirthInfo(result) {
    const container = document.getElementById('birth-info');
    if (!container || !result.location) {
        container.style.display = 'none';
        return;
    }

    const loc = result.location;
    container.style.display = 'flex';
    container.innerHTML = `
        <span>📍 ${Object.keys(LOCATIONS).find(k => LOCATIONS[k].name === loc.name) || loc.name || 'Custom'}</span>
        <span>🌐 ${loc.lat.toFixed(4)}°, ${loc.lon.toFixed(4)}°</span>
        <span>🕐 ${result.birthTime || ''}</span>
        <span>📐 ${result.ayanamsa || 'LAHIRI'}</span>
        <span>🔑 ${CONFIG.API_KEY.substring(0, 10)}...</span>
    `;
}

// ============================================================
// 11. TOAST
// ============================================================

function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ============================================================
// 12. FORM HANDLERS
// ============================================================

function setupAutocomplete() {
    const cityInput = document.getElementById('city');
    if (!cityInput) return;
    const datalist = document.getElementById('city-suggestions');
    if (!datalist) return;
    Object.keys(LOCATIONS).sort().forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        datalist.appendChild(option);
    });
}

function setupAdvancedToggle() {
    const toggle = document.getElementById('advanced-toggle');
    const fields = document.getElementById('advanced-fields');
    if (!toggle || !fields) return;
    toggle.addEventListener('click', function() {
        fields.classList.toggle('show');
        this.textContent = fields.classList.contains('show') 
            ? '🔧 Hide Coordinates' 
            : '🔧 Advanced (Coordinates)';
    });
}

function setupAutoSelect() {
    ['dob', 'time', 'city', 'api-key'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('focus', function() { this.select(); });
            el.addEventListener('click', function() { this.select(); });
        }
    });
}

function setupFormSubmit() {
    const form = document.getElementById('horoscope-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const dob = document.getElementById('dob').value;
        const time = document.getElementById('time').value;
        const city = document.getElementById('city').value;
        const apiKey = document.getElementById('api-key').value || CONFIG.API_KEY;
        const userLat = document.getElementById('user-lat').value;
        const userLon = document.getElementById('user-lon').value;

        if (!dob || !time) {
            alert('தயவு செய்து பிறந்த தேதி மற்றும் நேரத்தை உள்ளிடவும்');
            return;
        }

        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> கணக்கிடுகிறது...';
        submitBtn.disabled = true;

        try {
            const result = await calculateHoroscope(
                dob, time, city, apiKey, 
                userLat || undefined, 
                userLon || undefined
            );

            if (result.status === 'success') {
                displayHoroscope(result);
            } else {
                alert(`❌ பிழை: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`❌ கணக்கீட்டில் பிழை: ${error.message}`);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================================
// 13. INIT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    buildChartGrid();
    setupAutocomplete();
    setupAdvancedToggle();
    setupAutoSelect();
    setupFormSubmit();

    const apiKeyInput = document.getElementById('api-key');
    if (apiKeyInput && !apiKeyInput.value) {
        apiKeyInput.value = CONFIG.API_KEY;
    }

    window.TamilHoroscope = {
        calculateHoroscope,
        CONFIG,
        test: async function(dob = '25/10/1992', time = '14:30', city = 'சென்னை') {
            console.log('🔮 Testing Horoscope...');
            const result = await calculateHoroscope(dob, time, city, CONFIG.API_KEY);
            console.log('📊 Result:', result);
            return result;
        }
    };

    console.log('✅ Tamil Horoscope Loaded - AstroVedika API');
    console.log('🔑 API Key:', CONFIG.API_KEY.substring(0, 10) + '...');
    console.log('📐 Ayanamsa: LAHIRI');
    console.log('🌐 Language: TAMIL');
    console.log('🌐 Try: TamilHoroscope.test()');
});

// ============================================================
// 14. CSS FOR PREDICTIONS (in case not in HTML)
// ============================================================

const style = document.createElement('style');
style.textContent = `
    .prediction-card {
        background: white;
        padding: 12px 15px;
        border-radius: 8px;
        border-left: 4px solid #667eea;
        margin-bottom: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: all 0.3s ease;
    }
    .prediction-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateX(5px);
    }
    .prediction-card .planet-name {
        font-weight: 600;
        color: #2c3e50;
        font-size: 15px;
    }
    .prediction-card .planet-sign {
        color: #7f8c8d;
        font-size: 13px;
        margin-top: 2px;
    }
    .prediction-card .prediction-text {
        color: #555;
        font-size: 14px;
        margin-top: 6px;
        line-height: 1.6;
        border-top: 1px solid #f0f0f0;
        padding-top: 8px;
    }
`;
document.head.appendChild(style);
