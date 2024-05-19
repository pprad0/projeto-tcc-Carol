// Para Node.js, importe o Axios
const axios = require('axios');

// URL da API de terceiros
const apiURL = 'https://api.exemplo.com/dados';

// Fazendo uma requisição GET
axios.get(apiURL)
  .then(response => {
    // Manipule a resposta aqui
    console.log(response.data);
  })
  .catch(error => {
    // Manipule os erros aqui
    console.error('Houve um erro na requisição:', error);
  });
