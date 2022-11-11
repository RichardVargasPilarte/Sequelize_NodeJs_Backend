require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: 'postgres',
    pool: {
        max: 10, // número máximo de conexiones en el grupo
        min: 0, // número mínimo de conexión en el grupo
        acquire: 30000, // tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada, es decir, 30 seg
        idle: 10000 // tiempo máximo, en milisegundos, ese grupo intentará conectarse antes de arrojar un error, es decir, 10 seg
    }
};