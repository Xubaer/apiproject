const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiproject');

const app = express();

const users = require('./routes/users');
//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', users);

//Handle 404 error
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error Handler
app.use((err, req, res, next) => {
    const error = app.get('env') == "development" ? err : {};
    const status = error.status || 500;
    //respond to client side
    res.status(status).json({
        error: {
            message: error.message
        }
    })

    //respond to ourselves
    console.error(err);
});

//start server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server started Listening on port ${port}`) );