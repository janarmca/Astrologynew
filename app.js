// ============================================================
// TAMIL HOROSCOPE APP - AstroVedika API (Tamil Support)
// API Key: 34e79705-9a11-5e56-b5ea-a189f8d60942
// ============================================================

// ✅ YOUR API KEY
const CONFIG = {
    API_KEY: '34e79705-9a11-5e56-b5ea-a189f8d60942',
    BASE_URL: 'https://api.astrovedika.com/v1',
    LANGUAGE: 'ta',  // Tamil
    AYANAMSA: 'lahiri'
};

// ============================================================
// 1. PLANET & SIGN NAMES (TAMIL)
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
// 2. LOCATION DATABASE
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
// 3. HELPER FUNCTIONS
// ============================================================

function getTamilSignIndex(tamilSign) {
    const map = {
        'மேஷம்': 0, 'ரிஷபம்': 1, 'மிதுனம்': 2, 'கடகம்': 3,
        'சிம்மம்': 4, 'கன்னி': 5, 'துலாம்': 6, 'விருச்சிகம்': 7,
        'தனுசு': 8, 'மகரம்': 9, 'கும்பம்': 10, 'மீனம்': 11
    };
    return map[tamilSign] !== undefined ? map[tamilSign] : 0;
}

function isValidLatitude(lat) { return !isNaN(lat) && lat >= -90 && lat <= 90; }
function isValidLongitude(lon) { return !isNaN(lon) && lon >= -180 && lon <= 180; }

async function getLocationCoordinates(cityName, userLat, userLon) {
    if (userLat !== undefined && userLon !== undefined) {
        const lat = parseFloat(userLat);
        const lon = parseFloat(userLon);
        if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
            throw new Error('Invalid Latitude/Longitude values');
        }
        return { lat, lon, name: 'Custom Location', tz: '+05:30' };
    }
    if (cityName && LOCATIONS[cityName]) {
        return LOCATIONS[cityName];
    }
    if (cityName) {
        return await fetchCoordinatesFromPlaceName(cityName);
    }
    throw new Error('இருப்பிட தரவு கிடைக்கவில்லை.');
}

async function fetchCoordinatesFromPlaceName(placeName) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;
        const response = await fetch(url, { headers: { 'User-Agent': 'TamilHoroscopeApp/1.0' } });
        if (!response.ok) throw new Error('Location search failed');
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                name: data[0].display_name,
                tz: '+05:30'
            };
        }
        throw new Error(`"${placeName}" என்ற இருப்பிடம் கிடைக்கவில்லை`);
    } catch (error) {
        console.error('Coordinates fetch error:', error);
        throw error;
    }
}

// ============================================================
// 4. ASTROVEDIKA API CALL - TAMIL SUPPORT
// ============================================================

async function calculateHoroscope(dob, time, city, apiKey, userLat, userLon) {
    try {
        const finalKey = apiKey || CONFIG.API_KEY;
        const location = await getLocationCoordinates(city, userLat, userLon);

        console.log('📡 AstroVedika API Call:', {
            url: `${CONFIG.BASE_URL}/horoscope`,
            language: CONFIG.LANGUAGE,
            location: `${location.lat}, ${location.lon}`
        });

        // ✅ Call AstroVedika API with Tamil language
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
                language: CONFIG.LANGUAGE,  // ✅ 'ta' for Tamil
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

        // Process Tamil data
        const planetPositions = processAstroVedikaData(data);
        
        // Get Dasha data
        const dashaData = await calculateDasha(dob, time, location, finalKey);

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
        console.error('Horoscope calculation error:', error);
        return { status: 'error', message: error.message };
    }
}

// ============================================================
// 5. PROCESS ASTROVEDIKA DATA (TAMIL)
// ============================================================

function processAstroVedikaData(data) {
    const planets = {};
    
    // Process planets - already in Tamil!
    if (data.data && data.data.planets) {
        data.data.planets.forEach(planet => {
            const signIndex = getTamilSignIndex(planet.sign);
            planets[planet.name] = {
                sign: signIndex,
                signName: planet.sign,  // ✅ Already Tamil!
                house: planet.house || 0,
                degree: planet.degree || 0,
                prediction: planet.prediction || ''  // ✅ Tamil Prediction!
            };
        });
    }
    
    // Process Lagna - already in Tamil!
    if (data.data && data.data.lagna) {
        const signIndex = getTamilSignIndex(data.data.lagna);
        planets['Ascendant'] = {
            sign: signIndex,
            signName: data.data.lagna,  // ✅ Already Tamil!
            house: 1,
            degree: data.data.lagna_degree || 0
        };
    }
    
    console.log('✅ Processed Planets (Tamil):', planets);
    return planets;
}

// ============================================================
// 6. DASHA API
// ============================================================

async function calculateDasha(dob, time, location, apiKey) {
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
                language: CONFIG.LANGUAGE,  // ✅ Tamil!
                ayanamsa: CONFIG.AYANAMSA
            })
        });

        if (!response.ok) return null;
        
        const data = await response.json();
        if (data.status !== 'success') return null;
        
        return {
            currentDasha: data.data?.current_dasha || null,
            currentBhukti: data.data?.current_bhukti || null
        };

    } catch (error) {
        console.error('Dasha error:', error);
        return null;
    }
}

// ============================================================
// 7. CHART FUNCTIONS
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
            chart[signIndex].push({ name: tamilName, key: planet, isAscendant: false });
        }
    }
    return chart;
}

function displayHoroscope(result) {
    if (result.status === 'error') {
        alert(`❌ பிழை: ${result.message}`);
        return;
    }

    const chartData = prepareChartData(result.planets);

    for (let i = 0; i < 12; i++) {
        const houseId = `p${i + 1}`;
        const planetContainer = document.getElementById(`planets-${houseId}`);
        if (planetContainer) {
            const planets = chartData[i] || [];
            if (planets.length > 0) {
                planetContainer.textContent = planets.map(p => p.name).join(', ');
                planetContainer.style.color = '#34495e';
            } else {
                planetContainer.textContent = '−';
                planetContainer.style.color = '#ccc';
            }
        }
    }

    if (result.lagna) {
        const p1 = document.getElementById('p1');
        if (p1) {
            let lagnaLabel = p1.querySelector('.lagna-label');
            if (!lagnaLabel) {
                lagnaLabel = document.createElement('div');
                lagnaLabel.className = 'lagna-label';
                p1.appendChild(lagnaLabel);
            }
            lagnaLabel.textContent = `⬆️ லக்னம்: ${result.lagna}`;
        }
    }

    displayDasha(result.dasha);
    displayBirthInfo(result);
    displayPredictions(result.rawData);
    showToast('✅ ஜாதகம் கணக்கிடப்பட்டது', 'success');
}

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
    `;
}

function displayPredictions(rawData) {
    const container = document.getElementById('predictions-container');
    if (!container) return;

    if (!rawData || !rawData.data || !rawData.data.planets) {
        container.innerHTML = '';
        return;
    }

    let html = `
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">📜 ஜாதக பலன்கள்</h3>
    `;

    rawData.data.planets.forEach(planet => {
        if (planet.prediction) {
            html += `
                <div style="margin-bottom: 10px; background: white; padding: 10px; border-radius: 6px; border-left: 3px solid #667eea;">
                    <div style="font-weight: 600; color: #2c3e50;">🪐 ${planet.name} (${planet.sign})</div>
                    <div style="font-size: 14px; color: #555; margin-top: 4px;">${planet.prediction}</div>
                </div>
            `;
        }
    });

    html += `</div>`;
    container.innerHTML = html;
}

// ============================================================
// 8. TOAST
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
// 9. FORM HANDLERS
// ============================================================

function setupAutocomplete() {
    const cityInput = document.getElementById('city');
    if (!cityInput) return;

    const datalist = document.getElementById('city-suggestions');
    if (!datalist) return;

    const cityNames = Object.keys(LOCATIONS).sort();
    cityNames.forEach(name => {
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
// 10. INIT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    buildChartGrid();
    setupAutocomplete();
    setupAdvancedToggle();
    setupAutoSelect();
    setupFormSubmit();

    const apiKeyInput = document.getElementById('api-key');
    if (apiKeyInput) {
        apiKeyInput.value = CONFIG.API_KEY;
    }

    window.TamilHoroscope = {
        calculateHoroscope,
        CONFIG,
        test: async function(dob = '25/10/1992', time = '14:30', city = 'சென்னை') {
            const result = await calculateHoroscope(dob, time, city, CONFIG.API_KEY);
            console.log('🔮 Test Result:', result);
            return result;
        }
    };

    console.log('✅ Tamil Horoscope Loaded - AstroVedika API');
    console.log('🔑 API Key:', CONFIG.API_KEY);
    console.log('📐 Ayanamsa: LAHIRI');
    console.log('🌐 Language: TAMIL');
    console.log('🌐 Try: TamilHoroscope.test()');
});
