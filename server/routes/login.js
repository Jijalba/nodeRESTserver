const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email },
        (err, usuarioDB) => {

            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });


            if (!usuarioDB)
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña Incorrectos'
                    }
                });


            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña Incorrectos'
                    }
                });
            }

            let token = jwt.sign({
                    usuario: usuarioDB
                },
                process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });



        });


});


//configuracions de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    console.log(payload.name);
    console.log(payload.picture);
    console.log(payload.name);

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.img,
        google: true
    }


}


app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            });

        });


    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {


        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        if (usuarioDB) {
            if (usuarioDB.google)
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Debe de usar su autenticación normal'
                    }
                });
            else {
                let token = jwt.sign({
                        usuario: usuarioDB
                    },
                    process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        } else {
            // Si no existe en DB
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.img = googleUser.img;
            usuario.password = ":)";
            usuario.email = googleUser.email;

            usuario.save((err, usuarioDB) => {
                if (err)
                    return res.status(500).json({
                        ok: false,
                        err
                    });

                let token = jwt.sign({
                        usuario: usuarioDB
                    },
                    process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })


            });

        }



    })

    // res.json({
    //     usuario: googleUser
    // })

});


module.exports = app;