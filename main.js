const unit7 = [
    { en: 'belong (v)', ar: 'ينتمي - يتبع' },
    { en: 'confident (adj)', ar: 'واثق - معتمد على نفسه' },
    { en: 'cooperation (n)', ar: 'تعاون' },
    { en: 'diversity (n)', ar: 'تنوع' },
    { en: 'encourage (v)', ar: 'يشجع - يحث' },
    { en: 'fairness (n)', ar: 'عدالة - إنصاف' },
    { en: 'include (v)', ar: 'يشمل - يدمج' },
    { en: 'included (adj)', ar: 'مدمج - مُدرج' },
    { en: 'inclusive (adj)', ar: 'شامل - دامج' },
    { en: 'inclusive playground (n)', ar: 'ملعب شامل - ساحة لعب دامجة' },
    { en: 'invite (v)', ar: 'يدعو' },
    { en: 'valued (adj)', ar: 'مقدر' },
    { en: 'address (v)', ar: 'يعالج - يتناول' },
    { en: 'argue over (v)', ar: 'يتجادل حول' },
    { en: 'gathering (n)', ar: 'تجمع - تجمهر' },
    { en: 'handle (v)', ar: 'يتعامل مع - يواجه' },
    { en: 'mediator (n)', ar: 'وسيط' },
    { en: 'misunderstanding (n)', ar: 'سوء فهم' },
    { en: 'resident (n)', ar: 'مقيم - نزيل' },
    { en: 'resolve (v)', ar: 'يحل - يسوي' },
    { en: 'take on (v)', ar: 'يقبل القيام بـ - يتولى' }
];

const unit8 = [
    { en: 'change-maker (n)', ar: 'صانع التغيير' },
    { en: 'determination (n)', ar: 'عزيمة / إصرار' },
    { en: 'give access to (v)', ar: 'يتيح الوصول إلى / يسمح بالدخول' },
    { en: 'innovation (n)', ar: 'ابتكار' },
    { en: 'light a spark of hope (v)', ar: 'يضيء شرارة أمل' },
    { en: 'passion (n)', ar: 'شغف / عاطفة قوية' },
    { en: 'persistence (n)', ar: 'مثابرة' },
    { en: 'teamwork (n)', ar: 'عمل جماعي' },
    { en: 'awareness (n)', ar: 'وعي' },
    { en: 'campaign (n)', ar: 'حملة' },
    { en: 'enthusiasm (n)', ar: 'حماس' },
    { en: 'environment (n)', ar: 'بيئة' },
    { en: 'obstacle (n)', ar: 'عقبة / عائق' },
    { en: 'perseverance (n)', ar: 'مثابرة / إصرار على المواصلة' },
    { en: 'recycling (n)', ar: 'إعادة تدوير' },
    { en: 'separate (v)', ar: 'يفصل / يفرق' },
    { en: 'volunteer (n/v)', ar: 'متطوع / يتطوع' }
];

let isArabicFront = false;

function createCardHTML(word) {
    const frontText = isArabicFront ? word.ar : word.en;
    const backText = isArabicFront ? word.en : word.ar;
    const frontDir = isArabicFront ? 'rtl' : 'ltr';
    const backDir = isArabicFront ? 'ltr' : 'rtl';

    return `
        <div class="flashcard" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-inner">
                <div class="flashcard-front" dir="${frontDir}">${frontText}</div>
                <div class="flashcard-back" dir="${backDir}">${backText}</div>
            </div>
        </div>
    `;
}

function renderCards() {
    const unit7Grid = document.getElementById('unit7-grid');
    const unit8Grid = document.getElementById('unit8-grid');

    unit7Grid.innerHTML = unit7.map(createCardHTML).join('');
    unit8Grid.innerHTML = unit8.map(createCardHTML).join('');
}

// Toggle Language
document.getElementById('toggleLangBtn').addEventListener('click', function() {
    isArabicFront = !isArabicFront;
    
    // Update button text
    const btnSpan = this.querySelector('span');
    if(isArabicFront) {
        btnSpan.textContent = 'Switch to English Front';
    } else {
        btnSpan.textContent = 'Switch to Arabic Front';
    }
    
    // Re-render
    renderCards();
});

// Copy Phone Number
document.querySelector('.copy-phone').addEventListener('click', function() {
    const phoneNumber = '+201203927960';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });
});

// Initialize
renderCards();
