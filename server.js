const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
fs = require('fs'),
cors = require('cors'),
routers = require('./routes/routes.js');

const app = express();

app.use('/list', express.static(path.join(__dirname, 'html/index.html')));
app.use('/add_movie', express.static(path.join(__dirname, 'html/add_movie_form.html')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);
var hostname = '127.0.0.1';

const server = app.listen(3001, hostname, () => {
	console.log('listening on port %s...', server.address().port);
});