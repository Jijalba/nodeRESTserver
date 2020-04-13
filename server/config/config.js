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