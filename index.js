document.addEventListener('DOMContentLoaded', () => {
    // قاموس الترجمة للغة العربية والإنجليزي
    const translations = {
        ar: {
            pageTitle: "تسجيل الدخول",
            title: "مرحباً بك مجدداً",
            subtitle: "سجّل دخولك للوصول إلى حسابك",
            usernamePlaceholder: "اسم المستخدم أو البريد",
            passwordPlaceholder: "كلمة السر",
            rememberMe: "تذكرني",
            forgotPassword: "نسيت كلمة السر؟",
            loginBtn: "تسجيل الدخول",
            noAccount: "ليس لديك حساب؟",
            register: "أنشئ حساباً جديداً",
            successMsg: "تم تسجيل الدخول بنجاح!"
        },
        en: {
            pageTitle: "Login",
            title: "Welcome Back",
            subtitle: "Log in to access your account",
            usernamePlaceholder: "Username or Email",
            passwordPlaceholder: "Password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot password?",
            loginBtn: "Sign In",
            noAccount: "Don't have an account?",
            register: "Create new account",
            successMsg: "Logged in successfully!"
        }
    };

    let currentLang = 'ar';
    let currentTheme = 'dark';

    const langToggleBtn = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const loginForm = document.getElementById('loginForm');
    const toast = document.getElementById('toast');

    // 1. التبديل بين العربي والإنجليزي مع تأثير ناعم متناغم
    langToggleBtn.addEventListener('click', () => {
        const wrapper = document.querySelector('.login-wrapper');
        
        // إخفاء الكارت بنعومة أولاً
        wrapper.classList.add('fade-out');

        setTimeout(() => {
            // تغيير اللغة والاتجاه أثناء الاختفاء
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            document.documentElement.lang = currentLang;
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            langText.textContent = currentLang === 'ar' ? 'English' : 'عربي';

            updateLanguage();

            // إعادة إظهار الكارت بنعومة
            wrapper.classList.remove('fade-out');
        }, 200); // 200 مللي ثانية للتأخير لمنح الشعور بالانسيابية
    });

    function updateLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[currentLang][key]) {
                el.placeholder = translations[currentLang][key];
            }
        });

        document.getElementById('pageTitle').textContent = translations[currentLang].pageTitle;
    }

    // 2. التبديل بين الوضع الليلي والنهاري
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    });

    // 3. إرسال النموذج وإظهار الإشعار
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast();
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});