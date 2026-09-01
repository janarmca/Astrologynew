// ============================================================
// TAMIL HOROSCOPE APP - FIXED API CALL
// API Key: ak-136ade485bd48f55033664d318f72471ef3ef481
// ============================================================

// ✅ YOUR API KEY
const DEFAULT_API_KEY = 'ak-136ade485bd48f55033664d318f72471ef3ef481';

const CONFIG = {
    API_KEY: DEFAULT_API_KEY,
    AYANAMSA: 'LAHIRI',
    BASE_URL: 'https://api.vedastro.org/api'
};

const PLANET_NAMES_TAMIL = {
    'Sun': 'சூரியன்',
    'Moon': 'சந்திரன்',
    'Mars': 'செவ்வாய்',
    'Mercury': 'புதன்',
    'Jupiter': 'குரு',
    'Venus': 'சுக்கிரன்',
    'Saturn': 'சனி',
    'Rahu': 'ராகு',
    'Ketu': 'கேது',
    'Uranus': 'யுரேனஸ்',
    'Neptune': 'நெப்டியூன்',
    'Pluto': 'புளூட்டோ'
};

const ZODIAC_SIGNS_TAMIL = [
    'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
    'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
    'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

const ZODIAC_SIGNS_ENGLISH = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// ============================================================
// LOCATION DATABASE
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
    'தூத்துக்குடி': { name: 'Thoothukudi', lat: 8.7642, lon: 78.1348, tz: '+05:30' },
    'ராமநாதபுரம்': { name: 'Ramanathapuram', lat: 9.3631, lon: 78.8405, tz: '+05:30' },
    'கடலூர்': { name: 'Cuddalore', lat: 11.7449, lon: 79.7699, tz: '+05:30' },
    'கும்பகோணம்': { name: 'Kumbakonam', lat: 10.9596, lon: 79.3797, tz: '+05:30' },
    'நெய்வேலி': { name: 'Neyveli', lat: 11.6081, lon: 79.4952, tz: '+05:30' },
    'அருப்புக்கோட்டை': { name: 'Aruppukkottai', lat: 9.5067, lon: 78.0958, tz: '+05:30' },
    'காரைக்குடி': { name: 'Karaikudi', lat: 10.0863, lon: 78.7883, tz: '+05:30' },
    'பரமக்குடி': { name: 'Paramakudi', lat: 9.5461, lon: 78.5906, tz: '+05:30' },
    'சிவகங்கை': { name: 'Sivaganga', lat: 9.8471, lon: 78.4843, tz: '+05:30' },
    'விருதுநகர்': { name: 'Virudhunagar', lat: 9.5789, lon: 77.9537, tz: '+05:30' },
    'புதுக்கோட்டை': { name: 'Pudukkottai', lat: 10.3909, lon: 78.8195, tz: '+05:30' },
    'பெரம்பலூர்': { name: 'Perambalur', lat: 11.2293, lon: 78.8752, tz: '+05:30' },
    'அரியலூர்': { name: 'Ariyalur', lat: 11.1352, lon: 79.0767, tz: '+05:30' },
    'நாமக்கல்': { name: 'Namakkal', lat: 11.2140, lon: 78.1667, tz: '+05:30' },
    'தர்மபுரி': { name: 'Dharmapuri', lat: 12.1149, lon: 78.1670, tz: '+05:30' },
    'கிருஷ்ணகிரி': { name: 'Krishnagiri', lat: 12.5254, lon: 78.2109, tz: '+05:30' },
    'மயிலாடுதுறை': { name: 'Mayiladuthurai', lat: 11.1036, lon: 79.6554, tz: '+05:30' },
    'நாகப்பட்டினம்': { name: 'Nagapattinam', lat: 10.7620, lon: 79.8492, tz: '+05:30' },
    'திருவாரூர்': { name: 'Thiruvarur', lat: 10.7705, lon: 79.6388, tz: '+05:30' },
    'தேனி': { name: 'Theni', lat: 10.0083, lon: 77.4816, tz: '+05:30' },
    'பொள்ளாச்சி': { name: 'Pollachi', lat: 10.6576, lon: 77.0088, tz: '+05:30' },
    'உதகமண்டலம்': { name: 'Ooty', lat: 11.4102, lon: 76.6950, tz: '+05:30' },
    'மும்பை': { name: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: '+05:30' },
    'டெல்லி': { name: 'Delhi', lat: 28.6139, lon: 77.2090, tz: '+05:30' },
    'கொல்கத்தா': { name: 'Kolkata', lat: 22.5726, lon: 88.3639, tz: '+05:30' },
    'பெங்களூரு': { name: 'Bangalore', lat: 12.9716, lon: 77.5946, tz: '+05:30' },
    'ஹைதராபாத்': { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, tz: '+05:30' },
    'திருவனந்தபுரம்': { name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366, tz: '+05:30' },
    'கொச்சி': { name: 'Kochi', lat: 9.9312, lon: 76.2673, tz: '+05:30' },
    'மைசூர்': { name: 'Mysore', lat: 12.2958, lon: 76.6394, tz: '+05:30' }
};

// ============================================================
// HELPER FUNCTIONS
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

function isValidLatitude(lat) {
    return !isNaN(lat) && lat >= -90 && lat <= 90;
}

function isValidLongitude(lon) {
    return !isNaN(lon) && lon >= -180 && lon <= 180;
}

// ============================================================
// LOCATION COORDINATE FUNCTIONS
// ============================================================

async function getLocationCoordinates(cityName, userLat, userLon) {
    if (userLat !== undefined && userLon !== undefined) {
        const lat = parseFloat(userLat);
        const lon = parseFloat(userLon);
        if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
            throw new Error('Invalid Latitude/Longitude values');
        }
        return {
            lat: lat,
            lon: lon,
            name: 'Custom Location',
            tz: '+05:30'
        };
    }

    if (cityName && LOCATIONS[cityName]) {
        return LOCATIONS[cityName];
    }

    if (cityName) {
        return await fetchCoordinatesFromPlaceName(cityName);
    }

    throw new Error('இருப்பிட தரவு கிடைக்கவில்லை. தயவு செய்து ஊரை உள்ளிடவும்.');
}

async function fetchCoordinatesFromPlaceName(placeName) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;
        const response = await fetch(url, {
            headers: { 'User-Agent': 'TamilHoroscopeApp/1.0' }
        });
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
// ✅ FIXED API CALLS - Correct Parameter Names
// ============================================================

async function calculateHoroscope(dob, time, city, apiKey, userLat, userLon) {
    try {
        const finalKey = apiKey || CONFIG.API_KEY;
        let location = await getLocationCoordinates(city, userLat, userLon);

        // ✅ FIXED: Correct time format
        const birthTime = `${time} ${dob} ${location.tz}`;

        console.log('📡 API Request:', {
            location: `${location.lat}, ${location.lon}`,
            birthTime: birthTime,
            ayanamsa: CONFIG.AYANAMSA
        });

        // ✅ FIXED: Using 'birthTime' instead of 'Time'
        const response = await fetch(`${CONFIG.BASE_URL}/Calculate/HoroscopePredictions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': finalKey
            },
            body: JSON.stringify({
                Location: {
                    Latitude: location.lat,
                    Longitude: location.lon,
                    Name: location.name || city || 'Custom'
                },
                birthTime: birthTime,  // ✅ FIXED: Changed from 'Time' to 'birthTime'
                Ayanamsa: CONFIG.AYANAMSA
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`API பிழை: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Status === 'Fail') {
            throw new Error(`API பிழை: ${data.Payload || 'தெரியாத பிழை'}`);
        }

        const planetPositions = extractPlanetPositions(data);
        const dashaData = await calculateDasha(dob, time, city, finalKey, location);

        return {
            status: 'success',
            planets: planetPositions,
            dasha: dashaData,
            rawData: data,
            location: location,
            birthTime: birthTime,
            ayanamsa: CONFIG.AYANAMSA + ' (Thirukanitha Panchangam)',
            lagna: planetPositions['Ascendant'] || null
        };

    } catch (error) {
        console.error('Horoscope calculation error:', error);
        return { status: 'error', message: error.message };
    }
}

async function calculateDasha(dob, time, city, apiKey, location) {
    try {
        let loc = location;
        if (!loc) {
            loc = await getLocationCoordinates(city);
        }

        const birthTime = `${time} ${dob} ${loc.tz}`;
        const finalKey = apiKey || CONFIG.API_KEY;

        // ✅ FIXED: Using 'birthTime' instead of 'Time'
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
                birthTime: birthTime,  // ✅ FIXED: Changed from 'Time' to 'birthTime'
                Ayanamsa: CONFIG.AYANAMSA,
                DasaType: "Vimshottari"
            })
        });

        if (!response.ok) throw new Error(`Dasha API பிழை: ${response.status}`);

        const data = await response.json();
        if (data.Status === 'Fail') {
            throw new Error(`Dasha API பிழை: ${data.Payload}`);
        }

        return parseDashaData(data);

    } catch (error) {
        console.error('Dasha calculation error:', error);
        return null;
    }
}

function extractPlanetPositions(apiData) {
    const planets = {};
    try {
        let payload = apiData.Payload;

        if (payload && typeof payload === 'object') {
            if (Array.isArray(payload)) {
                payload.forEach(item => {
                    if (item.Planet && item.Sign) {
                        const signIndex = getSignIndex(item.Sign);
                        planets[item.Planet] = {
                            sign: signIndex,
                            signName: ZODIAC_SIGNS_TAMIL[signIndex] || item.Sign,
                            house: item.House || null,
                            degree: item.Degree || 0,
                            nakshatra: item.Nakshatra || null
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
                        house: value.House || null,
                        degree: value.Degree || 0,
                        nakshatra: value.Nakshatra || null
                    };
                }
            }

            if (payload && payload.Ascendant) {
                const signIndex = getSignIndex(payload.Ascendant.Sign);
                planets['Ascendant'] = {
                    sign: signIndex,
                    signName: ZODIAC_SIGNS_TAMIL[signIndex] || payload.Ascendant.Sign,
                    house: 1,
                    degree: payload.Ascendant.Degree || 0
                };
            }
        }
    } catch (e) {
        console.warn('Planet extraction error:', e);
    }
    return planets;
}

function parseDashaData(data) {
    let payload = data.Payload;
    if (payload && payload.VimshottariDasha) {
        payload = payload.VimshottariDasha;
    }

    const dashaInfo = {
        currentDasha: null,
        currentBhukti: null,
        currentPratyantar: null
    };

    if (payload && typeof payload === 'object') {
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
                planetTamil: PLANET_NAMES_TAMIL[payload.PratyantarDasha.Planet] || payload.PratyantarDasha.Planet,
                startDate: payload.PratyantarDasha.StartDate || null,
                endDate: payload.PratyantarDasha.EndDate || null
            };
        }
    }
    return dashaInfo;
}

// ============================================================
// CHART RENDER FUNCTIONS
// ============================================================

function prepareChartData(planetData) {
    const chart = Array(12).fill(null).map(() => []);
    if (!planetData || typeof planetData !== 'object') return chart;

    for (const [planet, data] of Object.entries(planetData)) {
        if (planet === 'Ascendant') {
            if (chart[0]) {
                chart[0].push({
                    name: 'லக்னம்',
                    key: 'Ascendant',
                    isAscendant: true,
                    sign: data.signName
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
                degree: data.degree || 0,
                nakshatra: data.nakshatra || null,
                house: data.house || null
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

function buildChartGrid() {
    const grid = document.getElementById('chart-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const positions = [
        { id: 'p10', pos: 'position-10' },
        { id: 'p11', pos: 'position-11' },
        { id: 'p12', pos: 'position-12' },
        { id: 'p9', pos: 'position-9' },
        { id: 'p1', pos: 'position-1' },
        { id: 'p2', pos: 'position-2' },
        { id: 'p8', pos: 'position-8' },
        { id: 'p7', pos: 'position-7' },
        { id: 'p3', pos: 'position-3' },
        { id: 'p6', pos: 'position-6' },
        { id: 'p5', pos: 'position-5' },
        { id: 'p4', pos: 'position-4' }
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

function displayHoroscope(result) {
    if (result.status === 'error') {
        alert(`❌ பிழை: ${result.message}`);
        return;
    }

    const chartData = prepareChartData(result.planets);

    for (let i = 0; i < 12; i++) {
        const houseId = `p${i + 1}`;
        const houseElement = document.getElementById(houseId);
        if (!houseElement) continue;

        const signElement = document.getElementById(`sign-${houseId}`);
        if (signElement) {
            signElement.textContent = ZODIAC_SIGNS_TAMIL[i];
        }

        const planetContainer = document.getElementById(`planets-${houseId}`);
        if (planetContainer) {
            const planets = chartData[i] || [];
            if (planets.length > 0) {
                const names = planets.map(p => p.name).join(', ');
                planetContainer.textContent = names;
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
            const lagnaSign = ZODIAC_SIGNS_TAMIL[result.lagna.sign] || result.lagna.signName;
            lagnaLabel.textContent = `⬆️ லக்னம்: ${lagnaSign}`;
        }
    }

    displayDasha(result.dasha);
    displayBirthInfo(result);
    showToast(`✅ ஜாதகம் கணக்கிடப்பட்டது (${result.ayanamsa || 'LAHIRI'})`, 'success');
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
                <div class="label">🔄 அந்தர்தசா (புக்தி)</div>
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
    if (!container) return;

    if (!result.location) {
        container.style.display = 'none';
        return;
    }

    const loc = result.location;
    const cityName = Object.keys(LOCATIONS).find(k => LOCATIONS[k].name === loc.name) || loc.name || 'Custom';

    container.style.display = 'flex';
    container.innerHTML = `
        <span>📍 ${cityName}</span>
        <span>🌐 ${loc.lat.toFixed(4)}°, ${loc.lon.toFixed(4)}°</span>
        <span>🕐 ${result.birthTime || ''}</span>
        <span>⏰ ${loc.tz}</span>
        <span>📐 ${result.ayanamsa || 'LAHIRI'}</span>
    `;
}

// ============================================================
// TOAST NOTIFICATION
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
// CITY AUTOCOMPLETE
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
// FORM SUBMIT HANDLER
// ============================================================

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

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
            alert('தேதி வடிவம்: DD/MM/YYYY');
            return;
        }

        if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
            alert('நேர வடிவம்: HH:MM (24-மணி)');
            return;
        }

        if (!city && (!userLat || !userLon)) {
            alert('தயவு செய்து ஊர் பெயரை உள்ளிடவும் அல்லது Latitude/Longitude ஐ உள்ளிடவும்');
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
// SAVE API KEY TO LOCAL STORAGE
// ============================================================

function saveApiKey(key) {
    localStorage.setItem('horoscope_api_key', key);
}

function loadApiKey() {
    return localStorage.getItem('horoscope_api_key') || CONFIG.API_KEY;
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    buildChartGrid();
    setupAutocomplete();
    setupAdvancedToggle();
    setupFormSubmit();

    const apiKeyInput = document.getElementById('api-key');
    if (apiKeyInput) {
        const savedKey = loadApiKey();
        if (savedKey) {
            apiKeyInput.value = savedKey;
        }
        
        apiKeyInput.addEventListener('change', function() {
            if (this.value) {
                saveApiKey(this.value);
            }
        });
    }

    // Make functions available globally
    window.TamilHoroscope = {
        calculateHoroscope,
        getLocationCoordinates,
        LOCATIONS,
        CONFIG: CONFIG,
        test: async function(dob = '25/10/1992', time = '14:30', city = 'சென்னை') {
            const result = await calculateHoroscope(dob, time, city, CONFIG.API_KEY);
            console.log('🔮 Test Result:', result);
            return result;
        }
    };

    console.log('✅ Tamil Horoscope App Loaded');
    console.log('🔑 API Key:', CONFIG.API_KEY.substring(0, 10) + '...');
    console.log('📐 Ayanamsa: LAHIRI (Thirukanitha Panchangam)');
    console.log('🌐 Try: TamilHoroscope.test()');
});

// ============================================================
// ADD CSS FOR TOASTS (in case not in HTML)
// ============================================================

const style = document.createElement('style');
style.textContent = `
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
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #667eea;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
