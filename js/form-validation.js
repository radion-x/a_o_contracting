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
                formElement.reset();
            } else {
                this.showMessage(formElement, 'error', result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('=== FETCH ERROR ===');
            console.error('Error type:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            this.showMessage(formElement, 'error', 'Network error. Please check your connection and try again.');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            console.log('=== FORM SUBMISSION END ===');
        }
    }
    
    showMessage(text, type) {
        // Remove any existing message
        const existingMsg = this.form.parentElement.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}-message`;
        messageDiv.textContent = text;
        
        const bgColor = type === 'success' ? '#27ae60' : '#e74c3c';
        messageDiv.style.cssText = `
            background-color: ${bgColor};
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            animation: slideDown 0.3s ease-out;
        `;
        
        this.form.parentElement.insertBefore(messageDiv, this.form);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove message after 7 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 7000);
    }
}

// Initialize form validators when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new FormValidator('contact-form');
    new FormValidator('quote-form');
});
