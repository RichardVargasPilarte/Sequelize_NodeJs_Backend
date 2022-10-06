const express = require('express'); // import express
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
// const app = require('app');

const db = require('./models')
require('dotenv').config();

const PORT = process.env.PORT || '6000';

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// El metodo sync es el encargado de sincronizar los modelos con la base de datos
db.sequelize.sync()
  .then(() => {
    /**Puerto de escucha */
    app.listen(PORT, () => {
      console.log(`Escuchando por el puerto ${PORT}`)
    })
    console.log("Conexión con la BD establecida con exito.");
  })
  .catch((err) => {
    console.log("Fallo la sincronización con la BD: " + err.message);
  });

/** Rutas */
app.use('/api/usuarios', require('./routes/usuariosRoutes'));