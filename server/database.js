const {Client } = require('pg');

const client = new Client ({
    user: 'postgres',
    password: 'pass123123',
    host: 'localhost',
    port: '5432'
    
})

client.connect();

client.query('CREATE DATABASE sample', (err, res) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log(res.rows);
  }
  client.end();
}); 