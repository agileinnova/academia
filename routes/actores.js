const { Router } = require('express')
const { cnn_mysql } = require('./../config/database')
const router = Router()

router.get('/actor', (req, res) => {
    cnn_mysql.query(`SELECT * FROM actores`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send('Se presento un error en la base de datos.')
        } else {
            return res.json(resulset)
        }
    })
})

router.get('/actor/:id', async (req, res) => {
    const id = req.params.id
    const [rows] = await cnn_mysql.promise().query(`SELECT * FROM actores WHERE id = ?`, [id])
    if (rows[0]) {
        res.json(rows[0])
    } else {
        res.json({})
    }
})

router.post('/actor', async (req, res) => {
    try {
        const {
            documento,
            tipo_documento,
            nombres,
            apellidos,
            contrasena,
            correo,
            telefono_celular,
            numero_expediente,
            genero,
            fecha_nacimiento,
            estado_actor_id,
            institucion_id,
            tipo_actor_id,
            fecha_creacion,
            fecha_actualizacion
        } = req.body
        const r = await cnn_mysql.promise().execute(`INSERT INTO actores(documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id, fecha_creacion,fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id, fecha_creacion, fecha_actualizacion])

        if (r.affectedRows > 0) {
            res.json({
                id: r.insertId,
                documento: documento,
                tipo_documento: tipo_documento,
                nombres: nombres,
                apellidos: apellidos,
                contrasena: contrasena,
                correo: correo,
                telefono_celular: telefono_celular,
                numero_expediente: numero_expediente,
                genero: genero,
                fecha_nacimiento: fecha_nacimiento,
                estado_actor_id: estado_actor_id,
                institucion_id: institucion_id,
                tipo_actor_id: tipo_actor_id,
                fecha_creacion: fecha_creacion,
                fecha_actualizacion: fecha_actualizacion
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e)
    }
})

router.put('/actor/:id', (req, res) => { })

router.patch('/actor/:id', (req, res) => { })

router.delete('/actor/:id', (req, res) => { })

module.exports = router