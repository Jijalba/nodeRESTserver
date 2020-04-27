require('./config/config.js');

const mongoose = require('mongoose');

const express = require('express');
const path = require("path")
const app = express();

app.use(require('./routes/index'));
//habilitar el public
app.use(express.static(path.resolve(__dirname, "../public")));

console.log(process.env.urlDb);


mongoose.connect(process.env.urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;

    console.log("BASE DE DATOS ONLINE");
});


app.listen(process.env.PORT, () => console.log(`Escuchando el puerto ${process.env.PORT}`));