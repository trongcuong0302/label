const express = require('express');
var templates = require('./routes/template');
const Database = require('./libs/dbConnection');

const start = async() => {
    const app = express();
    await Database.dbConnect();
    app.use(express.json());

    app.use(function(req, res, next) {
        //Enabling CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        next();
    });

    app.use('/templates', templates);

    console.log("server started");
    app.listen(3000);

}

start();