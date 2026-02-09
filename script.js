const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');

let offsetWaktu = 0; 

async function sinkronkanWaktu() {
    try {
        // Menggunakan TimeAPI.io (Zona Asia/Jakarta)
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
        const data = await response.json();
        
        // Data dari API ini biasanya berbentuk format ISO atau komponen terpisah
        const waktuServer = new Date(data.dateTime);
        const waktuLokal = new Date();
        
        // Hitung selisih (offset)
        offsetWaktu = waktuServer.getTime() - waktuLokal.getTime();
        
        console.log("Sinkronisasi Berhasil via TimeAPI.io");
    } catch (err) {
        console.error("Gagal sinkronisasi, menggunakan waktu lokal sebagai cadangan.");
        offsetWaktu = 0; 
    }
}

function updateJam() {
    // Ambil waktu device + selisih agar tidak bisa dimanipulasi user
    let now = new Date(Date.now() + offsetWaktu);
    
    // --- PENGURANGAN MANUAL 11 MENIT ---
    now.setMinutes(now.getMinutes() - 11); 

    const detik = now.getSeconds();
    const menit = now.getMinutes();
    const jam = now.getHours();

    // Kalkulasi derajat rotasi
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const derajatJam = (((jam % 12) / 12) * 360) + ((menit / 60) * 30);

    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// Inisialisasi
sinkronkanWaktu().then(() => {
    setInterval(updateJam, 1000);
    updateJam();
});

// Re-sinkronisasi setiap 30 menit untuk menjaga akurasi
setInterval(sinkronkanWaktu, 1800000);
