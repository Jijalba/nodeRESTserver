const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/usuario', function(req, res) {

    res.json('get usuarios');

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });

});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "No se recibió nombre"
        });
    }

    res.json({
        persona: body
    });

});



app.listen(process.env.PORT, () => console.log(`Escuchando el puerto ${process.env.PORT}`));