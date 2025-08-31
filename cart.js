function addOrderCard({ title, price, date, deliveryRange, status, image }) {
    const container = document.getElementById("orders-container");
    const card = document.createElement("article");
    card.className = "order-card";
    card.innerHTML = `
        <img class="order-card__image" src="${image}" alt="Product thumbnail"/>
        <div class="order-card__body">
          <header class="order-card__header">
            <h3 class="order-card__title">${title}</h3>
            <span class="order-card__status" data-status="${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </header>
          <dl class="order-card__meta">
            <div><dt>Price</dt><dd>$${price}</dd></div>
            <div><dt>Ordered</dt><dd>${date}</dd></div>
            <div><dt>Est. Delivery</dt><dd>${deliveryRange}</dd></div>
          </dl>
        </div>
      `;
    container.appendChild(card);
}

// Example usage
addOrderCard({
    title: "Noise-Canceling Headphones",
    price: "129.00",
    date: "Aug 12, 2025",
    deliveryRange: "Aug 20-24, 2025",
    status: "pending",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=640"
});

addOrderCard({
    title: "Mechanical Keyboard",
    price: "89.00",
    date: "Jul 28, 2025",
    deliveryRange: "Aug 1-4, 2025",
    status: "received",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=640"
});