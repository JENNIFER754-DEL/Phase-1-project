// Sample data for coffee items
const coffeeData = [
    {
        name: 'Espresso',
        description: 'A strong, black coffee made by forcing steam through finely ground coffee beans.',
        price: 'KES 200',
        image: 'images/coffee1.jpg',
    },
    {
        name: 'Cappuccino',
        description: 'A coffee-based drink made with espresso, steamed milk, and milk foam.',
        price: 'KES 250',
        image: 'images/coffee2.jpg',
    },
    {
        name: 'Latte',
        description: 'A creamy coffee drink made with espresso and steamed milk, topped with foam.',
        price: 'KES 280',
        image: 'images/coffee3.jpg',
    },
    {
        name: 'Americano',
        description: 'Espresso diluted with hot water, resulting in a stronger, black coffee.',
        price: 'KES 230',
        image: 'images/coffee4.jpg',
    },
    {
        name: 'Mocha',
        description: 'A coffee with espresso, steamed milk, and chocolate flavor.',
        price: 'KES 300',
        image: 'images/coffee5.jpg',
    },
    {
        name: 'Macchiato',
        description: 'A shot of espresso topped with a small amount of milk foam.',
        price: 'KES 220',
        image: 'images/coffee6.jpg',
    },
];

// Function to dynamically inject coffee items into the gallery
const coffeeGallery = document.getElementById('coffee-gallery');

coffeeData.forEach(coffee => {
    const coffeeItem = document.createElement('div');
    coffeeItem.classList.add('col-md-4', 'mb-4');
    
    coffeeItem.innerHTML = `
        <div class="gallery-item">
            <img src="${coffee.image}" class="d-block w-100" alt="${coffee.name}">
            <h3>${coffee.name}</h3>
            <p>${coffee.description}</p>
            <p class="price">${coffee.price}</p>
        </div>
    `;
    
    coffeeGallery.appendChild(coffeeItem);
});
