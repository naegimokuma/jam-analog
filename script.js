const jarumDetik = document.querySelector('.detik');
const jarumMenit = document.querySelector('.menit');
const jarumJam = document.querySelector('.jam');
const elemenTengah = document.querySelector('.tengah');

let waktuSekarang = null; 

async function sinkronkanWaktu() {
    try {
        const response = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
        const data = await response.json();
        const waktuBaru = new Date(data.dateTime);
        
        if (!isNaN(waktuBaru.getTime())) {
            waktuSekarang = waktuBaru;
        }
    } catch (err) {
        if (!waktuSekarang) {
            waktuSekarang = new Date();
        }
    }
}

function jalankanWaktu() {
    if (!waktuSekarang || isNaN(waktuSekarang.getTime())) return;

    waktuSekarang.setSeconds(waktuSekarang.getSeconds() + 1);

    const detik = waktuSekarang.getSeconds();
    const menit = waktuSekarang.getMinutes();
    const jam = waktuSekarang.getHours();

    const isMalam = (jam >= 18 || jam < 6);
    
    const daftarElemen = [jarumJam, jarumMenit, jarumDetik, elemenTengah];
    daftarElemen.forEach(el => {
        if (el) {
            if (isMalam) {
                el.classList.add('mode-malam');
            } else {
                el.classList.remove('mode-malam');
            }
        }
    });

    const derajatDetik = (detik / 60) * 360; 
    const derajatMenit = ((menit / 60) * 360) + ((detik / 60) * 6);
    const derajatJam = (((jam % 12) / 12) * 360) + ((menit / 60) * 30);

    if (jarumDetik) jarumDetik.style.transform = `translateX(-50%) rotate(${derajatDetik}deg)`;
    if (jarumMenit) jarumMenit.style.transform = `translateX(-50%) rotate(${derajatMenit}deg)`;
    if (jarumJam) jarumJam.style.transform = `translateX(-50%) rotate(${derajatJam}deg)`;
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        sinkronkanWaktu();
    }
});

sinkronkanWaktu().then(() => {
    setInterval(jalankanWaktu, 1000);
    jalankanWaktu();
});

setInterval(sinkronkanWaktu, 1800000);
