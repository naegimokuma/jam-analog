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
    
    // 2. KOREKSI: Kurangi 10 menit agar kembali ke 10.05
    // (10 menit * 60 detik * 1000 milidetik)
    const waktuKoreksi = new Date(now.getTime() - (10 * 60 * 1000));
    
    // 3. Gunakan waktuKoreksi untuk mengambil bagian jam/menit/detik
    const parts = formatter.formatToParts(waktuKoreksi);
    
    const jam = Number(parts.find(p => p.type === 'hour').value);
    const menit = Number(parts.find(p => p.type === 'minute').value);
    const detik = Number(parts.find(p => p.type === 'second').value);

    // --- Perhitungan Rotasi ---
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const jam12 = jam % 12;
    const derajatJam = ((jam12 / 12) * 360) + ((menit / 60) * 30);

    // Terapkan rotasi
    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// Jalankan setiap detik
setInterval(setWaktuUTC7, 1000);
setWaktuUTC7();
