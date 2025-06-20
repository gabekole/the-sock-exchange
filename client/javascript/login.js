console.log("Load login script")

document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault()
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Username: ' + username);
    console.log('Password: ' + password);


    const messageDiv = document.getElementById('message');

    if (username === 'wasadmin@test.com' && password === 'red') {
        messageDiv.innerHTML = 'Logged in';
        messageDiv.style.color = 'green';
    } else {
        messageDiv.innerHTML = 'Not authorized';
        messageDiv.style.color = 'red';
    }
});