const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logsignReq = require('./Router/SignLogRouter');

require('dotenv').config();
require('./Models/DB');
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

app.use('/api/req', logsignReq);

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});