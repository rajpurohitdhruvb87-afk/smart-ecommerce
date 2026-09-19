/* =========================
   PRODUCT DATA
========================= */

const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 24999,
        category: "Electronics",
        icon: "📱",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Laptop",
        price: 54999,
        category: "Electronics",
        icon: "💻",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 96
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 2999,
        category: "Electronics",
        icon: "🎧",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        rating: 4.4,
        reviews: 215
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 3999,
        category: "Electronics",
        icon: "⌚",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        rating: 4.3,
        reviews: 87
    },
    {
        id: 5,
        name: "Premium T-Shirt",
        price: 999,
        category: "Fashion",
        icon: "👕",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        rating: 4.2,
        reviews: 154
    },
    {
        id: 6,
        name: "Running Sneakers",
        price: 2499,
        category: "Fashion",
        icon: "👟",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 201
    },
    {
        id: 7,
        name: "Travel Backpack",
        price: 1799,
        category: "Accessories",
        icon: "🎒",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 76
    },
    {
        id: 8,
        name: "Classic Sunglasses",
        price: 1299,
        category: "Accessories",
        icon: "🕶️",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        rating: 4.1,
        reviews: 63
    }
];


/* =========================
   GET HTML ELEMENTS
========================= */

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


/* =========================
   LOAD CART
========================= */

let cart =
    JSON.parse(
        localStorage.getItem("smartShopCart")
    ) || [];


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <p style="
                text-align:center;
                grid-column:1/-1;
                font-size:18px;
                padding:40px;
            ">
                No products found.
            </p>
        `;

        return;
    }


    productList.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-rating">
                    ⭐ ${product.rating}
                    (${product.reviews} reviews)
                </p>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Add to Cart
                </button>

            </div>
        `;


        productContainer.appendChild(card);

    });
}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            icon: product.icon,

            quantity: 1
        });
    }


    saveCart();

    updateCart();


    const addButton =
        document.querySelector(
            `.add-btn[onclick="addToCart(${productId})"]`
        );

    if (addButton) {
        const originalText = addButton.textContent;

        addButton.textContent = "Added to Cart";
        addButton.disabled = true;

        setTimeout(function() {
            addButton.textContent = originalText;
            addButton.disabled = false;
        }, 900);
    }
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "smartShopCart",
        JSON.stringify(cart)
    );
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;

        count +=
            item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-icon">
                ${item.icon || "🛍️"}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

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

                <span>
                    ${item.quantity}
                </span>

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


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                padding:25px;
            ">
                Your cart is empty.
            </p>
        `;
    }


    cartTotal.textContent =
        total.toLocaleString("en-IN");

    cartCount.textContent =
        count;
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (item) {

        item.quantity++;

    }


    saveCart();

    updateCart();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(function(item) {

                return item.id !== productId;

            });
    }


    saveCart();

    updateCart();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    saveCart();

    updateCart();
}


/* =========================
   SEARCH + CATEGORY FILTER
========================= */

function filterProducts() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


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


            return (
                matchesSearch &&
                matchesCategory
            );
        });


    displayProducts(
        filteredProducts
    );
}


/* =========================
   SEARCH EVENT
========================= */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* =========================
   CATEGORY EVENT
========================= */

categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* =========================
   OPEN CART
========================= */

cartBtn.addEventListener(
    "click",
    function() {

        updateCart();

        cartModal.classList.add(
            "show"
        );
    }
);


/* =========================
   CLOSE CART
========================= */

closeCart.addEventListener(
    "click",
    function() {

        cartModal.classList.remove(
            "show"
        );
    }
);


/* =========================
   CART OUTSIDE CLICK
========================= */

cartModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            cartModal
        ) {

            cartModal.classList.remove(
                "show"
            );
        }
    }
);


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        cartModal.classList.remove(
            "show"
        );


        checkoutSection.classList.add(
            "show"
        );


        checkoutSection.scrollIntoView({
            behavior: "smooth"
        });
    }
);


/* =========================
   PLACE ORDER
========================= */

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        successModal.classList.add(
            "show"
        );


        cart = [];


        saveCart();

        updateCart();


        checkoutForm.reset();


        checkoutSection.classList.remove(
            "show"
        );
    }
);


/* =========================
   CONTINUE SHOPPING
========================= */

continueBtn.addEventListener(
    "click",
    function() {

        successModal.classList.remove(
            "show"
        );


        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


/* =========================
   SUCCESS MODAL OUTSIDE CLICK
========================= */

successModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            successModal
        ) {

            successModal.classList.remove(
                "show"
            );
        }
    }
);


/* =========================
   DARK / LIGHT MODE
========================= */

const savedTheme =
    localStorage.getItem(
        "smartShopTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent = "☀️";

} else {

    themeBtn.textContent = "🌙";
}


themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


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


/* =========================
   START WEBSITE
========================= */

displayProducts(products);

updateCart();