// ============================================================
// TAMIL HOROSCOPE APP - FIXED VERSION
// Auto-Select Fields + API Fix
// ============================================================

const DEFAULT_API_KEY = 'ak-136ade485bd48f55033664d318f72471ef3ef481';

const CONFIG = {
    API_KEY: DEFAULT_API_KEY,
    AYANAMSA: 'LAHIRI',
    BASE_URL: 'https://api.vedastro.org/api'
};

const PLANET_NAMES_TAMIL = {
    'Sun': 'சூரியன்', 'Moon': 'சந்திரன்', 'Mars': 'செவ்வாய்',
    'Mercury': 'புதன்', 'Jupiter': 'குரு', 'Venus': 'சுக்கிரன்',
    'Saturn': 'சனி', 'Rahu': 'ராகு', 'Ketu': 'கேது'
};

const ZODIAC_SIGNS_TAMIL = [
    'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
    'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
    'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

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
    'தூத்துக்குடி': { name: 'Thoothukudi', lat: 8.7642, lon: 78.1348, tz: '+05:30' },
    'ராமநாதபுரம்': { name: 'Ramanathapuram', lat: 9.3631, lon: 78.8405, tz: '+05:30' },
    'கடலூர்': { name: 'Cuddalore', lat: 11.7449, lon: 79.7699, tz: '+05:30' },
    'கும்பகோணம்': { name: 'Kumbakonam', lat: 10.9596, lon: 79.3797, tz: '+05:30' },
    'நெய்வேலி': { name: 'Neyveli', lat: 11.6081, lon: 79.4952, tz: '+05:30' }
};

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

// ============================================================
// ✅ FIXED API CALL - Correct Parameter
// ============================================================

async function calculateHoroscope(dob, time, city, apiKey, userLat, userLon) {
    try {
        const finalKey = apiKey || CONFIG.API_KEY;
        
        // Get location
        let location;
        if (userLat && userLon) {
            location = { lat: parseFloat(userLat), lon: parseFloat(userLon), name: 'Custom', tz: '+05:30' };
        } else if (city && LOCATIONS[city]) {
            location = LOCATIONS[city];
        } else {
            throw new Error('இருப்பிட தரவு கிடைக்கவில்லை');
        }

        // ✅ FIXED: birthTime format
        const birthTime = `${time} ${dob} ${location.tz}`;

        console.log('📡 API Request:', {
            location: `${location.lat}, ${location.lon}`,
            birthTime: birthTime,
            ayanamsa: CONFIG.AYANAMSA
        });

        // ✅ FIXED: Using 'birthTime' not 'Time'

        
     // Browser Console-ல் இதை ரன் செய்யவும்
async function debugAPI() {
    const response = await fetch('https://api.vedastro.org/api/Calculate/HoroscopePredictions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ak-136ade485bd48f55033664d318f72471ef3ef481'
        },
        body: JSON.stringify({
            Location: {
                Latitude: 13.0827,
                Longitude: 80.2707,
                Name: 'Chennai'
            },
            birthTime: '14:30 25/10/1992 +05:30',
            Ayanamsa: 'LAHIRI'
        })
    });
    
    const data = await response.json();
    console.log('📡 Full Response:', data);
    console.log('📊 Planets Array:', data.Payload);
    
    // Check each planet
    if (Array.isArray(data.Payload)) {
        data.Payload.forEach(p => {
            console.log(`🪐 ${p.Planet}: ${p.Sign} - House ${p.House}`);
        });
    }
    
    return data;
}

await debugAPI();

        const planetPositions = extractPlanetPositions(data);
        const dashaData = await calculateDasha(dob, time, city, finalKey, location);

        return {
            status: 'success',
            planets: planetPositions,
            dasha: dashaData,
            location: location,
            birthTime: birthTime,
            ayanamsa: CONFIG.AYANAMSA,
            lagna: planetPositions['Ascendant'] || null
        };

    } catch (error) {
        console.error('Error:', error);
        return { status: 'error', message: error.message };
    }
}

// ============================================================
// DASHA API - FIXED
// ============================================================

async function calculateDasha(dob, time, city, apiKey, location) {
    try {
        let loc = location;
        if (!loc) {
            if (city && LOCATIONS[city]) {
                loc = LOCATIONS[city];
            } else {
                return null;
            }
        }

        const birthTime = `${time} ${dob} ${loc.tz}`;
        const finalKey = apiKey || CONFIG.API_KEY;

        const response = await fetch(`${CONFIG.BASE_URL}/Calculate/DasaAtTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': finalKey
            },
            body: JSON.stringify({
                Location: {
                    Latitude: loc.lat,
                    Longitude: loc.lon,
                    Name: loc.name || city
                },
                birthTime: birthTime,  // ✅ FIXED
                Ayanamsa: CONFIG.AYANAMSA,
                DasaType: "Vimshottari"
            })
        });

        if (!response.ok) return null;
        const data = await response.json();
        if (data.Status === 'Fail') return null;
        
        return parseDashaData(data);

    } catch (error) {
        console.error('Dasha Error:', error);
        return null;
    }
}

// இந்த code-ஐ உங்கள் app.js-ல் உள்ள extractPlanetPositions-க்கு பதிலாக Paste செய்யவும்
function extractPlanetPositions(apiData) {
    const planets = {};
    const payload = apiData.Payload;
    
    // Debug
    console.log('🔍 Payload Type:', typeof payload);
    console.log('🔍 Is Array:', Array.isArray(payload));
    
    // Case 1: Payload is Array
    if (Array.isArray(payload)) {
        payload.forEach(item => {
            if (item.Planet && item.Sign) {
                const signIndex = getSignIndex(item.Sign);
                planets[item.Planet] = {
                    sign: signIndex,
                    signName: ZODIAC_SIGNS_TAMIL[signIndex] || item.Sign,
                    house: item.House || 0,
                    degree: item.Degree || 0
                };
            }
        });
    }
    // Case 2: Payload is Object with Planets
    else if (payload && typeof payload === 'object') {
        if (payload.Planets) {
            for (const [key, value] of Object.entries(payload.Planets)) {
                const signIndex = getSignIndex(value.Sign);
                planets[key] = {
                    sign: signIndex,
                    signName: ZODIAC_SIGNS_TAMIL[signIndex] || value.Sign,
                    house: value.House || 0,
                    degree: value.Degree || 0
                };
            }
        }
        // Ascendant
        if (payload.Ascendant) {
            const signIndex = getSignIndex(payload.Ascendant.Sign);
            planets['Ascendant'] = {
                sign: signIndex,
                signName: ZODIAC_SIGNS_TAMIL[signIndex] || payload.Ascendant.Sign,
                house: 1,
                degree: payload.Ascendant.Degree || 0
            };
        }
    }
    
    console.log('✅ Extracted Planets:', planets);
    return planets;
}
function parseDashaData(data) {
    let payload = data.Payload;
    if (payload && payload.VimshottariDasha) {
        payload = payload.VimshottariDasha;
    }
    const dashaInfo = { currentDasha: null, currentBhukti: null };
    if (payload && typeof payload === 'object') {
        if (payload.Mahadasha) {
            dashaInfo.currentDasha = {
                planet: payload.Mahadasha.Planet || 'Unknown',
                planetTamil: PLANET_NAMES_TAMIL[payload.Mahadasha.Planet] || payload.Mahadasha.Planet,
                years: payload.Mahadasha.Years || 0
            };
        }
        if (payload.Antardasha) {
            dashaInfo.currentBhukti = {
                planet: payload.Antardasha.Planet || 'Unknown',
                planetTamil: PLANET_NAMES_TAMIL[payload.Antardasha.Planet] || payload.Antardasha.Planet
            };
        }
    }
    return dashaInfo;
}

// ============================================================
// CHART FUNCTIONS
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

// Display planets in houses
function displayHoroscope(result) {
    const chartData = prepareChartData(result.planets);
    
    for (let i = 0; i < 12; i++) {
        const houseId = `p${i + 1}`;
        const container = document.getElementById(`planets-${houseId}`);
        if (container) {
            const planets = chartData[i] || [];
            if (planets.length > 0) {
                container.textContent = planets.map(p => p.name).join(', ');
                container.style.color = '#34495e';
            } else {
                container.textContent = '−';
                container.style.color = '#ccc';
            }
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
            const lagnaSign = ZODIAC_SIGNS_TAMIL[result.lagna.sign] || result.lagna.signName;
            lagnaLabel.textContent = `⬆️ லக்னம்: ${lagnaSign}`;
        }
    }

    displayDasha(result.dasha);
    displayBirthInfo(result);
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
        const d = dashaData.currentDasha;
        html += `
            <div class="dasha-card" style="border-left-color: #3498db;">
                <div class="label">📊 மஹாதசா</div>
                <div class="value">${d.planetTamil || d.planet}</div>
                <div class="sub">${d.years ? d.years + ' ஆண்டுகள்' : ''}</div>
            </div>
        `;
    }
    if (dashaData.currentBhukti) {
        const b = dashaData.currentBhukti;
        html += `
            <div class="dasha-card" style="border-left-color: #f39c12;">
                <div class="label">🔄 புக்தி</div>
                <div class="value">${b.planetTamil || b.planet}</div>
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

// ============================================================
// TOAST
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
// ✅ FORM SUBMIT - With Auto-Select
// ============================================================

function setupFormSubmit() {
    const form = document.getElementById('horoscope-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get values
        const dob = document.getElementById('dob').value;
        const time = document.getElementById('time').value;
        const city = document.getElementById('city').value;
        const apiKey = document.getElementById('api-key').value || CONFIG.API_KEY;
        const userLat = document.getElementById('user-lat').value;
        const userLon = document.getElementById('user-lon').value;

        // ✅ Auto-select: If city has value, use it
        if (city && LOCATIONS[city]) {
            console.log('📍 Using city:', city);
        }

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
// AUTO-SELECT: Focus on first empty field
// ============================================================

function setupAutoSelect() {
    const fields = ['dob', 'time', 'city', 'api-key'];
    
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('focus', function() {
                this.select();
            });
            // Also select on click
            el.addEventListener('click', function() {
                this.select();
            });
        }
    });
}

// ============================================================
// AUTOCOMPLETE
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

// ============================================================
// ADVANCED TOGGLE
// ============================================================

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

// ============================================================
// SAVE API KEY
// ============================================================

function saveApiKey(key) {
    localStorage.setItem('horoscope_api_key', key);
}

function loadApiKey() {
    return localStorage.getItem('horoscope_api_key') || CONFIG.API_KEY;
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    buildChartGrid();
    setupAutocomplete();
    setupAdvancedToggle();
    setupFormSubmit();
    setupAutoSelect();

    const apiKeyInput = document.getElementById('api-key');
    if (apiKeyInput) {
        const savedKey = loadApiKey();
        if (savedKey) {
            apiKeyInput.value = savedKey;
        }
        apiKeyInput.addEventListener('change', function() {
            if (this.value) saveApiKey(this.value);
        });
    }

    // Test function
    window.TamilHoroscope = {
        calculateHoroscope,
        test: async function(dob = '25/10/1992', time = '14:30', city = 'சென்னை') {
            const result = await calculateHoroscope(dob, time, city, CONFIG.API_KEY);
            console.log('🔮 Test Result:', result);
            return result;
        }
    };

    console.log('✅ Tamil Horoscope Loaded');
    console.log('🔑 API Key:', CONFIG.API_KEY.substring(0, 10) + '...');
    console.log('🌐 Try: TamilHoroscope.test()');
});
