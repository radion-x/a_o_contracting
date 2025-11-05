// ========================================
// FORM VALIDATION
// ========================================

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.attachFieldValidators();
    }
    
    attachFieldValidators() {
        const fields = this.form.querySelectorAll('[data-validate]');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (this.errors[field.name]) {
                    this.validateField(field);
                }
            });
        });
    }
    
    validateField(field) {
        const rules = field.getAttribute('data-validate').split('|');
        let isValid = true;
        
        rules.forEach(rule => {
            if (!this.validateRule(field, rule)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            delete this.errors[field.name];
            this.removeFieldError(field);
        }
        
        return isValid;
    }
    
    validateRule(field, rule) {
        const value = field.value.trim();
        const [ruleName, ...params] = rule.split(':');
        
        switch(ruleName) {
            case 'required':
                if (!value) {
                    this.setFieldError(field, 'This field is required');
                    return false;
                }
                break;
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.setFieldError(field, 'Please enter a valid email');
                    return false;
                }
                break;
            case 'phone':
                if (!this.isValidPhone(value)) {
                    this.setFieldError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;
            case 'min':
                if (value.length < parseInt(params[0])) {
                    this.setFieldError(field, `Minimum ${params[0]} characters required`);
                    return false;
                }
                break;
            case 'max':
                if (value.length > parseInt(params[0])) {
                    this.setFieldError(field, `Maximum ${params[0]} characters allowed`);
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
    }
    
    setFieldError(field, message) {
        field.classList.add('field-error');
        let errorElement = field.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '4px';
            errorElement.style.display = 'block';
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        this.errors[field.name] = message;
    }
    
    removeFieldError(field) {
        field.classList.remove('field-error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.errors = {};
        
        const fields = this.form.querySelectorAll('[data-validate]');
        let formIsValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                formIsValid = false;
            }
        });
        
        if (formIsValid) {
            this.submitForm(this.form);
        }
    }
    
    async submitForm(formElement) {
        console.log('=== FORM SUBMISSION START ===');
        console.log('Form element:', formElement);

        const formData = new FormData(formElement);
        const data = {};

        // Add form type first
        if (formElement.id === 'quote-form') {
            data.formType = 'quote';

            // Collect all quote form fields
            data.firstName = formData.get('firstName');
            data.lastName = formData.get('lastName');
            data.name = `${formData.get('firstName') || ''} ${formData.get('lastName') || ''}`.trim();
            data.email = formData.get('email');
            data.phone = formData.get('phone');
            data.serviceType = formData.get('serviceType');
            data.propertyType = formData.get('propertyType');
            data.address = formData.get('address');
            data.suburb = formData.get('suburb');
            data.postcode = formData.get('postcode');
            data.buildingSize = formData.get('buildingSize');
            data.asbestos = formData.get('asbestos');
            data.timeline = formData.get('timeline');
            data.message = formData.get('description');
            data.siteAccess = formData.get('siteAccess');
            data.contactPreference = formData.get('contactPreference');

            // Collect services array
            const services = formData.getAll('services[]');
            if (services.length > 0) {
                data.services = services.join(', ');
            }
        } else {
            // Contact form
            data.formType = 'contact';
            data.name = formData.get('name');
            data.email = formData.get('email');
            data.phone = formData.get('phone');
            data.suburb = formData.get('suburb');
            data.service = formData.get('service');
            data.message = formData.get('message');
        }

        console.log('Form data:', data);
        
        // Show loading state
        const submitBtn = formElement.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        
        try {
            console.log('Sending fetch request to /send-email.php...');
            const response = await fetch('/send-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            const result = await response.json();
            console.log('Response JSON:', result);

            if (result.debug) {
                console.log('🔍 DEBUG INFO:');
                console.log('  → Email sent to:', result.debug.recipient);
                console.log('  → Mailgun Message ID:', result.debug.mailgun_id);
            }

            if (result.success) {
                this.showMessage(formElement, 'success', result.message || 'Thank you for your message! We\'ll get back to you soon.');
                // Don't reset button - form is being hidden by animation
                console.log('=== FORM SUBMISSION END (SUCCESS) ===');
            } else {
                this.showMessage(formElement, 'error', result.message || 'Something went wrong. Please try again.');
                // Reset button on error so user can try again
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                console.log('=== FORM SUBMISSION END (ERROR) ===');
            }
        } catch (error) {
            console.error('=== FETCH ERROR ===');
            console.error('Error type:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            this.showMessage(formElement, 'error', 'Network error. Please check your connection and try again.');
            // Reset button on error
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            console.log('=== FORM SUBMISSION END (CATCH) ===');
        }
    }
    
    showMessage(formElement, type, text) {
        // Remove any existing message
        const existingMsg = formElement.parentElement.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        if (type === 'success') {
            // Hide the form with fade animation
            formElement.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            formElement.style.opacity = '0';
            formElement.style.transform = 'scale(0.95)';

            setTimeout(() => {
                formElement.style.display = 'none';

                // Create success animation container
                const messageDiv = document.createElement('div');
                messageDiv.className = 'form-success-animation';

                messageDiv.innerHTML = `
                    <div class="success-card">
                        <div class="checkmark-circle">
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
                                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                        <h2 class="success-title">Message Sent!</h2>
                        <p class="success-text">${text}</p>
                    </div>
                `;

                messageDiv.style.cssText = `
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 400px;
                    opacity: 0;
                    animation: fadeInUp 0.6s ease-out forwards;
                `;

                formElement.parentElement.appendChild(messageDiv);

                // Inject styles for animations
                if (!document.getElementById('form-animation-styles')) {
                    const styleSheet = document.createElement('style');
                    styleSheet.id = 'form-animation-styles';
                    styleSheet.textContent = `
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(30px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes drawCircle {
                            0% {
                                stroke-dasharray: 0, 157;
                            }
                            100% {
                                stroke-dasharray: 157, 157;
                            }
                        }

                        @keyframes drawCheck {
                            0% {
                                stroke-dasharray: 0, 50;
                            }
                            100% {
                                stroke-dasharray: 50, 50;
                            }
                        }

                        @keyframes scaleIn {
                            0% {
                                transform: scale(0);
                            }
                            50% {
                                transform: scale(1.1);
                            }
                            100% {
                                transform: scale(1);
                            }
                        }

                        .success-card {
                            background: white;
                            border-radius: 16px;
                            padding: 3rem 2rem;
                            text-align: center;
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                            max-width: 500px;
                            width: 100%;
                        }

                        .checkmark-circle {
                            margin: 0 auto 2rem;
                            width: 100px;
                            height: 100px;
                            animation: scaleIn 0.5s ease-out 0.2s both;
                        }

                        .checkmark {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }

                        .checkmark-circle-bg {
                            stroke: #27ae60;
                            stroke-width: 2;
                            stroke-dasharray: 157;
                            stroke-dashoffset: 0;
                            animation: drawCircle 0.6s ease-out 0.4s forwards;
                        }

                        .checkmark-check {
                            stroke: #27ae60;
                            stroke-width: 3;
                            stroke-linecap: round;
                            stroke-dasharray: 50;
                            stroke-dashoffset: 50;
                            animation: drawCheck 0.4s ease-out 0.8s forwards;
                        }

                        .success-title {
                            color: #003366;
                            font-size: 2rem;
                            margin-bottom: 1rem;
                            font-weight: 700;
                        }

                        .success-text {
                            color: #666;
                            font-size: 1.1rem;
                            line-height: 1.6;
                        }

                        @media (max-width: 768px) {
                            .success-card {
                                padding: 2rem 1.5rem;
                            }

                            .checkmark-circle {
                                width: 80px;
                                height: 80px;
                            }

                            .success-title {
                                font-size: 1.5rem;
                            }

                            .success-text {
                                font-size: 1rem;
                            }
                        }
                    `;
                    document.head.appendChild(styleSheet);
                }

                // Scroll to message
                messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        } else {
            // Error message - keep simple
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message error-message`;
            messageDiv.textContent = text;

            messageDiv.style.cssText = `
                background-color: #e74c3c;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
                animation: slideDown 0.3s ease-out;
            `;

            formElement.parentElement.insertBefore(messageDiv, formElement);

            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Remove error message after 7 seconds
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                messageDiv.style.transition = 'opacity 0.3s ease-out';
                setTimeout(() => messageDiv.remove(), 300);
            }, 7000);
        }
    }
}

// Initialize form validators when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new FormValidator('contact-form');
    new FormValidator('quote-form');
});
