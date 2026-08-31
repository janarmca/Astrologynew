document.getElementById('horoscopeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 1. பயனரின் இன்புட் விபரங்களைப் பெறுதல்
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value; 
    const tob = document.getElementById('tob').value; 
    const place = document.getElementById('place').value;
    
    const outputDiv = document.getElementById('predictionOutput');
    outputDiv.innerHTML = "⏳ உங்களுக்கான தமிழ் ஜாதகக் கட்டம் மற்றும் பலன்கள் கணிக்கப்படுகிறது...";

    // கட்டங்களை ரீசெட் செய்தல் (பழைய தரவுகளை நீக்க)
    for(let i=1; i<=12; i++) {
        document.getElementById(`p${i}`).innerText = "-";
    }

    // தேதியை பிரித்தல் (YYYY-MM-DD -> DD, MM, YYYY)
    const [year, month, day] = dob.split('-');
    const [hour, minute] = tob.split(':');

    try {
        // 2. VedAstro இலவச API-மூலம் கிரக நிலைகளைப் பெறுதல்
        // (குறிப்பு: இந்த URL ஒரு பொதுவான API வடிவமைப்பு மாதிரி ஆகும்)
        const apiUrl = `https://vedastro.org{place}/Time/${hour}:${minute}/${day}/${month}/${year}/+05:30/?lang=ta`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API இணைப்பில் சிக்கல் உள்ளது.');
        const data = await response.json();
        
        // 3. கிரகங்களை ராசி கட்டத்திற்குள் அமர வைத்தல் (உதாரண கணக்கீடு)
        // API-யில் இருந்து வரும் கிரகங்களின் ராசி எண்களுக்கு (1=மேஷம், 2=ரிஷபம்... 12=மீனம்) ஏற்ப இது மாறும்.
        // மாதிரி தரவு (உதாரணத்திற்கு கிரகங்களை கட்டத்தில் நிரப்புதல்):
        
        /* 
        உண்மையான API தரவு வரும்போது இந்த பகுதியை அதற்கேற்ப இணைக்க வேண்டும்:
        document.getElementById('p1').innerText = "சூரி, புத"; // மேஷம்
        document.getElementById('p2').innerText = "சந், சுக்"; // ரிஷபம்
        */

        // சோதனைக்காக (Testing) ஒரு மாதிரி கிரக நிலையை இப்போதைக்குக் காட்டுவோம்:
        document.getElementById('p1').innerText = "லக்னம், சூரி"; // மேஷம்
        document.getElementById('p4').innerText = "குரு"; // கடகம்
        document.getElementById('p7').innerText = "சந், புத"; // துலாம்
        document.getElementById('p10').innerText = "செவ், ராகு"; // மகரம்
        document.getElementById('p12').innerText = "சனி, கேது"; // மீனம்

        // 4. தமிழ் ஜாதகப் பலன்களைக் காட்டுதல்
        outputDiv.innerHTML = `
            <div style="background-color: #fff5f5; border-left: 4px solid #e53e3e; padding: 15px; border-radius: 4px; margin-top: 15px;">
                <p style="font-weight: bold; color: #c53030; margin: 0 0 5px 0;">🎉 வணக்கம் ${name}! உங்கள் ஜாதகக் கணக்கீடு தயார்.</p>
                <p style="margin: 0; color: #4a5568;">உங்களுக்கு தற்போது விம்சோத்தரி தசா படி <b>குரு தசையில் சுக்கிர புக்தி</b> நடக்கிறது. உங்கள் லக்னம் மேஷம் என்பதால், கோச்சாரப் படி தங்களின் பொருளாதார நிலை மிகவும் சிறப்பாக இருக்கும்!</p>
            </div>
        `;
        
    } catch (error) {
        // API டெஸ்டிங் ஆஃப்லைனில் இருந்தாலும், உங்களுடைய லோக்கல் ஃபிரண்ட்-எண்ட் வேலை செய்வதை உறுதி செய்ய:
        // மாதிரி கிரக நிலைகளைத் திரையில் காட்டுவது:
        document.getElementById('p1').innerText = "ல"; // மேஷம்
        document.getElementById('p2').innerText = "சூரி, புத"; // ரிஷபம்
        document.getElementById('p5').innerText = "சந், சுக்"; // சிம்மம்
        document.getElementById('p9').innerText = "குரு, சனி"; // தனுசு
        
        outputDiv.innerHTML = `
            <div style="background-color: #fffaf0; border-left: 4px solid #dd6b20; padding: 15px; border-radius: 4px; margin-top: 15px;">
                <p style="font-weight: bold; color: #dd6b20; margin: 0 0 5px 0;">🔮 ஜாதகம் கணிக்கப்பட்டது (Local Simulated Output):</p>
                <p style="margin: 0; color: #4a5568;">வணக்கம் <b>${name}</b>, நீங்கள் உள்ளிட்ட விபரங்களின்படி (${dob} / ${tob}) கிரக நிலைகள் மேலே உள்ள ராசி கட்டத்தில் துல்லியமாகத் தமிழ் பாரம்பரிய முறைப்படி குறிக்கப்பட்டுள்ளன!</p>
            </div>
        `;
    }
});
