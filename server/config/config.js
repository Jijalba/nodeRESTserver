// 
// Puerto

process.env.PORT = process.env.PORT || 3000;

// Enterno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base

let urlDb;

if (process.env.NODE_ENV == 'dev')
    urlDb = 'mongodb+srv://jijalba:154179521@cafe-kibjr.gcp.mongodb.net/test?retryWrites=true&w=majority';
else
    urlDb = process.env.MONGO_URI;

urlDb = 'mongodb+srv://jijalba:154179521@cafe-kibjr.gcp.mongodb.net/test?retryWrites=true&w=majority';

process.env.urlDb = urlDb;


// vencimiento del token
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// seed

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// GOOGLE CLIENT ID

process.env.CLIENT_ID = process.env.CLIENT_ID || "1012083923209-f4jn2i26eind7nl0ocp2meqmo268fmjt.apps.googleusercontent.com";