// 
// Puerto

process.env.PORT = process.env.PORT || 3000;

// Enterno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base

let urlDb;

if (process.env.NODE_ENV == 'dev')
    urlDb = 'mongodb://localhost/cafe';
else
    urlDb = process.env.MONGO_URI;

process.env.urlDb = urlDb;


// vencimiento del token
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// seed

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';