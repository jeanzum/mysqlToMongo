'use strict';

const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    path = require('path'),
    helmet = require('helmet'),
    cors = require("cors"),
    config = require('./config'),
    mongoose = require('mongoose'),

    // Middles
    {logErrors, clientErrorHandler, wrapErros, errorHandler} = require(
        './utils/middles/errors'
    ), {dbName} = require('./config/index');

const migrateApi = require('./routes/migrate');
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

// Errors Handlers
app.use(logErrors)
app.use(clientErrorHandler)
app.use(wrapErros)
app.use(errorHandler)

// index de la API
app.get('/', (req, res) => {
    res.render('index', {
        text: 'API Rest v1.0',
        dev: config.dev
    })
})

app.use('/migrate', migrateApi);

mongoose.connect(`${config.mongoUri}/happycity`)
//mongoose.set('useFindAndModify', false);

http.listen(8080, () => {
    console.log('Server started at http://localhost:8080')
})
