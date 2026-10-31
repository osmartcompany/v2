document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    const localStorageKey = 'theme';

    // Image paths
    //const SUN_ICON = 'path/to/sun.png';   // Image shown when current theme is DARK (click to switch to light)
    //const MOON_ICON = 'path/to/moon.png'; // Image shown when current theme is LIGHT (click to switch to dark)
    
    const SUN_ICON = 'assets/sun.png';   // Image shown when current theme is DARK (click to switch to light)
    const MOON_ICON = 'assets/moon.png'; // Image shown when current theme is LIGHT (click to switch to dark)

    // Helper: Determine the active theme state ('dark' or 'light')
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Update DOM attribute, image icon, and localStorage
    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(localStorageKey, theme);

        if (theme === 'dark') {
            themeIcon.src = SUN_ICON;
            themeIcon.alt = 'Switch to Light Mode';
        } else {
            themeIcon.src = MOON_ICON;
            themeIcon.alt = 'Switch to Dark Mode';
        }
    }

    // 1. Initial Load: Check localStorage first, otherwise fallback to system preference
    let currentTheme = localStorage.getItem(localStorageKey);

    if (!currentTheme) {
        currentTheme = getSystemTheme();
    }

    applyTheme(currentTheme);

    // 2. Click Handler: Toggle between light and dark
    themeBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // 3. React to OS system theme changes IF user hasn't explicitly set a preference before page load
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(localStorageKey)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});