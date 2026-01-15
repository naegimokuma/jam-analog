// Dapatkan elemen jarum dari HTML
const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');

// Konfigurasi Waktu Zona: Asia/Jakarta
const formatter = new Intl.DateTimeFormat('en-US', { 
    timeZone: 'Asia/Jakarta', 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false 
});

function setWaktuUTC7() {
    // 1. Ambil waktu saat ini dari sistem
    const now = new Date();
    
    // 2. Ambil bagian jam/menit/detik sesuai zona Asia/Jakarta
    const parts = formatter.formatToParts(now);
    
    const jam = Number(parts.find(p => p.type === 'hour').value);
    const menit = Number(parts.find(p => p.type === 'minute').value);
    const detik = Number(parts.find(p => p.type === 'second').value);

    // --- Perhitungan Rotasi ---
    // Detik: 360 derajat / 60 detik = 6 derajat per detik
    const derajatDetik = (detik / 60) * 360; 
    
    // Menit: 360 derajat / 60 menit + pergeseran halus berdasarkan detik
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    
    // Jam: 360 derajat / 12 jam + pergeseran halus berdasarkan menit
    const jam12 = jam % 12;
    const derajatJam = ((jam12 / 12) * 360) + ((menit / 60) * 30);

    // Terapkan rotasi ke elemen CSS
    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// Jalankan setiap detik (1000ms)
setInterval(setWaktuUTC7, 1000);

// Panggil fungsi sekali di awal agar jarum langsung posisi tepat saat page load
setWaktuUTC7();
