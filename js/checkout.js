// Handle Checkout Form Submission
document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    // Get cart items from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // If no items in cart, show an alert
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items to your cart.");
        return;
    }

    // Create a confirmation message
    let confirmationMessage = `
        <h3>Order Summary:</h3>
        <p>Name: ${name}</p>
        <p>Address: ${address}</p>
        <p>Payment Method: ${payment}</p>
        <h4>Items:</h4>
        <ul>
    `;

    cart.forEach(item => {
        confirmationMessage += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });

    confirmationMessage += "</ul>";

    // Show order confirmation
    confirmationMessage += `<p>Total: $${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>`;

    alert("Order placed successfully! A confirmation has been sent to your email.");

    // Clear the cart after placing the order
    localStorage.removeItem("cart");

    // Optionally, redirect to a thank you page or back to home
    window.location.href = "thankyou.html"; // For now, it redirects to a placeholder "thankyou" page
});
