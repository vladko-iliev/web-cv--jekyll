(function() {
    // Tabs logic
    var tabButtons = document.querySelectorAll('.tab-button');
    var sections = document.querySelectorAll('.tab-section');

    function activateTab(targetId) {
        sections.forEach(function(sec) {
            sec.classList.toggle('active', sec.id === targetId);
        });
        tabButtons.forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
        });

        // No need for underline in vertical tabs
    }

    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var target = btn.getAttribute('data-target');
            activateTab(target);
            if (history && history.replaceState) {
                history.replaceState(null, '', '#' + target);
            } else {
                location.hash = target;
            }
        });
    });

    // Initialize from hash if present
    var initial = (location.hash || '#about').replace('#', '');
    if (document.getElementById(initial)) {
        activateTab(initial);
    }

    // Theme toggle
    var THEME_KEY = 'preferredTheme';
    var toggleBtn = document.getElementById('theme-toggle');
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }

    try {
        var savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) applyTheme(savedTheme);
    } catch (e) {}

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            var isDark = document.body.classList.toggle('dark');
            try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (e) {}
            var icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    }

    // i18n
    var LANG_KEY = 'preferredLang';
    var translations = {
        en: {
            'tabs.about': 'About me',
            'tabs.experience': 'Experience',
            'tabs.education': 'Education',
            'tabs.skills': 'Skills',
            'sections.about': 'About me',
            'sections.experience': 'Experience',
            'sections.education': 'Education',
            'sections.skills': 'Skills',
            'about.text': 'I am a QA manual tester with no experience and some knowledge of HTML & CSS.',
            'about.passion': 'I am passionate about software quality and strive to ensure the best user experience through careful testing and analysis.',
            'about.attention.title': 'Attention to Detail',
            'about.attention.desc': 'Focused on finding even the smallest issues',
            'about.analytical.title': 'Analytical Thinking',
            'about.analytical.desc': 'Ability for logical analysis and problem solving',
            'about.teamwork.title': 'Teamwork',
            'about.teamwork.desc': 'Excellent communication with developers and product managers',
            'experience.beginner.title': 'QA Manual Tester (Beginner)',
            'experience.beginner.company': 'Looking for first opportunity',
            'experience.beginner.date': '2024 - Present',
            'experience.beginner.desc': 'Ready to start my career as a QA Manual Tester. I have theoretical knowledge and desire to learn.',
            'experience.beginner.point1': 'Learning the basics of manual testing',
            'experience.beginner.point2': 'Practicing test case creation',
            'experience.beginner.point3': 'Developing skills for bug detection and documentation',
            'experience.beginner.point4': 'Learning different testing methodologies',
            'experience.ready.title': 'Ready for New Challenges',
            'experience.ready.desc': 'Despite the lack of professional experience, I have strong motivation and desire to develop in the field of QA testing.',
            'education.qa.title': 'QA Fundamentals and Manual Testing',
            'education.qa.institution': 'SoftUni',
            'education.qa.date': 'June 2023',
            'education.qa.desc': 'Completed a course on QA testing fundamentals and manual testing, where I learned:',
            'education.qa.point1': 'Basic principles of software testing',
            'education.qa.point2': 'Types of tests and testing techniques',
            'education.qa.point3': 'Creating and executing test cases',
            'education.qa.point4': 'Documenting and tracking defects',
            'education.qa.point5': 'Working with test documentation',
            'education.learning.title': 'Continuous Learning',
            'education.learning.desc': 'I continue to self-educate through online resources, documentation and practical exercises.',
            'skills.html': 'HTML/CSS',
            'skills.postman': 'Postman',
            'skills.sql': 'SQL',
            'skills.manual': 'Ръчно тестване',
            'skills.testcases': 'Test Cases',
            'skills.bugtracking': 'Bug Tracking',
            'cookie.text': 'This site uses cookies to improve your experience. By accepting, you agree to our cookie policy.',
            'cookie.accept': 'Accept',
            'cookie.decline': 'Decline',
            'footer.rights': '© 2025 Vladmir Iliev. All rights reserved.'
        },
        de: {
            'tabs.about': 'Über mich',
            'tabs.experience': 'Berufserfahrung',
            'tabs.education': 'Ausbildung',
            'tabs.skills': 'Fähigkeiten',
            'sections.about': 'Über mich',
            'sections.experience': 'Berufserfahrung',
            'sections.education': 'Ausbildung',
            'sections.skills': 'Fähigkeiten',
            'about.text': 'Ich bin ein manueller QA-Tester ohne Erfahrung und habe Grundkenntnisse in HTML & CSS.',
            'about.passion': 'Ich bin leidenschaftlich für Softwarequalität und strebe danach, die beste Benutzererfahrung durch sorgfältiges Testen und Analyse zu gewährleisten.',
            'about.attention.title': 'Aufmerksamkeit für Details',
            'about.attention.desc': 'Fokussiert auf das Finden auch der kleinsten Probleme',
            'about.analytical.title': 'Analytisches Denken',
            'about.analytical.desc': 'Fähigkeit zur logischen Analyse und Problemlösung',
            'about.teamwork.title': 'Teamarbeit',
            'about.teamwork.desc': 'Ausgezeichnete Kommunikation mit Entwicklern und Produktmanagern',
            'experience.beginner.title': 'QA Manual Tester (Anfänger)',
            'experience.beginner.company': 'Suche erste Gelegenheit',
            'experience.beginner.date': '2024 - Gegenwart',
            'experience.beginner.desc': 'Bereit, meine Karriere als QA Manual Tester zu beginnen. Ich habe theoretisches Wissen und Lernbereitschaft.',
            'experience.beginner.point1': 'Erlernen der Grundlagen des manuellen Testens',
            'experience.beginner.point2': 'Üben der Testfall-Erstellung',
            'experience.beginner.point3': 'Entwickeln von Fähigkeiten zur Fehlererkennung und -dokumentation',
            'experience.beginner.point4': 'Erlernen verschiedener Testmethodologien',
            'experience.ready.title': 'Bereit für neue Herausforderungen',
            'experience.ready.desc': 'Trotz mangelnder Berufserfahrung habe ich starke Motivation und den Wunsch, mich im Bereich QA-Testing zu entwickeln.',
            'education.qa.title': 'QA Grundlagen und Manuelles Testen',
            'education.qa.institution': 'SoftUni',
            'education.qa.date': 'Juni 2023',
            'education.qa.desc': 'Abgeschlossener Kurs über QA-Testing-Grundlagen und manuelles Testen, wo ich gelernt habe:',
            'education.qa.point1': 'Grundprinzipien des Software-Testens',
            'education.qa.point2': 'Testarten und Testtechniken',
            'education.qa.point3': 'Erstellen und Ausführen von Testfällen',
            'education.qa.point4': 'Dokumentieren und Verfolgen von Defekten',
            'education.qa.point5': 'Arbeiten mit Testdokumentation',
            'education.learning.title': 'Kontinuierliches Lernen',
            'education.learning.desc': 'Ich bilde mich weiterhin durch Online-Ressourcen, Dokumentation und praktische Übungen selbst weiter.',
            'skills.html': 'HTML/CSS',
            'skills.postman': 'Postman',
            'skills.sql': 'SQL',
            'skills.manual': 'Manuelles Testen',
            'skills.testcases': 'Testfälle',
            'skills.bugtracking': 'Fehlerverfolgung',
            'cookie.text': 'Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Mit der Annahme stimmen Sie unserer Cookie-Richtlinie zu.',
            'cookie.accept': 'Akzeptieren',
            'cookie.decline': 'Ablehnen',
            'footer.rights': '© 2025 Vladmir Iliev. Alle Rechte vorbehalten.'
        },
        bg: {
            'tabs.about': 'За мен',
            'tabs.experience': 'Трудов опит',
            'tabs.education': 'Образование',
            'tabs.skills': 'Умения',
            'sections.about': 'За мен',
            'sections.experience': 'Трудов опит',
            'sections.education': 'Образование',
            'sections.skills': 'Умения',
            'about.text': 'Аз съм QA manual tester без опит и имам малко познания по HTML & CSS.',
            'about.passion': 'Страстен съм към качеството на софтуера и стремя се да осигуря най-доброто потребителско изживяване чрез внимателно тестване и анализ.',
            'about.attention.title': 'Внимание към детайлите',
            'about.attention.desc': 'Фокусиран върху откриването на дори най-малките проблеми',
            'about.analytical.title': 'Аналитично мислене',
            'about.analytical.desc': 'Способност за логически анализ и решаване на проблеми',
            'about.teamwork.title': 'Екипна работа',
            'about.teamwork.desc': 'Отлична комуникация с разработчици и продуктови мениджъри',
            'experience.beginner.title': 'QA Manual Tester (Начинаещ)',
            'experience.beginner.company': 'Търся първа възможност',
            'experience.beginner.date': '2024 - Настоящ момент',
            'experience.beginner.desc': 'Готов съм да започна кариерата си като QA Manual Tester. Имам теоретични знания и желание за учене.',
            'experience.beginner.point1': 'Изучавам основите на мануалното тестване',
            'experience.beginner.point2': 'Практикувам създаването на тест кейсове',
            'experience.beginner.point3': 'Развивам умения за откриване и документиране на бъгове',
            'experience.beginner.point4': 'Изучавам различни методологии за тестване',
            'experience.ready.title': 'Готов за нови предизвикателства',
            'experience.ready.desc': 'Въпреки липсата на професионален опит, имам силна мотивация и желание да се развивам в областта на QA тестването.',
            'education.qa.title': 'QA Fundamentals and Manual Testing',
            'education.qa.institution': 'SoftUni',
            'education.qa.date': 'Юни 2023',
            'education.qa.desc': 'Завърших курс по основи на QA тестването и мануално тестване, където изучих:',
            'education.qa.point1': 'Основни принципи на софтуерното тестване',
            'education.qa.point2': 'Видове тестове и тестови техники',
            'education.qa.point3': 'Създаване и изпълнение на тест кейсове',
            'education.qa.point4': 'Документиране и проследяване на дефекти',
            'education.qa.point5': 'Работа с тестова документация',
            'education.learning.title': 'Непрекъснато обучение',
            'education.learning.desc': 'Продължавам да се самообразовам чрез онлайн ресурси, документация и практически упражнения.',
            'skills.html': 'HTML/CSS',
            'skills.postman': 'Postman',
            'skills.sql': 'SQL',
            'skills.manual': 'Мануално тестване',
            'skills.testcases': 'Тест кейсове',
            'skills.bugtracking': 'Проследяване на бъгове',
            'cookie.text': 'Този сайт използва бисквитки, за да подобри вашето изживяване. С приемането им се съгласявате с нашата политика за бисквитки.',
            'cookie.accept': 'Приемам',
            'cookie.decline': 'Отказвам',
            'footer.rights': '© 2025 Владмир Илиев. Всички права запазени.'
        }
    };

    function applyLanguage(lang) {
        var dict = translations[lang];
        if (!dict) return;
        
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
        
        document.querySelectorAll('.lang-button').forEach(function(btn){
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // Initialize language after DOM is loaded
    function initLanguage() {
        try {
            var savedLang = localStorage.getItem(LANG_KEY) || 'bg';
            applyLanguage(savedLang);
        } catch (e) { 
            applyLanguage('bg'); 
        }

        document.querySelectorAll('.lang-button').forEach(function(btn){
            btn.addEventListener('click', function(){
                var lang = btn.getAttribute('data-lang');
                applyLanguage(lang);
                try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
            });
        });
    }

    // Call initLanguage when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }

    // Cookie banner logic
    var COOKIE_KEY = 'cookieConsent';
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    function hideBanner() {
        if (banner) banner.style.display = 'none';
    }

    function showBanner() {
        if (banner) banner.style.display = 'block';
    }

    try {
        var consent = localStorage.getItem(COOKIE_KEY);
        if (!consent) {
            showBanner();
        }
    } catch (e) {
        // If storage is blocked, still show the banner
        showBanner();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            try { localStorage.setItem(COOKIE_KEY, 'accepted'); } catch (e) {}
            hideBanner();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            try { localStorage.setItem(COOKIE_KEY, 'declined'); } catch (e) {}
            hideBanner();
        });
    }
})();


