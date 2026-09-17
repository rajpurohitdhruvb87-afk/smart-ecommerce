const products = [
{
id: 1,
name: "Smartphone",
price: 15999,
category: "electronics",
icon: "📱"
},
{
id: 2,
name: "Laptop",
price: 54999,
category: "electronics",
icon: "💻"
},
{
id: 3,
name: "Headphones",
price: 2499,
category: "electronics",
icon: "🎧"
},
{
id: 4,
name: "Smart Watch",
price: 3999,
category: "electronics",
icon: "⌚"
},
{
id: 5,
name: "T-Shirt",
price: 799,
category: "fashion",
icon: "👕"
},
{
id: 6,
name: "Sneakers",
price: 2499,
category: "fashion",
icon: "👟"
},
{
id: 7,
name: "Backpack",
price: 1499,
category: "fashion",
icon: "🎒"
},
{
id: 8,
name: "Sunglasses",
price: 999,
category: "accessories",
icon: "🕶️"
}
];

// Get HTML elements

const productContainer =
document.getElementById("productContainer");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const cartBtn =
document.getElementById("cartBtn");

const cartCount =
document.getElementById("cartCount");

const cartModal =
document.getElementById("cartModal");

const closeCart =
document.getElementById("closeCart");

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

const checkoutBtn =
document.getElementById("checkoutBtn");

const checkoutSection =
document.getElementById("checkoutSection");

const checkoutForm =
document.getElementById("checkoutForm");

const successModal =
document.getElementById("successModal");

const continueBtn =
document.getElementById("continueBtn");

const themeBtn =
document.getElementById("themeBtn");

// Load cart from Local Storage

let cart = JSON.parse(
localStorage.getItem("smartShopCart")
) || [];

// Display Products

function displayProducts(productList) {

   
productContainer.innerHTML = "";

if (productList.length === 0) {

    productContainer.innerHTML = `
        <p style="
            text-align:center;
            grid-column:1/-1;
            font-size:18px;
        ">
            No products found.
        </p>
    `;

    return;
}

productList.forEach(function(product) {

    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image">
            ${product.icon}
        </div>

        <div class="product-info">

            <h3>${product.name}</h3>

            <p class="product-category">
                ${product.category}
            </p>

            <p class="product-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <button
                class="add-btn"
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        </div>
    `;

    productContainer.appendChild(card);
});
   

}

// Add Product to Cart

function addToCart(productId) {

   
const product =
    products.find(function(item) {
        return item.id === productId;
    });

if (!product) {
    return;
}

const existingItem =
    cart.find(function(item) {
        return item.id === productId;
    });

if (existingItem) {

    existingItem.quantity += 1;

} else {

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    });
}

saveCart();

updateCart();

alert(product.name + " added to cart!");
   

}

// Save Cart

function saveCart() {

   
localStorage.setItem(
    "smartShopCart",
    JSON.stringify(cart)
);
   

}

// Update Cart

function updateCart() {

   
let totalItems = 0;
let totalPrice = 0;

cart.forEach(function(item) {

    totalItems += item.quantity;

    totalPrice +=
        item.price * item.quantity;
});

cartCount.textContent = totalItems;

cartTotal.textContent =
    totalPrice.toLocaleString("en-IN");

displayCartItems();
   

}

// Display Cart Items

function displayCartItems() {

   
cartItems.innerHTML = "";

if (cart.length === 0) {

    cartItems.innerHTML = `
        <p style="
            text-align:center;
            padding:30px 0;
            color:#777;
        ">
            Your cart is empty.
        </p>
    `;

    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";

    return;
}

checkoutBtn.disabled = false;
checkoutBtn.style.opacity = "1";

cart.forEach(function(item) {

    const cartItem =
        document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

        <div class="cart-item-info">

            <h4>${item.name}</h4>

            <p class="cart-item-price">
                ₹${item.price.toLocaleString("en-IN")}
            </p>

        </div>

        <div class="quantity-controls">

            <button
                onclick="decreaseQuantity(${item.id})"
            >
                -
            </button>

            <span>${item.quantity}</span>

            <button
                onclick="increaseQuantity(${item.id})"
            >
                +
            </button>

        </div>

        <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})"
        >
            Remove
        </button>
    `;

    cartItems.appendChild(cartItem);
});
   

}

// Increase Quantity

function increaseQuantity(productId) {

   
const item =
    cart.find(function(item) {
        return item.id === productId;
    });

if (item) {
    item.quantity += 1;
}

saveCart();
updateCart();
   

}

// Decrease Quantity

function decreaseQuantity(productId) {

   
const item =
    cart.find(function(item) {
        return item.id === productId;
    });

if (!item) {
    return;
}

item.quantity -= 1;

if (item.quantity <= 0) {

    cart = cart.filter(function(cartItem) {
        return cartItem.id !== productId;
    });
}

saveCart();
updateCart();
   

}

// Remove from Cart

function removeFromCart(productId) {

   
cart = cart.filter(function(item) {
    return item.id !== productId;
});

saveCart();
updateCart();
   

}

// Search Products

function filterProducts() {

   
const searchText =
    searchInput.value.toLowerCase().trim();

const selectedCategory =
    categoryFilter.value;

const filteredProducts =
    products.filter(function(product) {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch &&
               matchesCategory;
    });

displayProducts(filteredProducts);
   

}

// Search Event

searchInput.addEventListener(
"input",
filterProducts
);

// Category Event

categoryFilter.addEventListener(
"change",
filterProducts
);

// Open Cart

cartBtn.addEventListener(
"click",
function() {

   
    updateCart();

    cartModal.classList.add("show");
}
   

);

// Close Cart

closeCart.addEventListener(
"click",
function() {

   
    cartModal.classList.remove("show");
}
   

);

// Close Modal when clicking outside

cartModal.addEventListener(
"click",
function(event) {

   
    if (event.target === cartModal) {

        cartModal.classList.remove("show");
    }
}
   

);

// Checkout Button

checkoutBtn.addEventListener(
"click",
function() {

   
    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    cartModal.classList.remove("show");

    checkoutSection.classList.add("show");

    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });
}
   

);

// Checkout Form

checkoutForm.addEventListener(
"submit",
function(event) {

   
    event.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    successModal.classList.add("show");

    cart = [];

    saveCart();

    updateCart();

    checkoutForm.reset();

    checkoutSection.classList.remove("show");
}
   

);

// Continue Shopping

continueBtn.addEventListener(
"click",
function() {

   
    successModal.classList.remove("show");

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}
   

);

// Close Success Modal by clicking outside

successModal.addEventListener(
"click",
function(event) {

   
    if (event.target === successModal) {

        successModal.classList.remove("show");
    }
}
   

);

// Dark / Light Mode

const savedTheme =
localStorage.getItem("smartShopTheme");

if (savedTheme === "dark") {

   
document.body.classList.add("dark");

themeBtn.textContent = "☀️";
   

} else {

   
themeBtn.textContent = "🌙";
   

}

themeBtn.addEventListener(
"click",
function() {

   
    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    if (isDark) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "smartShopTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "smartShopTheme",
            "light"
        );
    }
}
   

);

// Initial Load

displayProducts(products);

updateCart();
