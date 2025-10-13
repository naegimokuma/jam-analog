// Dapatkan elemen jarum dari HTML
const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');

// 🚨 PENTING: Opsi untuk memaksa zona waktu ke Jakarta (Waktu Indonesia Barat)
const opsiZonaWaktu = { 
    timeZone: 'Asia/Jakarta',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false // Menggunakan format 24 jam untuk perhitungan rotasi
};

function setWaktuJakarta() {
    // 1. Dapatkan string waktu yang diformat sesuai Zona Waktu Jakarta
    // Menggunakan 'en-US' dan opsiZonaWaktu menjamin format Jam:Menit:Detik
    const waktuString = new Date().toLocaleString('en-US', opsiZonaWaktu);
    
    // 2. Pisahkan Jam, Menit, Detik dari string dan konversi ke angka
    const [jam, menit, detik] = waktuString.split(':').map(Number);

    // --- Perhitungan Rotasi ---
    
    // Rotasi Detik: (detik/60)*360 derajat + 90 (offset)
    const derajatDetik = ((detik / 60) * 360) + 90;
    jarumDetik.style.transform = `rotate(${derajatDetik}deg)`;

    // Rotasi Menit: (menit/60)*360 derajat + (pergerakan halus dari detik) + 90 (offset)
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6) + 90;
    jarumMenit.style.transform = `rotate(${derajatMenit}deg)`;

    // Rotasi Jam: (jam%12)/12 * 360 derajat + (pergerakan halus dari menit) + 90 (offset)
    // Gunakan jam % 12 untuk konversi ke format 12 jam
    const jam12 = jam % 12; 
    const derajatJam = ((jam12 / 12) * 360) + ((menit / 60) * 30) + 90;
    jarumJam.style.transform = `rotate(${derajatJam}deg)`;
}

// Jalankan fungsi setWaktuJakarta setiap 1000 milidetik (1 detik)
setInterval(setWaktuJakarta, 1000);

// Panggil sekali agar jam langsung menunjukkan waktu yang benar saat pertama dimuat
setWaktuJakarta();