const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 

require('dotenv').config();

const app = express(); // Se crea instancia de express
app.use(morgan('dev')); // Se muestran por consolas las peticiones HTTP
app.use(cors()); // Se habilitan los cors

app.use(express.json()); // Se habilita JSON
app.use(express.static('public')); // Se habilitan los archivos estaticos

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT); // Escucha el puerto definido en las variables de entorno
});