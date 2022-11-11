module.exports = (sequelize, Sequelize) => {
    const Estudiantes = sequelize.define('Estudiantes', {
        carnet: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nombres: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        apellidos: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        facultad: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nombre_carrera: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        anyo_actual: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        anyo_est: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        tipo_curso: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tipo_matricula: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sexo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        correo: {
            type: Sequelize.STRING,
            allowNull: false,
            isEmail: true,
        }
    });

    return Estudiantes;
}