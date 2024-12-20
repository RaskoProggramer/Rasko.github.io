(function() {
    emailjs.init("aQGo-Oe-LBT29FNy0");  // Replace with your EmailJS User ID
})();

var btn = document.querySelector('.button-area button');
// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    btn.innerText = 'Sending...';
    btn.disabled = true; // Disable the button to prevent multiple clicks

    // Basic form validation (example)
    var name = document.querySelector('[name="customer"]').value;
    var email = document.querySelector('[name="email"]').value;
    var message = document.querySelector('[name="message"]').value;

    if (!name || !email || !message) {
        alert('Please fill out all fields!');
        btn.innerText = 'Send Message';
        btn.disabled = false;
        return;
    }

    // Send email using EmailJS
    emailjs.sendForm('service_7a1n93x', 'template_syk5h2p', this)
        .then(function() {
            alert('Your message has been sent successfully!');
            btn.innerText = 'Sent!';
            document.getElementById("contact-form").reset();
            setTimeout(function() {
                btn.innerText = 'Send Message';
                btn.disabled = false;
            }, 3000); // Reset button after 3              
        }, function(error) {
            alert('Failed to send message. Please try again.');
            console.error('EmailJS Error:', error);
            btn.innerText = 'Send Message';
            btn.disabled = false;
        });
});
