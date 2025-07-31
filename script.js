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


const searchLogo = document.querySelector('.searchLogo');














const searchToggle = document.getElementById("search-toggle");
const searchBar = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");


function restoreSearch() {
    setTimeout(() => {
        if (searchInput.value.trim() === "") {
            searchMode = false;
            searchBar.classList.add("hidden");
            searchToggle.classList.remove("hidden");
            shelvesEl.innerHTML = "";
            shelfIndex = 0;
            loadNextShelf();
            checkIfMoreShelvesNeeded();
        }
    }, 150);
}





// Na wanjae
window.addEventListener('beforeunload', function (event) {
    // Prompt the user before leaving the page
    event.preventDefault();
    // event.defaultPrevented
    event.returnValue = ''; // Required for some browsers
});






// scroll to the nth offer card when the nth radio button is clicked
const offerRadioButtons = document.getElementsByName('offer');
document.querySelector(".specialOfferCards").scrollTo({
    left: 0,
    behavior: 'smooth'
});

setInterval(() => {
    const checkedRadio = document.querySelector(".offerRadio:checked");
    if (checkedRadio) {
        const nextRadio = checkedRadio.nextElementSibling;
        if (nextRadio) {
            nextRadio.checked = true;
        } else {
            document.querySelector(".offerRadio").checked = true;
        }
    }
    
    offerRadioButtons.forEach((radioButton, index) => {
        if (radioButton.checked == true) {
            const card = document.querySelector(".specialOfferCards .offerCard");
            const cardWidth = card.offsetWidth;
            const cardStyle = getComputedStyle(card);
            const cardMargin = parseInt(cardStyle.marginRight) || 0;
            document.querySelector(".specialOfferCards").scrollTo({
                left: index * (cardWidth + cardMargin + 20),
                behavior: 'smooth'
            });
        }
    });
}, 3000);



offerRadioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener('click', () => {
        if (radioButton.checked == true) {
            const card = document.querySelector(".specialOfferCards .offerCard");
            const cardWidth = card.offsetWidth;
            const cardStyle = getComputedStyle(card);
            const cardMargin = parseInt(cardStyle.marginRight) || 0;
            document.querySelector(".specialOfferCards").scrollTo({
                left: index * (cardWidth + cardMargin + 20),
                behavior: 'smooth'
            });
        }
    });
});

