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
    ageValue.textContent = this.value;
    updateRangeProgress();
    calculate();
});

genderInputs.forEach(input => {
    input.addEventListener('change', calculate);
});

// İlk hesablama
updateRangeProgress();
calculate();
