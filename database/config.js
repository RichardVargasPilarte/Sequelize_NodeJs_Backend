const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Se permiten 10 conexiones a la bd al mismo tiempo como maximo
});

// conectar y comprobar si hay errores a la bd
pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexión a la base de datos perdida');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conecciones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La base de datos rechazo la conexión');
        }
    }

    if(connection) connection.realese();

    return;
});

module.exports = poll;