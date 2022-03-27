require('dotenv').config()
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const router = require('./network/routes');
const db = require('./db');

db(process.env.MONGO_DB)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);
router(app);

app.use('/app', express.static('public'))

server.listen(process.env.PORT, () => {
    console.log(`App listening in ${process.env.HOST}:${process.env.PORT}`);
});
