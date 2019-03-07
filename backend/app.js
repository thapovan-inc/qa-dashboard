const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream');
const uuid = require('uuid/v4');

const indexRouter = require('./routes');
const searchFiltersRouter = require('./routes/searchFilters');
const automationResultsRouter = require('./routes/automationResults');

const app = express();
const logDirectory = path.join(__dirname, 'logs');

// ensure log directory already
fs.existsSync(logDirectory) || fs.mkdir(logDirectory, {recursive: true}, (err) => {
    if (err) {
        throw err;
    }
});

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});

logger.token('id', function getId(req) {
    return req.id;
});

logger.token('data', function (req, res) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
}
app.use(allowCrossDomain);

app.use(assignId);
app.use(logger('[ :id ] [ :date[clf] ] : :method req { :url :data } res { :status :res[content-length] }', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/v1/', indexRouter);
app.use('/v1/searchFilters', searchFiltersRouter);
app.use('/v1/automationResults', automationResultsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(res.locals.error)
});

function assignId(req, res, next) {
    req.id = uuid();
    next();
}

module.exports = app;
