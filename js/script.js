// Simple form validation for login
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Both fields are required!');
        return false;
    }
    return true;
}

// Toggle the visibility of testimonials (carousel-like functionality)
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
        } else {
            testimonial.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
}

// Automatically move to the next testimonial every 5 seconds
setInterval(nextTestimonial, 5000);

// Show the first testimonial initially
showTestimonial(currentTestimonialIndex);
