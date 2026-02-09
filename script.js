const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');

let waktuSekarang = null; 

/**
 * 1. Mengambil waktu real-time dari Server Jakarta
 */
async function sinkronkanWaktu() {
    try {
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
        const data = await response.json();
        
        waktuSekarang = new Date(data.dateTime);
        console.log("Sinkronisasi Berhasil: Waktu server diperbarui.");
    } catch (err) {
        console.error("Gagal sinkronisasi dengan server.");
        // Fallback ke waktu lokal jika server gagal
        waktuSekarang = new Date();
    }
}

/**
 * 2. Logika pergerakan jarum & Perubahan Gambar
 */
function jalankanWaktu() {
    if (!waktuSekarang) return;

    waktuSekarang.setSeconds(waktuSekarang.getSeconds() + 1);

    const detik = waktuSekarang.getSeconds();
    const menit = waktuSekarang.getMinutes();
    const jam = waktuSekarang.getHours();

    // --- LOGIKA DURASI 18:00 - 06:00 ---
    // Jika jam >= 18 (sore) ATAU jam < 6 (pagi)
    if (jam >= 18 || jam < 6) {
        jarumJam.classList.add('mode-malam');
        jarumMenit.classList.add('mode-malam');
        jarumDetik.classList.add('mode-malam');
    } else {
        jarumJam.classList.remove('mode-malam');
        jarumMenit.classList.remove('mode-malam');
        jarumDetik.classList.remove('mode-malam');
    }

    // Kalkulasi rotasi
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const derajatJam = (((jam % 12) / 12) * 360) + ((menit / 60) * 30);

    // Update tampilan visual
    // Note: Tetap gunakan translateX(-50%) agar jarum tetap center secara horizontal
    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

/**
 * 3. Deteksi Tab Aktif
 */
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        sinkronkanWaktu();
    }
});

/**
 * 4. Inisialisasi
 */
sinkronkanWaktu().then(() => {
    setInterval(jalankanWaktu, 1000);
    jalankanWaktu();
});

// Re-sinkronisasi otomatis setiap 30 menit
setInterval(sinkronkanWaktu, 1800000);
