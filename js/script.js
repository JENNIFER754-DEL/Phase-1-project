
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Both fields are required!');
        return false;
    }
    return true;
}


let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    
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

setInterval(nextTestimonial, 5000);


showTestimonial(currentTestimonialIndex);
