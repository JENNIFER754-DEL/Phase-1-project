document.addEventListener("DOMContentLoaded", async () => {
    const menuItemsContainer = document.getElementById("menu-items");
    const promotionalContainer = document.querySelector(".promotional-flavors .row");
    const adminControls = document.getElementById("admin-controls");
    const toggleAdminBtn = document.getElementById("toggle-admin");
    const addMenuItemBtn = document.getElementById("add-menu-item");
    const checkoutBtn = document.getElementById("checkout-btn");
    const customAddToCartBtn = document.getElementById("add-to-cart-custom");

    let cart = [];
    let adminMode = false;
    const ratingsData = {};

    const checkAdminStatus = async () => {
        const response = await fetch('/check-admin', {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        const data = await response.json();
        if (data.isAdmin) {
            toggleAdminBtn.style.display = "block";
            adminControls.style.display = "block";
        } else {
            toggleAdminBtn.style.display = "none";
            adminControls.style.display = "none";
        }
    };

    const updateAverageRating = (itemId) => {
        const ratings = ratingsData[itemId] || [];
        const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;
        const roundedAverage = Math.round(average * 2) / 2;
        const stars = "★".repeat(Math.floor(roundedAverage)) + (roundedAverage % 1 ? "☆" : "") + "☆".repeat(4 - Math.floor(roundedAverage));
        const averageRatingElement = document.querySelector(`.average-rating[data-item-id="${itemId}"]`);
        if (averageRatingElement) averageRatingElement.textContent = stars;
    };

    const attachRatingListeners = () => {
        const ratingDropdowns = document.querySelectorAll(".rate-item");
        ratingDropdowns.forEach((dropdown) => {
            dropdown.addEventListener("change", (e) => {
                const itemId = e.target.getAttribute("data-item-id");
                const rating = parseInt(e.target.value);
                if (!ratingsData[itemId]) ratingsData[itemId] = [];
                ratingsData[itemId].push(rating);
                updateAverageRating(itemId);
            });
        });
    };

    const attachRemoveListeners = () => {
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const itemCard = button.closest(".menu-item");
                if (itemCard) {
                    itemCard.remove();
                    alert("Item has been removed!");
                }
            });
        });
    };

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += item.totalPrice;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        alert(`${item.name} has been added to your cart!`);
    };

    const attachAddToCartListeners = () => {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const button = e.target;
                const item = {
                    name: button.getAttribute("data-name"),
                    price: parseInt(button.getAttribute("data-price"), 10),
                    totalPrice: parseInt(button.getAttribute("data-price"), 10),
                };
                addToCart(item);
            });
        });
    };

    const updateCustomizationTotal = () => {
        const sizePrice = parseInt(document.getElementById("custom-size").value, 10);
        const milkPrice = parseInt(document.getElementById("custom-milk").value, 10);
        const extraShot = document.getElementById("extra-shot").checked ? parseInt(document.getElementById("extra-shot").value, 10) : 0;
        const extraSyrup = document.getElementById("extra-syrup").checked ? parseInt(document.getElementById("extra-syrup").value, 10) : 0;
        const totalPrice = sizePrice + milkPrice + extraShot + extraSyrup;
        document.getElementById("total-price").textContent = `Ksh ${totalPrice}`;
    };

    toggleAdminBtn.addEventListener("click", () => {
        adminMode = !adminMode;
        const adminOnlyElements = document.querySelectorAll(".admin-only");
        adminOnlyElements.forEach((element) => {
            element.style.display = adminMode ? "block" : "none";
        });
    });

    addMenuItemBtn.addEventListener("click", () => {
        const section = prompt("Add to: 1) Menu Items  2) Promotional Flavors (Enter 1 or 2)");
        const newItemName = prompt("Enter the name of the new item:");
        const newItemPrice = prompt("Enter the price of the new item:");
        const newItemImage = prompt("Enter the image URL for the new item:");

        if (!section || !newItemName || !newItemPrice || !newItemImage) {
            alert("Failed to add new item. Please provide valid inputs.");
            return;
        }

        const newItemId = Date.now();
        const newItemHTML = `
            <div class="col-md-4 menu-item">
                <div class="card">
                    <img src="${newItemImage}" alt="${newItemName}" class="card-img-top">
                    <div class="card-body text-center">
                        <h5 class="card-title">${newItemName}</h5>
                        <p class="price">KSh ${newItemPrice}</p>
                        <div class="rating">
                            <div class="average-rating" data-item-id="${newItemId}">☆☆☆☆☆</div>
                            <select class="rate-item" data-item-id="${newItemId}">
                                <option value="">Rate</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                        <button class="btn btn-primary add-to-cart" data-name="${newItemName}" data-price="${newItemPrice}">Add to Cart</button>
                        <button class="btn btn-danger remove-item admin-only" style="display: ${adminMode ? "block" : "none"};">Remove</button>
                    </div>
                </div>
            </div>
        `;

        if (section === "1") {
            menuItemsContainer.insertAdjacentHTML("beforeend", newItemHTML);
        } else if (section === "2") {
            promotionalContainer.insertAdjacentHTML("beforeend", newItemHTML);
        } else {
            alert("Invalid section choice. Choose 1 for Menu or 2 for Promotional Flavors.");
            return;
        }

        attachAddToCartListeners();
        attachRemoveListeners();
        attachRatingListeners();
        alert(`New item "${newItemName}" added successfully!`);
    });

    customAddToCartBtn.addEventListener("click", () => {
        const sizePrice = parseInt(document.getElementById("custom-size").value, 10);
        const milkPrice = parseInt(document.getElementById("custom-milk").value, 10);
        const extraShot = document.getElementById("extra-shot").checked ? parseInt(document.getElementById("extra-shot").value, 10) : 0;
        const extraSyrup = document.getElementById("extra-syrup").checked ? parseInt(document.getElementById("extra-syrup").value, 10) : 0;

        const totalCustomPrice = sizePrice + milkPrice + extraShot + extraSyrup;
        const customItem = {
            name: "Customized Coffee",
            price: totalCustomPrice,
            totalPrice: totalCustomPrice,
        };

        addToCart(customItem);
        updateCustomizationTotal();
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart before proceeding.");
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "cart.html";
        }
    });

    attachAddToCartListeners();
    attachRemoveListeners();
    attachRatingListeners();
    checkAdminStatus();
});
