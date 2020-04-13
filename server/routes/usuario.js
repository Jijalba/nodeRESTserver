const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');


//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { verificaToken } = require('../middlewares/autenticacion');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 2;
    limite = Number(limite);

    Usuario.find({}, 'nombre email role estado google img')
        .limit(desde)
        .skip(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }


            Usuario.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    conteo,
                    usuarios,
                })
            })


        });

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});


app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })

});


app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10),
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }

    });
});

module.exports = app;