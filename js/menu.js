// Array to hold cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart in localStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Event listener for "Add to Cart" buttons
const orderButtons = document.querySelectorAll('.order-now');

orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        const coffeeName = this.getAttribute('data-coffee');
        const price = parseFloat(this.getAttribute('data-price'));

        // Check if the item is already in the cart
        const existingItemIndex = cart.findIndex(item => item.name === coffeeName);

        if (existingItemIndex >= 0) {
            // Item already exists, increment quantity
            cart[existingItemIndex].quantity++;
        } else {
            // Item doesn't exist, add new item to cart
            cart.push({ name: coffeeName, price: price, quantity: 1 });
        }

        updateCart(); // Update the cart in localStorage
        alert(coffeeName + " has been added to your cart!");
    });
});
