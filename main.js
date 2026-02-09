// Sığorta haqqı cədvəli
const premiumRates = {
    male: {
        18: 53.39, 19: 53.42, 20: 53.47, 21: 53.49, 22: 53.55, 23: 53.59, 24: 53.68, 25: 53.69,
        26: 53.78, 27: 53.83, 28: 53.92, 29: 53.99, 30: 54.10, 31: 54.14, 32: 54.43, 33: 54.50,
        34: 54.53, 35: 54.70, 36: 54.81, 37: 54.98, 38: 55.27, 39: 55.32, 40: 55.60, 41: 55.88,
        42: 56.14, 43: 56.52, 44: 56.79, 45: 57.31, 46: 57.69, 47: 58.36, 48: 58.98, 49: 59.61,
        50: 60.59, 51: 61.58, 52: 62.26, 53: 63.45, 54: 64.87, 55: 66.17
    },
    female: {
        18: 53.30, 19: 53.33, 20: 53.38, 21: 53.40, 22: 53.46, 23: 53.50, 24: 53.59, 25: 53.61,
        26: 53.69, 27: 53.74, 28: 53.83, 29: 53.90, 30: 54.01, 31: 54.06, 32: 54.34, 33: 54.40,
        34: 54.43, 35: 54.59, 36: 54.70, 37: 54.87, 38: 55.16, 39: 55.21, 40: 55.47, 41: 55.76,
        42: 56.01, 43: 56.38, 44: 56.67, 45: 57.17, 46: 57.55, 47: 58.24, 48: 58.86, 49: 59.51,
        50: 60.48, 51: 61.41, 52: 62.08, 53: 63.27, 54: 64.70, 55: 66.05
    }
};

// DOM elementləri
const ageRange = document.getElementById('ageRange');
const ageValue = document.getElementById('ageValue');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const sigortaHaqqiEl = document.getElementById('sigortaHaqqi');
const klinikaKomissiyaEl = document.getElementById('klinikaKomissiya');
const cemiEl = document.getElementById('cemi');

// Sabit cəmi məbləğ
const CEMI_MEBLEC = 80;

// Hesablama funksiyası
function calculate() {
    const age = parseInt(ageRange.value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    // Sığorta haqqını cədvəldən götür
    let sigortaHaqqi;
    if (gender === 'kisi') {
        sigortaHaqqi = premiumRates.male[age];
    } else {
        sigortaHaqqi = premiumRates.female[age];
    }
    
    // Klinika komissiyası = 80 - Sığorta haqqı
    const klinikaKomissiya = CEMI_MEBLEC - sigortaHaqqi;
    
    // Nəticələri göstər
    sigortaHaqqiEl.textContent = sigortaHaqqi.toFixed(2) + ' AZN';
    klinikaKomissiyaEl.textContent = klinikaKomissiya.toFixed(2) + ' AZN';
    cemiEl.textContent = CEMI_MEBLEC.toFixed(2) + ' AZN';
    
    // Animasiya effekti
    animateValue(sigortaHaqqiEl);
    animateValue(klinikaKomissiyaEl);
}

// Animasiya effekti
function animateValue(element) {
    element.style.transform = 'scale(1.05)';
    element.style.color = '#667eea';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 200);
}

// Range slider üçün progress göstəricisi
function updateRangeProgress() {
    const value = ageRange.value;
    const min = ageRange.min;
    const max = ageRange.max;
    const percentage = ((value - min) / (max - min)) * 100;
    
    ageRange.style.background = `linear-gradient(to right, #667eea 0%, #764ba2 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
}

// Event listeners
ageRange.addEventListener('input', function() {
    ageValue.value = this.value;
    updateRangeProgress();
    calculate();
});

// Yaş input-u üçün event listener
ageValue.addEventListener('input', function() {
    let value = parseInt(this.value);
    
    // Boş dəyər üçün
    if (isNaN(value)) return;
    
    // Yalnız valid aralıqda hesabla
    if (value >= 18 && value <= 55) {
        ageRange.value = value;
        updateRangeProgress();
        calculate();
    }
});

// Focus itirdikdə limitləri yoxla
ageValue.addEventListener('blur', function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 18) {
        this.value = 18;
        ageRange.value = 18;
    } else if (value > 55) {
        this.value = 55;
        ageRange.value = 55;
    }
    updateRangeProgress();
    calculate();
});

genderInputs.forEach(input => {
    input.addEventListener('change', calculate);
});

// İlk hesablama
updateRangeProgress();
calculate();

// Modal funksionallığı
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', function() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ESC düyməsi ilə bağlama
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// PDF Download funksiyası
const downloadPdfBtn = document.getElementById('downloadPdf');

downloadPdfBtn.addEventListener('click', function() {
    const element = document.getElementById('tableContent');
    
    // Müvəqqəti olaraq height limitini götür
    const originalMaxHeight = element.style.maxHeight;
    const originalOverflow = element.style.overflow;
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';

    
    const opt = {
        margin: [3, 3, 3, 3],
        filename: 'Sigorta_Haqqi_Cedveli.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 1,
            useCORS: true,
            logging: false
        },
        jsPDF: { unit: 'mm', format: [297, 450], orientation: 'portrait' }
    };
    
    // Button-u deaktiv et
    downloadPdfBtn.disabled = true;
    downloadPdfBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
            <path d="M12 2C6.48 2 2 6.48 2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Yüklənir...
    `;
    
    html2pdf().set(opt).from(element).save().then(function() {
        // Ribbon-i sil
        const pdfRibbon = document.getElementById('pdfRibbon');
        if (pdfRibbon) pdfRibbon.remove();
        element.style.position = '';
        
        // Height limitini geri qaytar
        element.style.maxHeight = originalMaxHeight;
        element.style.overflow = originalOverflow;
        
        // Button-u yenidən aktiv et
        downloadPdfBtn.disabled = false;
        downloadPdfBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            PDF
        `;
    });
});