document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items to your cart.");
        return;
    }

   
    const orderId = new Date().getTime();
    const totalAmount = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

   
    let orderDetails = {
        orderId: orderId,
        name: name,
        address: address,
        payment: payment,
        items: cart,
        total: totalAmount,
        status: 'Paid'  
    };

   
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    
    alert("Payment Successful! Your order has been marked as Paid.");
    
   
    window.location.href = "track-order.html";
});
