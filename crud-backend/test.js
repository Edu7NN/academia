fetch('http://localhost:5000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao.silva@example.com',
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
