let currentMenu = 'home';
let currentSection = 'main';
function changeContent(Menu, Section) {
    if (currentMenu != Menu) {
        // hide whole current Menu
        document.querySelector(`.${currentMenu}`).classList.toggle('active');
        document.querySelector(`.${currentMenu}Menu`).classList.toggle('hidden');

        //activate the clicked menu
        currentMenu = Menu;
        document.querySelector(`.${Menu}`).classList.toggle('active');
        document.querySelector(`.${Menu}Menu`).classList.toggle('hidden');
        let upperCase = Menu.charAt(0).toUpperCase() + Menu.replace(Menu.charAt(0), '')
        document.title = `oSmart | ${upperCase}`
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // hide the current section
        document.querySelector(`.${currentMenu}-${currentSection}-contents`).classList.toggle('hidden');

        // activate the clicked section
        currentSection = Section;
        document.querySelector(`.${currentMenu}-${Section}-contents`).classList.toggle('hidden');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
}

// if you're in services menu then click on the home menu, then it will redirect you to current section of home menu {reason: if statement will be triggered}, then if you click on the home menu again, it will redirect you to the main section of home menu {reason: else statement will be triggered}


function delayedRedirect(link) {
    setTimeout(function () {
        window.open(link, '_blank');
    }, 250);
}


window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';  // Hide the loading screen
});
