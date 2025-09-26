// let cart = [];

// const buttons = document.querySelectorAll(".add-to-cart");
// const cartList = document.getElementById("cart-cart");

// buttons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//   const product = e.target.closest(".big-box").nextElementS;
//   console.log("Clicked product:", product); // <- see if this is null

// //   if (!product) return; // prevent crash

//   const name = product.querySelector(".name").textContent;
//   const price = Number(product.querySelector(".price").textContent);

//   cart.push({ name, price });
//   renderCart();
//     })
// })

// function renderCart() {
//   cartList.innerHTML = "";
//   cart.forEach((item) => {
//     const li = document.createElement("li");
//     li.textContent = `${item.name} - $${item.price}`;
//     cartList.appendChild(li);
//   });
// }

// A simple array to hold cart items
const cart = [];

// Get the <ul> where cart items will be displayed
const cartItemsContainer = document.getElementById("cart-items");

// Function to render the cart list
function renderCart() {
  // Clear out the old list
  cartItemsContainer.innerHTML = "";

  // Add each cart item as a new <li>
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name}</span </br> ${item.price}`;
    cartItemsContainer.appendChild(li);
  });
}

// Select all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Find the product wrapper for the clicked button
    const product = e.target.closest(".product");

    // Get the product name and price
    const name = product.querySelector(".name").textContent;
    const price = product.querySelector(".price").textContent;

    // Add the product to the cart array
    cart.push({ name, price });

    // Re-render the cart display
    renderCart();

    console.log("Cart now:", cart);
  });
});
