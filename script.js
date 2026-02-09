let offsetWaktu = 0; // Selisih waktu dalam milidetik

async function sinkronisasiWaktu() {
    try {
        // Mengambil data waktu Jakarta dari API publik
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
        const data = await response.json();
        
        const waktuServer = new Date(data.datetime);
        const waktuLokal = new Date();
        
        // Hitung selisih antara server dan jam komputer user
        offsetWaktu = waktuServer - waktuLokal;
        
        console.log("Waktu berhasil disinkronkan dengan server Jakarta");
    } catch (error) {
        console.error("Gagal sinkronisasi, menggunakan waktu lokal:", error);
    }
}

function setWaktuUTC7() {
    // Ambil waktu lokal dan tambahkan selisih dari server
    let now = new Date(Date.now() + offsetWaktu);

    const parts = formatter.formatToParts(now);
    
    const jam = Number(parts.find(p => p.type === 'hour').value);
    const menit = Number(parts.find(p => p.type === 'minute').value);
    const detik = Number(parts.find(p => p.type === 'second').value);

    // Perhitungan Rotasi (Logika tetap sama)
    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const jam12 = jam % 12;
    const derajatJam = ((jam12 / 12) * 360) + ((menit / 60) * 30);

    jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

// 1. Jalankan sinkronisasi saat halaman dimuat
sinkronisasiWaktu();

// 2. Update tampilan setiap detik
setInterval(setWaktuUTC7, 1000);

// 3. (Opsional) Sinkronisasi ulang setiap 15 menit agar tetap akurat
setInterval(sinkronisasiWaktu, 900000);
