const db = require('../models');
const Estudiantes = db.estudiantes;

// TODO: Se guardan los estudiantes en la BD del sistema.
const crearEstudiantes = async (req, res) => {
    const { carnet, nombres, apellidos, facultad, nombre_carrera,
        anyo_actual, anyo_est, tipo_curso, tipo_matricula,
        sexo, correo
    } = req.body;

    try {

        const newEstudiantes = await Estudiantes.create({
            carnet,
            nombres,
            apellidos,
            facultad,
            nombre_carrera,
            anyo_actual,
            anyo_est,
            tipo_curso,
            tipo_matricula,
            sexo,
            correo
        });

        res.json(
            newEstudiantes
        );
    } catch (error) {
        return res.status(500).json({
            msg: error.msg || 'Hubo error inesperado al momento de crear el usuario'
        });
    }
}

module.exports = {
    crearEstudiantes
}