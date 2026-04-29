const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');
const elemenTengah = document.querySelector('.tengah');

// KUNCI UTAMA: Simpan selisihnya, bukan objek waktunya
let offsetWaktu = 0; 
let sudahSinkron = false;

async function sinkronkanWaktu() {
    try {
        const waktuMulai = Date.now();
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
        const data = await response.json();
        
        const waktuServer = new Date(data.dateTime).getTime();
        const waktuLokal = Date.now();
        
        // Menghitung selisih antara server dan jam perangkat user
        offsetWaktu = waktuServer - waktuLokal;
        sudahSinkron = true;
        
        console.log("Sinkronisasi Berhasil. Selisih:", offsetWaktu, "ms");
    } catch (err) {
        console.warn("Gagal sinkron, menggunakan waktu lokal sementara.");
    }
}

function updateFrame() {
    // Ambil waktu saat ini dan sesuaikan dengan selisih server
    const sekarang = new Date(Date.now() + offsetWaktu);

    const detik = sekarang.getSeconds();
    const menit = sekarang.getMinutes();
    const jam = sekarang.getHours();

    // Hitung Derajat
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const derajatJam = (((jam % 12) / 12) * 360) + ((menit / 60) * 30);

    // Terapkan ke DOM
    if (jarumDetik) jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    if (jarumMenit) jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    if (jarumJam) jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;

    // Logika Mode Malam
    const isMalam = (jam >= 18 || jam < 6);
    [jarumJam, jarumMenit, jarumDetik, elemenTengah].forEach(el => {
        if (el) el.classList.toggle('mode-malam', isMalam);
    });
}

// Gunakan requestAnimationFrame agar gerakan lebih mulus daripada setInterval
function loop() {
    updateFrame();
    requestAnimationFrame(loop);
}

// Jalankan Loop
loop();

// Jalankan Sinkronisasi
sinkronkanWaktu();

// Re-sinkronisasi setiap 10 menit saja untuk menjaga akurasi tanpa membebani jaringan
setInterval(sinkronkanWaktu, 600000);

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') sinkronkanWaktu();
});
