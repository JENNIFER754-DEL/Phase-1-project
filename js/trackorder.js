document.getElementById("track-order-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const orderIdInput = document.getElementById("order-id").value;
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

    if (orderDetails && orderDetails.orderId.toString() === orderIdInput) {
        const orderStatus = `
            <h4>Order Details</h4>
            <p>Name: ${orderDetails.name}</p>
            <p>Address: ${orderDetails.address}</p>
            <p>Payment Method: ${orderDetails.payment}</p>
            <h5>Items:</h5>
            <ul>
        `;

        orderDetails.items.forEach(item => {
            orderStatus += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
        });

        orderStatus += `
            </ul>
            <p>Total: $${orderDetails.total}</p>
            <p>Status: ${orderDetails.status}</p>  <!-- Status is 'Paid' -->
        `;

        document.getElementById("order-status").innerHTML = orderStatus;
    } else {
        alert("Invalid Order ID.");
    }
});
