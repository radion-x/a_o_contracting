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
            this.submitForm();
        }
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        
        // Send to server or process data
        console.log('Form submitted successfully', Object.fromEntries(formData));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you! We will contact you soon.';
        successMsg.style.cssText = `
            background-color: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        this.form.parentElement.insertBefore(successMsg, this.form);
        
        // Reset form
        this.form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => successMsg.remove(), 5000);
    }
}

// Initialize form validators when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new FormValidator('contact-form');
    new FormValidator('quote-form');
});
