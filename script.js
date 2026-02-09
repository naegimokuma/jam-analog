const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');

let offsetWaktu = 0; 

async function sinkronkanWaktu() {
    try {
        // Mengambil waktu real-time Jakarta dari TimeAPI.io
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
        const data = await response.json();
        
        const waktuServer = new Date(data.dateTime);
        const waktuLokal = new Date();
        
        // Hitung selisih antara server dan device user
        offsetWaktu = waktuServer.getTime() - waktuLokal.getTime();
        
        console.log("Sinkronisasi Berhasil: Mengikuti waktu server Jakarta");
    } catch (err) {
        console.error("Gagal sinkronisasi, menggunakan waktu lokal (fallback).");
        // Jika gagal, offset tetap 0 atau gunakan logika UTC+7
    }
}

function updateJam() {
    // Waktu sekarang dikoreksi dengan offset server
    let now = new Date(Date.now() + offsetWaktu);
    
    const detik = now.getSeconds();
    const menit = now.getMinutes();
    const jam = now.getHours();

    // Kalkulasi derajat rotasi agar pergerakan jarum halus
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const derajatJam = (((jam % 12) / 12) * 360) + ((menit / 60) * 30);

    // Terapkan ke elemen HTML
    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// Jalankan sinkronisasi saat pertama kali load
sinkronkanWaktu().then(() => {
    setInterval(updateJam, 1000);
    updateJam();
});

// Update selisih waktu setiap 30 menit agar tetap akurat
setInterval(sinkronkanWaktu, 1800000);
