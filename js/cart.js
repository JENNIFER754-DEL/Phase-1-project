
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
      
        cart[existingItemIndex].quantity += 1;
    } else {
       
        cart.push({ ...item, quantity: 1 });
    }

 
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const completeOrderButton = document.getElementById('complete-order');

    cartItemsContainer.innerHTML = ''; 

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

     
        const itemDetails = document.createElement('p');
        itemDetails.textContent = `${item.name} - KSh ${item.price} x ${item.quantity}`;
        
        
        const removeButton = document.createElement('button');
        removeButton.classList.add('cart-item-remove');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeItem(index);

  
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

    cartTotalElement.textContent = `Total: KSh ${totalPrice}`;
    completeOrderButton.disabled = false;
}


function addItem(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function completeOrder() {
    if (cart.length === 0) return;

    alert("Order Complete! Thank you for shopping with us.");

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


renderCart();

