const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error.message);
  });

// Manejar eventos de conexión y error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});