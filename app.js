var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dresseurRouter = require('./routes/dresseur');
var pokemonRouter = require('./routes/pokemon');

var app = express();

// connexion en local
var dev_db_url = "mongodb+srv://ThomPlan:RKhxkL3jJ2E1nmC5@cluster0.nigd1.mongodb.net/myfirstdatabase?retryWrites=true&w=majority";
// connexion en cloud si possible si non prend la connexion local
var mongodb = process.env.MONGO_URI || dev_db_url;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors);
app.use('/dresseurs', dresseurRouter);
app.use('/pokemon', pokemonRouter);
module.exports = app;
