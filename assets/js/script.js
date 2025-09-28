(function() {
    'use strict';
    
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

        // Move animated underline
        var underline = document.querySelector('.tab-underline');
        var activeBtn = document.querySelector('.tab-button.active');
        if (underline && activeBtn) {
            var rect = activeBtn.getBoundingClientRect();
            var tabsRect = activeBtn.parentElement.getBoundingClientRect();
            underline.style.left = (rect.left - tabsRect.left) + 'px';
            underline.style.width = rect.width + 'px';
        }
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

    // Theme toggle with enhanced transitions and system preference detection
    var THEME_KEY = 'preferredTheme';
    var toggleBtn = document.getElementById('theme-toggle');
    
    function applyTheme(theme, skipStorage) {
        var isDark = theme === 'dark';
        document.body.classList.toggle('dark', isDark);
        
        if (toggleBtn) {
            var icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
                
                // Add rotation animation
                icon.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    icon.style.transition = 'none';
                    icon.style.transform = '';
                    setTimeout(() => {
                        icon.style.transition = 'transform 0.3s ease';
                    }, 50);
                }, 300);
            }
        }
        
        if (!skipStorage) {
            try {
                localStorage.setItem(THEME_KEY, theme);
            } catch (e) {}
        }
    }

    // Check system preference
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    function handleSystemThemeChange(e) {
        var savedTheme = localStorage.getItem(THEME_KEY);
        if (!savedTheme) {
            applyTheme(e.matches ? 'dark' : 'light', true);
        }
    }
    
    // Initialize theme
    try {
        var savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            handleSystemThemeChange(prefersDark);
        }
    } catch (e) {}

    // Listen for system theme changes
    prefersDark.addListener(handleSystemThemeChange);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            var isDark = document.body.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    // Scroll animations
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Image loading animation
    function setupImageLoading(img) {
        if (img.complete) {
            img.classList.add('loaded');
            var placeholder = img.previousElementSibling;
            if (placeholder && placeholder.classList.contains('avatar-placeholder')) {
                placeholder.style.display = 'none';
            }
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
                var placeholder = img.previousElementSibling;
                if (placeholder && placeholder.classList.contains('avatar-placeholder')) {
                    placeholder.style.display = 'none';
                }
            });
        }
    }

    var avatar = document.querySelector('.avatar');
    if (avatar) {
        var wrapper = document.createElement('div');
        wrapper.className = 'avatar-wrapper';
        avatar.parentNode.insertBefore(wrapper, avatar);
        
        var placeholder = document.createElement('div');
        placeholder.className = 'avatar-placeholder';
        wrapper.appendChild(placeholder);
        
        wrapper.appendChild(avatar);
        avatar.setAttribute('loading', 'lazy');
        setupImageLoading(avatar);
    }

    // i18n - Enhanced version with transitions
    var LANG_KEY = 'preferredLang';
    var contentElements = document.querySelectorAll('[data-i18n]');
    var langButtons = document.querySelectorAll('.lang-button');
    var activeTransition = false;

    function fadeOut(element) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            setTimeout(resolve, 300);
        });
    }

    function fadeIn(element) {
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    }

    async function applyLanguage(lang) {
        if (activeTransition) return;
        activeTransition = true;

        var dict = translations[lang];
        if (!dict) {
            activeTransition = false;
            return;
        }

        // Update buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
            
            // Rotate flag icon on active button
            const flagIcon = btn.querySelector('i');
            if (flagIcon) {
                if (btn.classList.contains('active')) {
                    flagIcon.style.transform = 'scale(1.1) rotate(360deg)';
                } else {
                    flagIcon.style.transform = 'scale(1) rotate(0)';
                }
            }
        });

        // Store preference
        try {
            localStorage.setItem(LANG_KEY, lang);
        } catch (e) {}

        // Fade out all content
        await Promise.all(
            Array.from(contentElements).map(el => fadeOut(el))
        );

        // Update content and fade in
        contentElements.forEach(el => {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
                fadeIn(el);
            }
        });

        activeTransition = false;
    }

    // Initialize language after DOM is loaded
    function initLanguage() {
        try {
            var savedLang = localStorage.getItem(LANG_KEY) || 'bg';
            applyLanguage(savedLang);
        } catch (e) { 
            applyLanguage('bg'); 
        }

        // Add click handlers
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                var lang = btn.getAttribute('data-lang');
                applyLanguage(lang);
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