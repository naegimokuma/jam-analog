// Dapatkan elemen jarum dari HTML
const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');

// 🚨 Konfigurasi Waktu Zona: Asia/Jakarta (WIB = UTC+07:00)
// Digunakan oleh Intl.DateTimeFormat untuk memastikan waktu yang diambil sudah benar.
const opsiZonaWaktuFormatter = { 
    timeZone: 'Asia/Jakarta', 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false // Menggunakan format 24 jam untuk perhitungan
};

// Objek Formatter yang lebih efisien untuk digunakan berulang kali
const formatter = new Intl.DateTimeFormat('en-US', opsiZonaWaktuFormatter);


function setWaktuUTC7() {
    const now = new Date();
    
    // 1. Ekstraksi Jam, Menit, Detik dari objek Date berdasarkan Zona Waktu
    const parts = formatter.formatToParts(now);
    
    // Mengambil nilai numerik dari bagian-bagian waktu yang diekstrak
    const jam = Number(parts.find(p => p.type === 'hour').value);
    const menit = Number(parts.find(p => p.type === 'minute').value);
    const detik = Number(parts.find(p => p.type === 'second').value);

    // --- Perhitungan Rotasi TANPA Offset +90 ---
    // (Diasumsikan 0 derajat rotasi di CSS adalah Pukul 12 / Atas)
    
    // Rotasi Detik (360 derajat / 60 detik = 6 derajat per detik)
    const derajatDetik = (detik / 60) * 360; 
    jarumDetik.style.transform = `rotate(${derajatDetik}deg)`;

    // Rotasi Menit (360 derajat / 60 menit = 6 derajat per menit)
    // Ditambahkan pergerakan halus (detik / 60) * 6
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    jarumMenit.style.transform = `rotate(${derajatMenit}deg)`;

    // Rotasi Jam (360 derajat / 12 jam = 30 derajat per jam)
    const jam12 = jam % 12; // Konversi ke format 12 jam (13 -> 1, 14 -> 2, dll. dan 12 -> 0)
    // Ditambahkan pergerakan halus (menit / 60) * 30
    const derajatJam = ((jam12 / 12) * 360) + ((menit / 60) * 30);
    jarumJam.style.transform = `rotate(${derajatJam}deg)`;
}

// Jalankan fungsi setWaktuUTC7 setiap 1000 milidetik (1 detik)
setInterval(setWaktuUTC7, 1000);

// Panggil sekali agar jam langsung menunjukkan waktu yang benar saat pertama dimuat
setWaktuUTC7();