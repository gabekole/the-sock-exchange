document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    try {
      const response = await fetch('http://localhost:9000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
  
      const result = await response.json();
  
      console.log(result)

      if (result.message === 'success') {
        document.getElementById('message').innerText = 'Registration successful!';
      } else {
        document.getElementById('message').innerText = 'Registration failed. Please try again.';
      }
    } catch (error) {
      document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
  });
  