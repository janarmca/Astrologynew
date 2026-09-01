// ============================================================
// TAMIL HOROSCOPE APP - COMPLETE RESTRUCTURED VERSION
// VedAstro API - Correct Implementation
// ============================================================

// ============================================================
// 1. CONFIGURATION
// ============================================================

const CONFIG = {
    API_KEY: '34e79705-9a11-5e56-b5ea-a189f8d60942',
    BASE_URL: 'https://api.vedastro.org/api',
    AYANAMSA: 'LAHIRI',
    FREE_KEY: 'FreeAPIUser'  // For testing without key
};

// ============================================================
// 2. TAMIL NAMES
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
// 3. LOCATION DATABASE
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
// 4. HELPER FUNCTIONS
// ============================================================

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
// 5. ✅ API CLIENT CLASS - CLEAN & RESTRUCTURED
// ============================================================

class VedAstroAPIClient {
    constructor(apiKey = 'FreeAPIUser') {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.vedastro.org/api';
        this.ayanamsa = 'LAHIRI';
    }

    /**
     * ✅ CORRECT: Both APIs use the SAME Time structure
     * Time: { StdTime: "HH:MM DD/MM/YYYY +TZ" }
     */
    createTimeObject(dob, time, timezone = '+05:30') {
        return {
            StdTime: `${time} ${dob} ${timezone}`
        };
    }

    /**
     * ✅ CORRECT: Horoscope API
     * Uses: Location + Time { StdTime } + Ayanamsa
     */
    async getHoroscope(dob, time, location) {
        const requestBody = {
            Location: {
                Latitude: location.lat,
                Longitude: location.lon,
                Name: location.name || 'Custom'
            },
            Time: this.createTimeObject(dob, time, location.tz),
            Ayanamsa: this.ayanamsa
        };

        console.log('📡 Horoscope Request:', requestBody);

        const response = await fetch(`${this.baseUrl}/Calculate/HoroscopePredictions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.Status === 'Fail') {
            throw new Error(`API Error: ${data.Payload}`);
        }

        return data;
    }

    /**
     * ✅ CORRECT: Dasa API
     * Uses: Location + Time { StdTime } + Ayanamsa + DasaType
     * SAME Time structure as Horoscope API!
     */
    async getDasa(dob, time, location) {
        const requestBody = {
            Location: {
                Latitude: location.lat,
                Longitude: location.lon,
                Name: location.name || 'Custom'
            },
            Time: this.createTimeObject(dob, time, location.tz),
            Ayanamsa: this.ayanamsa,
            DasaType: "Vimshottari"
        };

        console.log('📊 Dasa Request:', requestBody);

        const response = await fetch(`${this.baseUrl}/Calculate/DasaAtTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.Status === 'Fail') {
            throw new Error(`API Error: ${data.Payload}`);
        }

        return data;
    }

    /**
     * ✅ Extract planets from response
     */
    extractPlanets(data) {
        const planets = {};
        const payload = data.Payload;

        console.log('🔍 Extracting planets...');

        if (Array.isArray(payload)) {
            payload.forEach(item => {
                if (item.Planet && item.Sign) {
                    const signIndex = getSignIndex(item.Sign);
                    planets[item.Planet] = {
                        sign: signIndex,
                        signName: ZODIAC_SIGNS_TAMIL[signIndex] || item.Sign,
                        house: item.House || 0,
                        degree: item.Degree || 0,
                        nakshatra: item.Nakshatra || '',
                        prediction: item.Description || ''
                    };
                }
            });
        }

        if (payload && payload.Planets) {
            for (const [key, value] of Object.entries(payload.Planets)) {
                const signIndex = getSignIndex(value.Sign);
                planets[key] = {
                    sign: signIndex,
                    signName: ZODIAC_SIGNS_TAMIL[signIndex] || value.Sign,
                    house: value.House || 0,
                    degree: value.Degree || 0,
                    nakshatra: value.Nakshatra || '',
                    prediction: value.Description || ''
                };
            }
        }

        if (payload && payload.Ascendant) {
            const signIndex = getSignIndex(payload.Ascendant.Sign);
            planets['Ascendant'] = {
                sign: signIndex,
                signName: ZODIAC_SIGNS_TAMIL[signIndex] || payload.Ascendant.Sign,
                house: 1,
                degree: payload.Ascendant.Degree || 0,
                prediction: 'லக்னம்'
            };
        }

        console.log('✅ Extracted Planets:', Object.keys(planets));
        return planets;
    }

    /**
     * ✅ Extract Dasa from response
     */
    extractDasa(data) {
        let payload = data.Payload;
        
        if (payload && payload.DasaAtTime) {
            payload = payload.DasaAtTime;
        }
        if (payload && payload.VimshottariDasa) {
            payload = payload.VimshottariDasa;
        }

        const dashaInfo = {
            currentDasha: null,
            currentBhukti: null,
            currentPratyantar: null
        };

        if (payload) {
            if (payload.Mahadasha) {
                dashaInfo.currentDasha = {
                    planet: payload.Mahadasha.Planet || 'Unknown',
                    planetTamil: PLANET_NAMES_TAMIL[payload.Mahadasha.Planet] || payload.Mahadasha.Planet,
                    startDate: payload.Mahadasha.StartDate || null,
                    endDate: payload.Mahadasha.EndDate || null,
                    years: payload.Mahadasha.Years || 0
                };
            }
            if (payload.Antardasha) {
                dashaInfo.currentBhukti = {
                    planet: payload.Antardasha.Planet || 'Unknown',
                    planetTamil: PLANET_NAMES_TAMIL[payload.Antardasha.Planet] || payload.Antardasha.Planet,
                    startDate: payload.Antardasha.StartDate || null,
                    endDate: payload.Antardasha.EndDate || null
                };
            }
            if (payload.PratyantarDasha) {
                dashaInfo.currentPratyantar = {
                    planet: payload.PratyantarDasha.Planet || 'Unknown',
                    planetTamil: PLANET_NAMES_TAMIL[payload.PratyantarDasha.Planet] || payload.PratyantarDasha.Planet
                };
            }
        }

        return dashaInfo;
    }
}

// ============================================================
// 6. ✅ MAIN FUNCTION - USING THE API CLIENT
// ============================================================

async function calculateHoroscope(dob, time, city, apiKey, userLat, userLon) {
    try {
        const finalKey = apiKey || CONFIG.API_KEY || 'FreeAPIUser';
        const location = await getLocationCoordinates(city, userLat, userLon);

        // Initialize API client
        const client = new VedAstroAPIClient(finalKey);

        // Get Horoscope
        const horoscopeData = await client.getHoroscope(dob, time, location);
        console.log('✅ Horoscope Response:', horoscopeData);

        // Get Dasa
        let dashaData = null;
        try {
            const dasaResponse = await client.getDasa(dob, time, location);
            console.log('✅ Dasa Response:', dasaResponse);
            dashaData = client.extractDasa(dasaResponse);
        } catch (dasaError) {
            console.warn('⚠️ Dasa API failed:', dasaError.message);
        }

        // Extract planets
        const planetPositions = client.extractPlanets(horoscopeData);

        return {
            status: 'success',
            planets: planetPositions,
            dasha: dashaData,
            location: location,
            birthTime: `${time} ${dob} ${location.tz}`,
            ayanamsa: CONFIG.AYANAMSA,
            lagna: planetPositions['Ascendant'] || null,
            rawData: horoscopeData
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return { status: 'error', message: error.message };
    }
}

// ============================================================
// 7. CHART DISPLAY FUNCTIONS
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
                chart[0].push({ 
                    name: 'லக்னம்', 
                    key: 'Ascendant', 
                    isAscendant: true 
                });
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
                house: data.house,
                degree: data.degree
            });
        }
    }

    chart.forEach(house => {
        house.sort((a, b) => {
            if (a.isAscendant) return -1;
            if (b.isAscendant) return 1;
            return a.name.localeCompare(b.name);
        });
    });

    return chart;
}

function displayHoroscope(result) {
    if (result.status === 'error') {
        alert(`❌ பிழை: ${result.message}`);
        return;
    }

    console.log('📊 Displaying Horoscope:', result);

    const chartData = prepareChartData(result.planets);

    for (let i = 0; i < 12; i++) {
        const houseId = `p${i + 1}`;
        const planetContainer = document.getElementById(`planets-${houseId}`);
        if (planetContainer) {
            const planets = chartData[i] || [];
            if (planets.length > 0) {
                const names = planets.map(p => {
                    if (p.isAscendant) return '⬆️ லக்னம்';
                    return p.name;
                }).join(', ');
                planetContainer.textContent = names;
                planetContainer.style.color = '#34495e';
                planetContainer.style.fontWeight = '500';
                planetContainer.style.fontSize = '12px';
            } else {
                planetContainer.textContent = '−';
                planetContainer.style.color = '#ccc';
                planetContainer.style.fontWeight = 'normal';
                planetContainer.style.fontSize = '11px';
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
            const lagnaSign = result.lagna;
            lagnaLabel.textContent = `⬆️ லக்னம்: ${lagnaSign}`;
        }
    }

    displayDasha(result.dasha);
    displayBirthInfo(result);
    displayPredictions(result.rawData);

    showToast('✅ ஜாதகம் கணக்கிடப்பட்டது!', 'success');
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
                <div class="label">🔄 புக்தி (அந்தர்தசா)</div>
                <div class="value">${b.planetTamil || b.planet}</div>
            </div>
        `;
    }

    if (dashaData.currentPratyantar) {
        const p = dashaData.currentPratyantar;
        html += `
            <div class="dasha-card" style="border-left-color: #2ecc71;">
                <div class="label">⚡ பிரத்யந்தர தசா</div>
                <div class="value">${p.planetTamil || p.planet}</div>
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

    let html = `
        <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">📜 ஜாதக பலன்கள்</h3>
    `;

    let hasPredictions = false;

    if (rawData && rawData.Payload && Array.isArray(rawData.Payload)) {
        rawData.Payload.forEach(item => {
            if (item.Description && item.Tags) {
                hasPredictions = true;
                const tags = Array.isArray(item.Tags) ? item.Tags.join(', ') : item.Tags;
                html += `
                    <div class="prediction-card">
                        <div class="planet-name">📖 ${item.Name || 'Prediction'}</div>
                        <div class="planet-sign">${tags || ''}</div>
                        <div class="prediction-text">${item.Description}</div>
                    </div>
                `;
            }
        });
    }

    if (!hasPredictions) {
        html += `
            <div style="text-align: center; padding: 20px; color: #999;">
                <p>📖 பலன்கள் கிடைக்கவில்லை</p>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

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
// 8. FORM HANDLERS
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
// 9. CSS STYLES
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
    .dasha-card {
        background: white;
        padding: 15px;
        border-radius: 8px;
        border-left: 4px solid #3498db;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .dasha-card .label {
        font-size: 12px;
        color: #7f8c8d;
        margin-bottom: 4px;
    }
    .dasha-card .value {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
    }
    .dasha-card .sub {
        font-size: 12px;
        color: #555;
        margin-top: 4px;
    }
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #667eea;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
        vertical-align: middle;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 14px 24px;
        border-radius: 10px;
        color: white;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        animation: slideIn 0.4s ease;
        max-width: 400px;
    }
    .toast.success { background: #2ecc71; }
    .toast.error { background: #e74c3c; }
    .toast.info { background: #3498db; }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// ============================================================
// 10. INITIALIZATION
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
        VedAstroAPIClient,
        test: async function(dob = '25/10/1992', time = '14:30', city = 'சென்னை') {
            console.log('🔮 Testing Horoscope...');
            const result = await calculateHoroscope(dob, time, city, CONFIG.API_KEY);
            console.log('📊 Result:', result);
            return result;
        }
    };

    console.log('✅ Tamil Horoscope Loaded - VedAstro API');
    console.log('🔑 API Key:', CONFIG.API_KEY);
    console.log('📐 Ayanamsa: LAHIRI');
    console.log('🌐 Try: TamilHoroscope.test()');
});
