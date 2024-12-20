
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


const orderButtons = document.querySelectorAll('.order-now');

orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        const coffeeName = this.getAttribute('data-coffee');
        const price = parseFloat(this.getAttribute('data-price'));

        
        const existingItemIndex = cart.findIndex(item => item.name === coffeeName);

        if (existingItemIndex >= 0) {
           
            cart[existingItemIndex].quantity++;
        } else {
            
            cart.push({ name: coffeeName, price: price, quantity: 1 });
        }

        updateCart(); 
        alert(coffeeName + " has been added to your cart!");
    });
});


function displayCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }


    let cartContent = `<h3>Your Cart</h3><ul>`;
    let totalPrice = 0;

    cart.forEach(item => {
        cartContent += `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`;
        totalPrice += item.price * item.quantity;
    });

    cartContent += `</ul><p><strong>Total: $${totalPrice.toFixed(2)}</strong></p>`;

   
    const modal = document.createElement('div');
    modal.classList.add('cart-modal');
    modal.innerHTML = `
        <div class="cart-modal-content">
            ${cartContent}
            <button id="closeModal" class="btn-primary">Close</button>
            <button id="checkoutNow" class="btn-primary">Proceed to Checkout</button>
        </div>
    `;
    document.body.appendChild(modal);

    
    document.getElementById('closeModal').addEventListener('click', function() {
        modal.remove();
    });

   
    document.getElementById('checkoutNow').addEventListener('click', function() {
        alert("Proceeding to checkout!");
       
        window.location.href = '/checkout'; 
    });
}


const checkoutButton = document.getElementById('checkoutButton');
if (checkoutButton) {
    checkoutButton.addEventListener('click', function() {
        console.log('Checkout button clicked');  
        displayCart(); 
    });
} else {
    console.error("Checkout button not found!");
}
