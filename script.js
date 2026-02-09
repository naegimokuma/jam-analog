const jarumDetik = document.querySelector('.detik')
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');
const elemenTengah = document.querySelector('.tengah'); // Tambahkan ini

let waktuSekarang = null; 

async function sinkronkanWaktu() {
    try {
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
        const data = await response.json();
        waktuSekarang = new Date(data.dateTime);
        console.log("Sinkronisasi Berhasil.");
    } catch (err) {
        console.error("Gagal sinkronisasi, menggunakan waktu lokal.");
        waktuSekarang = new Date();
    }
}

function jalankanWaktu() {
    if (!waktuSekarang) return;

    waktuSekarang.setSeconds(waktuSekarang.getSeconds() + 1);

    const detik = waktuSekarang.getSeconds();
    const menit = waktuSekarang.getMinutes();
    const jam = waktuSekarang.getHours();

    // --- LOGIKA DURASI 18:00 - 06:00 ---
    const isMalam = (jam >= 18 || jam < 6);
    
    // Fungsi pembantu agar kode lebih rapi
    const daftarElemen = [jarumJam, jarumMenit, jarumDetik, elemenTengah];
    daftarElemen.forEach(el => {
        if (el) { // Pastikan elemen ada di HTML
            isMalam ? el.classList.add('mode-malam') : el.classList.remove('mode-malam');
        }
    });

    // Kalkulasi rotasi
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const derajatJam = (((jam % 12) / 12) * 360) + ((menit / 60) * 30);

    // Update tampilan visual
    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// ... sisanya sama seperti kode Anda ...

