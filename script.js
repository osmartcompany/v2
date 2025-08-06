const firebaseConfig = {
    apiKey: "AIzaSyDFmTqnpTzUpJ6-qOcQhSk3hBpZZvQ_4dk",
    authDomain: "edmart-982fc.firebaseapp.com",
    projectId: "edmart-982fc"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentMenu = 'home';
// let currentSection = 'main';
let runningSection = {
    home: 'main',
    services: 'main',
    activity: 'main',
    settings: 'main'
}

// class='mainSection'
function changeContent(Menu, Section) {
    if (Menu !== '') {
        document.querySelector(`.${currentMenu}`).classList.toggle('active');
        document.querySelector(`.${currentMenu}Menu`).classList.toggle('hidden')

        currentMenu = Menu
        document.querySelector(`.${currentMenu}`).classList.toggle('active');
        document.querySelector(`.${currentMenu}Menu`).classList.toggle('hidden')
        let upperCase = Menu.charAt(0).toUpperCase() + Menu.replace(Menu.charAt(0), '')
        document.title = `oSmart | ${upperCase}`
    }
    if (Section !== '') {
        document.querySelector(`.${`${currentMenu}-${runningSection[currentMenu]}`}`).classList.toggle('hidden')
        runningSection[currentMenu] = Section
        document.querySelector(`.${`${currentMenu}-${runningSection[currentMenu]}`}`).classList.toggle('hidden')
    }
}

function changeMenu(Menu) {
    currentMenu == Menu ? changeContent(Menu, 'main') : changeContent(Menu, '')
}





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














// const searchToggle = document.getElementById("search-toggle");
// const searchBar = document.getElementById("search-bar");
// const searchInput = document.getElementById("search-input");


// function restoreSearch() {
//     setTimeout(() => {
//         if (searchInput.value.trim() === "") {
//             searchMode = false;
//             searchBar.classList.add("hidden");
//             searchToggle.classList.remove("hidden");
//             shelvesEl.innerHTML = "";
//             shelfIndex = 0;
//             loadNextShelf();
//             checkIfMoreShelvesNeeded();
//         }
//     }, 150);
// }





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



let priceLoaded = ''; // Global variable to track if prices are loaded


// Select University is working, I checked it
async function selectUniversity(university) {
    let category = university;
    globalThis.category = category; // Store category globally
    if (priceLoaded != university) {
        // if its not previously loaded, then load the prices
        document.querySelectorAll('.boardServicePrice').forEach(e => e.textContent = "Loading...");
        priceLoaded = university;
        changeContent('services', 'selectBoardService');
        // await blabla()
        await loadServicePrice();
    } else {
        changeContent('services', 'selectBoardService');
    }
}

async function selectBoardService(product) {
    let productid = product; // Store serviceid globally
    globalThis.productid = productid
    document.getElementById("productid-input").value = productid;
    changeContent('services', 'boardServiceOrder');
    await fetchProduct(); // Default to Marks Certificate
}



function goBackToSelectBoardService() {
    changeContent('services', 'selectBoardService');
    document.getElementById("order-form").reset();
}










// Function to fetch and display board service prices
const serviceOptions = [
    "Marks_Certificate",
    "Pass_Certificate",
    "Pakka_Certificate",
    "Duplicate_Pakka_Certificate",
    "Migration",
    "Eligibility",
    "Affiliation",
    "Recounting_per_Paper",
    "Improvement_of_Grade",
    "Correction",
    "DOB_Certificate",
    "Certificate_Verification",
    "TC",
];


// async function loadServicePrice() {
//     for (const serviceOption of serviceOptions) {
//         try {
//             const docRef = db.collection("products").doc("certificate").collection(category).doc(serviceOption.replace(/_/g, ' '));
//             const docSnap = await docRef.get();

//             if (docSnap.exists) {
//                 const data = docSnap.data();
//                 const priceEl = document.getElementById("price-" + serviceOption);
//                 const linkEl = priceEl.parentElement;

//                 priceEl.textContent = `Rs. ${data.selling_price}`;
//                 linkEl.setAttribute('onclick', `selectBoardService('${data.productid}')`);
//             } else {
//                 document.getElementById("price-" + serviceOption).textContent = "Not found";
//             }
//         } catch (err) {
//             console.error("Error fetching serviceOption:", serviceOption, err);
//             document.getElementById("price-" + serviceOption).textContent = "Error";
//         }
//     }
// }







// async function loadServicePrice() {
//     for (const serviceOption of serviceOptions) {
//         try {
//             const docRef = db.collection("products").doc("certificate").collection(category).doc(serviceOption.replace(/_/g, ' '));
//             const docSnap = await docRef.get();

//             if (docSnap.exists) {
//                 const data = docSnap.data();
//                 const priceEl = document.getElementById("price-" + serviceOption);
//                 const linkEl = priceEl.parentElement;

//                 priceEl.textContent = `Rs. ${data.selling_price}`;
//                 linkEl.setAttribute('onclick', `selectBoardService('${data.productid}')`);
//             } else {
//                 document.getElementById("price-" + serviceOption).textContent = "Not found";
//             }
//         } catch (err) {
//             console.error("Error fetching serviceOption:", serviceOption, err);
//             document.getElementById("price-" + serviceOption).textContent = "Error";
//         }
//     }
// }





async function loadServicePrice() {
    const docRef = db.collection('products').doc("certificate").collection('list').doc(category);
    docRef.get().then((doc) => {
        const data = doc.data();
        for (const serviceOption of serviceOptions) {
            try {
                if (doc.exists) {
                    const priceEl = document.getElementById("price-" + serviceOption);
                    const linkEl = priceEl.parentElement;

                    priceEl.textContent = `Rs. ${data[serviceOption.replace(/_/g, ' ')].selling_price}`;
                    linkEl.setAttribute('onclick', `selectBoardService('${data[serviceOption.replace(/_/g, ' ')].productid}')`);
                } else {
                    document.getElementById("price-" + serviceOption).textContent = "Not found";
                }
            } catch{
                document.getElementById("price-" + serviceOption).textContent = "Error";
            }
        }
    }).catch((error) => {
        console.error('Error fetching document:', error);
    });
}

// async function blabla() {
//     // const temp = db.collection('products').doc("certificates").collection('list').doc(category).get()
//     // const data = temp.data()
//     // Example: Fetching a document with a field name containing spaces
//     console.log(category)
//     const docRef = db.collection('products').doc("certificate").collection('list').doc(category);
//     docRef.get().then((doc) => {
//         if (doc.exists) {
//             const data = doc.data();
//             console.log(data['Marks Certificate']); // Accessing the field with spaces
//         } else {
//             console.log('No such document!');
//         }
//     }).catch((error) => {
//         console.error('Error fetching document:', error);
//     });

// }






















const productName = document.getElementById("product-name");
const productCategory = document.getElementById("product-category");
const productImage = document.getElementById("product-image");
const priceDisplay = document.getElementById("price-display");
const payButton = document.getElementById("pay-button");

const classSelect = document.getElementById("class-name");
const groupSelect = document.getElementById("group-select");

classSelect.addEventListener("change", () => {
    const val = classSelect.value;
    groupSelect.innerHTML = '<option value="default"></option>'
    if (val === "SSC-I (Class 9)" || val === "SSC-II (Class 10)") {
        ["Science", "General"].forEach(g => groupSelect.innerHTML += `<option value="${g}">${g}</option>`);
    } else if (val === "HSC-I (Class 11)" || val === "HSC-II (Class 12)") {
        ["Pre-Medical", "Pre-Engineering", "Pre-Computer Science", "Commerce", "Humanities-R", "Humanities-P", "Home Economics"]
            .forEach(g => groupSelect.innerHTML += `<option value="${g}">${g}</option>`);
    }
});

let currentProduct = null;

async function fetchProduct() {
    try {
        const pidDoc = await db.collection("productid").doc(productid).get();
        if (!pidDoc.exists) throw new Error("Invalid productid");

        currentProduct = pidDoc.data();
        fillProductUI(currentProduct);
    } catch (e) {
        console.error("Error fetching product:", e);
        priceDisplay.textContent = "Error loading product";
        disablePay();
    }
}

function fillProductUI(product) {
    productName.textContent = product.name;
    productCategory.textContent = `Category: ${product.category}`;
    productImage.src = product.image?.[0] || "assets/default.png";
    priceDisplay.textContent = `Rs. ${product.selling_price}`;
    validateForm();
}

function disablePay() {
    payButton.disabled = true;
}

function enablePay() {
    payButton.disabled = false;
}

function validateForm() {
    const form = document.getElementById("order-form");
    const fields = [...form.elements].filter(el => el.hasAttribute("required"));
    const filled = fields.every(el => el.value.trim() !== "");
    if (filled && currentProduct?.selling_price) {
        enablePay();
    } else {
        disablePay();
    }
}

document.getElementById("order-form").addEventListener("input", validateForm);

function generateOrderID() {
    return "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

payButton.addEventListener("click", async () => {
    const form = document.getElementById("order-form");
    const formData = Object.fromEntries(new FormData(form).entries());
    const orderId = generateOrderID();

    const orderData = {
        productid: productid,
        orderid: orderId,
        order_placed: new Date(),
        form: formData
    };

    const overlay = document.getElementById("overlay");
    const overlayText = document.getElementById("overlay-text");
    const overlayActions = document.getElementById("overlay-actions");

    overlay.classList.remove("hidden");
    overlayText.textContent = "Processing...";
    overlayActions.classList.add("hidden");

    let redirected = false;

    const timeout = setTimeout(() => {
        if (!redirected) {
            overlayText.textContent = "Error placing order.";
            overlayActions.classList.remove("hidden");
        }
    }, 60000);

    try {
        await db.collection("orders").doc("new orders").collection("list").doc(orderId).set(orderData);
        sessionStorage.setItem("pendingOrder", JSON.stringify({ ...orderData, name: currentProduct.name, category: currentProduct.category, price: currentProduct.selling_price }));
        redirected = true;
        clearTimeout(timeout);
        window.location.href = "payment.html";
    } catch (e) {
        console.error(e);
        overlayText.textContent = "Error placing order.";
        overlayActions.classList.remove("hidden");
    }
});






















document.getElementById('record_year').addEventListener('input', function () {
    const selectedYear = this.value;
    const currentYear = new Date().getFullYear();
    if (selectedYear === '') {
        this.style.border = ""; // Remove the highlight
    } else if (!(selectedYear <= currentYear && selectedYear > 2000)) {
        // Handle case where selected year is in the past
        this.setCustomValidity("Please select a valid year between 2000 and the current year.");
        this.style.border = "2px solid red"; // Highlight the input
    } else {
        // this.setCustomValidity(""); // Clear any custom validity message
        this.style.border = ""; // Remove the highlight
    }
})



const selects = document.querySelectorAll('.formSelect');
const targetLabels = document.querySelectorAll('.selectLabel');
selects.forEach((select, index) => {
    select.addEventListener('change', (event) => {
        if (event.target.value === 'default') {
            targetLabels[index].removeAttribute('style')
        } else {
            targetLabels[index].setAttribute('style', 'top: -1em; font-size: 0.75em; padding: 0 0.125em;')
        }
    })
});
