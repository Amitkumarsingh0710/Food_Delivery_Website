const axios = require('axios');

// axios.get('https://jsonplaceholder.typicode.com/todos')
//   .then(response => {
//     console.log(response.data); 
//   })
//   .catch(error => {
//     console.error(error.message); 
//   });


  fetch('https://restcountries.com/v3.1/name/india')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
  })
  .then(data => {
    console.log(data); 
  })
  .catch(error => {
    console.error('Fetch error:', error.cause); 
  });
