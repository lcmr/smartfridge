const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('./server/config/database');
const api = require('./server/routes/api');


mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

mongoose.connection.on('connected', () => {
	console.log('Conectado a la base de datos: '+ config.database);
});


mongoose.connection.on('error', (err) => {
	console.log('Error en la base de datos: '+ err);
});


const port = 8080;

const app = express();

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log('Server running on localhost: '+port);
});