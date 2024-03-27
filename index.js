document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!emailRegex.test(email)) {
        showPopup('Error: Invalid email address');
        return;
    }

    if (!passwordRegex.test(password)) {
        showPopup('Error: Password must be at least 8 characters long, contain at least one number and one special character');
        return;
    }

    var userData = {
        name: name,
        email: email,
        password: password
    };

    var blob = new Blob([JSON.stringify(userData)], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name + '.json';
    a.click();
});

function showPopup(message) {
    document.getElementById('popupText').textContent = message;
    document.getElementById('popup').style.display = 'block';
    setTimeout(function() {
        document.getElementById('popup').style.display = 'none';
    }, 3000);
}
