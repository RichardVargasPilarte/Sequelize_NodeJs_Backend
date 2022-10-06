module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('Usuarios', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        inss: {
            type: Sequelize.STRING,
            allowNull: false
        },
        eliminado: {
            type: Sequelize.STRING,
            defaultValue: 'NO',
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            isEmail: true,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Usuarios;
}