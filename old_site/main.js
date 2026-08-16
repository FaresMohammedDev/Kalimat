const unit7 = [
    { en: 'Inclusive', ar: 'شامل / دامج' },
    { en: 'Valued', ar: 'مُقدَّر / ذو قيمة' },
    { en: 'Diversity', ar: 'تنوع / اختلاف' },
    { en: 'Fairness', ar: 'عدل / إنصاف' },
    { en: 'Cooperation', ar: 'تعاون' },
    { en: 'Invite', ar: 'يدعو' },
    { en: 'Belong', ar: 'ينتمي' },
    { en: 'Community', ar: 'مجتمع' },
    { en: 'Backgrounds', ar: 'خلفيات (ثقافية أو اجتماعية)' },
    { en: 'Abilities', ar: 'قدرات' },
    { en: 'Personalities', ar: 'شخصيات' },
    { en: 'Conflicts', ar: 'صراعات / خلافات' },
    { en: 'Empathy', ar: 'تعاطف' },
    { en: 'Responsibility', ar: 'مسؤولية' },
    { en: 'Encourage', ar: 'يشجع' },
    { en: 'Confident', ar: 'واثق من نفسه' },
    { en: 'Include', ar: 'يشمل / يضم' },
    { en: 'Gratitude', ar: 'امتنان / شكر' },
    { en: 'Appreciate', ar: 'يُقدِّر (مجهود أو شخص)' },
    { en: 'Notice', ar: 'يلاحظ' },
    { en: 'Kindness', ar: 'طيبة / عطف' },
    { en: 'Argue over', ar: 'يجادل بشأن / يتشاجر على' },
    { en: 'Gathering', ar: 'تجمع / لقاء' },
    { en: 'Interrupt', ar: 'يقاطع (في الكلام)' },
    { en: 'Mediators', ar: 'وسطاء (لحل النزاع)' },
    { en: 'Misunderstanding', ar: 'سوء فهم' },
    { en: 'Resident', ar: 'مقيم / ساكن' },
    { en: 'Take on', ar: 'يتولى (مسؤولية أو دور)' },
    { en: 'Resolve', ar: 'يحل (مشكلة أو نزاع)' },
    { en: 'Neighborhood', ar: 'حي سكني' },
    { en: 'Respectfully', ar: 'باحترام' },
    { en: 'Role models', ar: 'قدوة / مثل أعلى' },
    { en: 'Social isolation', ar: 'عزلة اجتماعية' },
    { en: 'Elderly', ar: 'كبار السن' },
    { en: 'Interact', ar: 'يتفاعل' },
    { en: 'Loneliness', ar: 'شعور بالوحدة' },
    { en: 'Depression', ar: 'اكتئاب' },
    { en: 'Intergenerational', ar: 'بين الأجيال' }
];

const unit8 = [
    { en: 'Change-maker', ar: 'صانع التغيير' },
    { en: 'Determination', ar: 'عزيمة / إصرار' },
    { en: 'Persistence', ar: 'مثابرة' },
    { en: 'Passion', ar: 'شغف / عاطفة قوية' },
    { en: 'Give access to', ar: 'يتيح الوصول إلى / يسمح بالدخول' },
    { en: 'Light a spark of hope', ar: 'يضيء شرارة أمل' },
    { en: 'Teamwork', ar: 'عمل جماعي' },
    { en: 'Innovation', ar: 'ابتكار' },
    { en: 'Enthusiasm', ar: 'حماس' },
    { en: 'Obstacle', ar: 'عقبة / عائق' },
    { en: 'Perseverance', ar: 'إصرار على المواصلة / جلد' },
    { en: 'Separate', ar: 'يفصل / يفرق' },
    { en: 'Campaign', ar: 'حملة' },
    { en: 'Volunteer', ar: 'متطوع / يتطوع' },
    { en: 'Environment', ar: 'بيئة' },
    { en: 'Recycling', ar: 'إعادة تدوير' },
    { en: 'Awareness', ar: 'وعي' },
    { en: 'Ordinary', ar: 'عادي / مألوف' },
    { en: 'Extraordinary', ar: 'استثنائي / غير عادي' },
    { en: 'Endangered wildlife', ar: 'الحياة البرية المهددة بالانقراض' },
    { en: 'Creativity', ar: 'إبداع' },
    { en: 'Deed', ar: 'عمل / فعل' },
    { en: 'Courage', ar: 'شجاعة' },
    { en: 'E-waste (Electronic waste)', ar: 'نفايات إلكترونية' },
    { en: 'Funding', ar: 'تمويل' },
    { en: 'Social responsibility', ar: 'مسؤولية مجتمعية' },
    { en: 'Coding', ar: 'برمجة' },
    { en: 'Passionate about', ar: 'شغوف بـ' },
    { en: 'Practical abilities', ar: 'قدرات عملية' },
    { en: 'Brilliant', ar: 'عبقري / متألق' },
    { en: 'Imagination', ar: 'خيال' },
    { en: 'Curiosity', ar: 'فضول' },
    { en: 'Achievers', ar: 'منجزون / ناجحون' },
    { en: 'Protect', ar: 'يحمي' },
    { en: 'Safety', ar: 'أمان' }
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
