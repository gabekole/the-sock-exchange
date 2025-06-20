fetch('http://www.example.com/api/data')
  .then(response => response.json())
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error))
  .finally(() => console.log('Fetch attempt completed.'));