let type = "flash";
let grid = document.getElementById("product-grid");

const searchInput = document.getElementById("search-input");

let allProducts = [];
let fuse;
let homeLoaded = false;

function restoreSearch() {
    setTimeout(() => {
        if (searchInput.value.trim() === "") {
            renderProducts(allProducts);
            document.querySelector('.homeContainer').classList.remove('hidden')
        }
    }, 150);
}

function searchProducts() {
    const q = searchInput.value.trim();
    if (!q) restoreSearch();
    if (q) document.querySelector('.homeContainer').classList.add('hidden');
    const results = fuse.search(q).map(r => r.item);
    renderProducts(results);
}

function renderProducts(products) {
    grid.innerHTML = "";
    if (!products.length) {
        grid.innerHTML = `<p class="notFoundMessage">No products found.</p>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement("a");
        card.href = `preview.html?productid=${product.productid}`;
        card.className = "cards";
        card.innerHTML = `
        <img src="${product.image?.[0] || ''}" onerror="this.src='assets 2/default.png'" style="object-fit: cover; margin-bottom: 0rem; border-radius: 0.75rem 0.75rem 0 0; width: 100%; aspect-ratio: 1 / 1;">
        <div style="padding: 0 0.25rem 0.5rem 0.5rem; line-height: 1.25;">
            <h3 style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; font-size: 0.75rem; font-weight: 600; color: #111827;">${product.name}</h3>
            <div style="display: flex; align-items: center; gap: 0.25rem;">
                <span style="font-size: 0.875rem; font-weight: 700; color: #059669ff;">
                    Rs. ${product.selling_price}
                </span>
                ${product.strikethrough_price ? `<span style="background-color: #e9c600ff; border-radius: 4px; font-size: x-small; font-weight: bolder; color: white;"><span style="padding: 2px;">${Math.trunc((product.selling_price - product.strikethrough_price) / product.strikethrough_price * 100)}%</span></span>` : ``}
            </div>
            ${product.strikethrough_price ? `<p style="font-size: 0.75rem; color: #ff0000bd; text-decoration: line-through;">Rs. ${product.strikethrough_price}</p>` : ``}
        </div>
        `;
        grid.appendChild(card);
    });
}

async function loadProducts() {
    try {
        const snap = await db.collection("productid")
            .where("category", "==", type)
            .get();

        // include id (handy later) and spread fields
        allProducts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Coerce rank: number -> itself; string -> Number(str); null/undefined/NaN -> +Infinity
        const toRank = (v) => {
            if (v === null || v === undefined) return Number.POSITIVE_INFINITY;
            const n = typeof v === "number" ? v : Number(v);
            return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
        };

        // Ascending: lowest rank first. Use (toRank(b.rank) - toRank(a.rank)) for descending.
        allProducts.sort((a, b) => toRank(a.rank) - toRank(b.rank));

        fuse = new Fuse(allProducts, {
            keys: ["name", "category"],
            threshold: 0.4,
            ignoreLocation: true
        });

        renderProducts(allProducts);
        homeLoaded = true
    } catch (e) {
        grid.innerHTML = `<p class="errorMessage">Failed to load products.</p>`;
        console.error(e);
    }
}

// for loading home
loadProducts();


async function openCategory(categoryName) {
    if (homeLoaded) { //after home content loaded
        changeView('.homeScreen', `.home-main-${categoryName}`)
        grid = document.querySelector(`.${categoryName}-content`)
        type = categoryName
        loadProducts()
    }
}