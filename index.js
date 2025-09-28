
// Simple cart array (global)
const cart = [];

// DOM refs
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const cartCountSpan = document.getElementById("cart-count");

// Helper to parse price strings like "$3.89" -> 3.89
function parsePrice(priceString) {
  if (typeof priceString === "number") return priceString;
  // Remove any non-numeric except dot and minus
  const numeric = priceString.replace(/[^0-9.-]+/g, "");
  return parseFloat(numeric) || 0;
}

// Render function: builds the UI from cart[]
function renderCart() {
  // Build list HTML
  cartItemsContainer.innerHTML = cart
    .map((item, index) => {
      // create markup: name on top, price below, remove button
      return `
      <li data-index="${index}">
        <div>
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">${item.price}</span>
        </div>
        <div>
          <button class="remove-item" data-index="${index}" title="Remove item">Remove</button>
        </div>
      </li>
      `;
    })
    .join("");

  // Calculate total
  const total = cart.reduce((acc, item) => acc + parsePrice(item.price), 0);

  // Update total & count
  cartTotalSpan.textContent = `$${total.toFixed(2)}`;
  cartCountSpan.textContent = `(${cart.length})`;

  // Disable Clear button if no items
  clearCartBtn.disabled = cart.length === 0;
}

// Add item to cart - reuse from your add-to-cart handler
function addItemToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

// Clear cart handler
function clearCart() {
  if (!cart.length) return;
  // Optional: confirm with user
  if (!confirm("Remove all items from the cart?")) return;
  cart.length = 0; // empty array in-place
  renderCart();
}

// Remove single item handler (by index)
function removeItem(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    renderCart();
  }
}

/* ------------ Wire up event listeners -------------- */

// If you already add items via buttons, adapt to call addItemToCart(...) instead of pushing directly.
// Example: selector for add-to-cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    if (!product) return;
    const name = product.querySelector(".name").textContent.trim();
    const price = product.querySelector(".price").textContent.trim();
    addItemToCart(name, price);
  });
});

// Clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Event delegation for Remove buttons inside the list
cartItemsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".remove-item");
  if (!btn) return;
  const idx = Number(btn.getAttribute("data-index"));
  removeItem(idx);
});

// initial render (cart empty)
renderCart();


const cartElement = document.getElementById("cart");
const closeCartBtn = document.getElementById("close-cart");
const openCartBtn = document.getElementById("open-cart");

// Initially hide the cart if you want
cartElement.classList.add("hidden");

// Open the cart
openCartBtn.addEventListener("click", () => {
  cartElement.classList.remove("hidden");
});

// Close (hide) the cart
closeCartBtn.addEventListener("click", () => {
  cartElement.classList.add("hidden");
});
