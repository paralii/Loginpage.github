var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');

function validateEmail() {
    var email = document.getElementById('email').value.trim();
    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (/\s/.test(email)) {
        emailError.innerHTML = 'Email should not contain white spaces';
        return false;
    }
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        emailError.innerHTML = 'Please enter a valid email address';
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePassword() {
    var password = document.getElementById('password').value;
    if (password.length == 0) {
        passwordError.innerHTML = 'Password is required';
        return false;
    }
    if (!/^\d+$/.test(password)) {
        passwordError.innerHTML = 'Password must contain only numbers';
        return false;
    }
    if (password.length < 8) {
        passwordError.innerHTML = 'Password must be at least 8 digits long';
        return false;
    }
    passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    var isEmailValid = validateEmail();
    var isPasswordValid = validatePassword();
    if (!isEmailValid || !isPasswordValid) {
        submitError.innerHTML = 'Please fix the errors above before submitting';
        return false;
    }
    submitError.innerHTML = '';
    return true;
}

(function() {
    function clearUrlParameters() {
        if (window.history.replaceState) {
            var cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
    clearUrlParameters();
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
    document.getElementById('loginForm').reset();
})();
