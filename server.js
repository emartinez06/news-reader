const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Key route
const api = require('./routes/apikey');

// Body Parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Helmet middleware
app.use(helmet.hidePoweredBy());

//Cors middleware
app.use(cors());

app.use(express.static(__dirname));

app.use('/key', api);

//start server
const server = http.createServer(app);
server.listen(port);

//Log output of server running
console.log(`Server running at port ${port}`);