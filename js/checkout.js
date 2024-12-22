function submitOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const orderDetails = {
        orderId: new Date().getTime(),
        userId: 2,
        items: cart,
        total: totalAmount,
        status: "Paid",
        paymentMethod: "Credit Card",
        shippingAddress: "123 Main St, City, Country"
    };

    fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderDetails)
    })
        .then(response => response.json())
        .then(() => {
            alert("Order placed successfully!");
        })
        .catch(error => console.error("Error submitting order:", error));
}
