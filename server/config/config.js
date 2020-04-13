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
    urlDb = 'mongodb+srv://jijalba:154179521@cafe-kibjr.gcp.mongodb.net/cafecito?retryWrites=true&w=majority';


process.env.urlDb = urlDb;