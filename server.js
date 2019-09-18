const express = require('express');
const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(__dirname));
server.listen(port);