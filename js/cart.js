// Cart items storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
        // Increase quantity of the existing item
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item to the cart
        cart.push({ ...item, quantity: 1 });
    }

    // Save cart to localStorage and re-render
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to render the cart (as shown in previous messages)
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const completeOrderButton = document.getElementById('complete-order');

    cartItemsContainer.innerHTML = ''; // Clear the container first

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = 'Total: KSh 0';
        completeOrderButton.disabled = true;
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        // Item details
        const itemDetails = document.createElement('p');
        itemDetails.textContent = `${item.name} - KSh ${item.price} x ${item.quantity}`;
        
        // Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('cart-item-remove');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeItem(index);

        // Add one more button
        const addButton = document.createElement('button');
        addButton.classList.add('cart-item-add');
        addButton.textContent = 'Add One More';
        addButton.onclick = () => addItem(index);

        cartItemDiv.appendChild(itemDetails);
        cartItemDiv.appendChild(removeButton);
        cartItemDiv.appendChild(addButton);
        cartItemsContainer.appendChild(cartItemDiv);

        totalPrice += item.price * item.quantity;
    });

    // Update the total price and enable the complete order button
    cartTotalElement.textContent = `Total: KSh ${totalPrice}`;
    completeOrderButton.disabled = false;
}

// Add one more of an item in the cart
function addItem(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Remove item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Complete order (you can add more logic here to handle checkout)
function completeOrder() {
    if (cart.length === 0) return;

    alert("Order Complete! Thank you for shopping with us.");
    // Reset cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Initial render
renderCart();

