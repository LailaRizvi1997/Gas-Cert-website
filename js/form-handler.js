/**
 * Khawer Rizvi Gas Services - Form Handler
 * Created: April 2025
 * 
 * This script handles the form submission for the booking form.
 * In a production environment, this would be replaced with a server-side
 * script that sends emails and stores the form data in a database.
 */

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm(bookingForm)) {
                return false;
            }
            
            // Collect form data
            const formData = new FormData(bookingForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message and log the data
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Booking Request Received!</h3>
                <p>Thank you for your booking request, ${formObject.name}. Khawer will contact you shortly to confirm your appointment.</p>
                <p>A confirmation has been sent to your phone: ${formObject.phone}</p>
                <p>Service requested: ${formObject.service}</p>
                <p>Preferred date/time: ${formObject.datetime || 'As soon as possible'}</p>
            `;
            
            // Replace form with success message
            bookingForm.innerHTML = '';
            bookingForm.appendChild(successMessage);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Log the form data (for development purposes)
            console.log('Form submitted:', formObject);
            
            // In a real implementation, you would send this data to a server
            // For example:
            /*
            fetch('/api/submit-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Show success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Show error message
            });
            */
        });
    }
    
    // Form validation function
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Remove any existing error messages
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Check each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'This field is required';
                field.parentNode.appendChild(errorMessage);
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        // Validate phone number format (UK)
        const phoneField = form.querySelector('input[name="phone"]');
        if (phoneField && phoneField.value.trim()) {
            const phoneRegex = /^(\+44|0)\d{10}$/;
            if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
                isValid = false;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please enter a valid UK phone number';
                phoneField.parentNode.appendChild(errorMessage);
                phoneField.classList.add('error');
            }
        }
        
        // Validate postcode format (UK)
        const postcodeField = form.querySelector('input[name="postcode"]');
        if (postcodeField && postcodeField.value.trim()) {
            const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
            if (!postcodeRegex.test(postcodeField.value)) {
                isValid = false;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please enter a valid UK postcode';
                postcodeField.parentNode.appendChild(errorMessage);
                postcodeField.classList.add('error');
            }
        }
        
        return isValid;
    }
});
