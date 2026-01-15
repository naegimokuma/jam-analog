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

function setWaktuUTC7Minus10() {
    // 1. Ambil waktu sekarang
    const now = new Date();
    
    // 2. KURANGI 10 menit (10 menit * 60 detik * 1000 milidetik)
    const waktuTujuan = new Date(now.getTime() - (10 * 60 * 1000));
    
    // 3. Masukkan waktu yang sudah dikurangi ke formatter
    const parts = formatter.formatToParts(waktuTujuan);
    
    const jam = Number(parts.find(p => p.type === 'hour').value);
    const menit = Number(parts.find(p => p.type === 'minute').value);
    const detik = Number(parts.find(p => p.type === 'second').value);

    // --- Perhitungan Rotasi ---
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const jam12 = jam % 12;
    const derajatJam = ((jam12 / 12) * 360) + ((menit / 60) * 30);

    // Terapkan rotasi dengan perbaikan posisi tengah
    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// Jalankan setiap detik
setInterval(setWaktuUTC7Minus10, 1000);

// Panggil langsung agar tidak menunggu 1 detik pertama
setWaktuUTC7Minus10();
