const signUpForm = document.getElementById('sign-up-form');
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const message = document.getElementById('message');
const formData = document.getElementById('form-data');
const downloadLink = document.getElementById('download-link');

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateInput()) {
    generateJSON();
    downloadJSON();
    message.textContent = 'Sign-up successful!';
    formData.textContent = JSON.stringify({
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value
    }, null, 2);
    console.log('Form Data: ', {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value
    });
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    setInterval(() => {
      message.textContent = '';
    }, 3000);
  }
});

function validateInput() {
  if (!userName.value || !userEmail.value || !userPassword.value) {
    message.textContent = 'Please fill all the fields!';
    return false;
  }
  if (!validateEmail(userEmail.value)) {
    message.textContent = 'The email is not correct!';
    return false;
  }
  if (!validatePassword(userPassword.value)) {
    message.textContent = 'The password should be 8 characters long, containing a number and a special character at least!';
    return false;
  }
  return true;
};

function generateJSON() {
  let userData = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value
  };
  downloadLink.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(userData, null, 2));
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 8 && password.match(/(?:[0-9]+|[!@#$%^&*()-+={}[\]|;:'",<.>/?])/g) && password.match(/[a-z]/i) && password.match(/[A-Z]/i);
}

function downloadJSON() {
  downloadLink.click();
}