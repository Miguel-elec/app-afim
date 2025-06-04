const express = require('express');
const cors = require('cors'); 
const app = express();

const { config } = require('./config/index');
const monedasAPI = require('./rutas/monedas');

app.use(cors());

app.use(express.json());

app.use(express.static('public'))

monedasAPI(app);

app.listen(config.port, () => {
    console.log(`servidor escuchando en ${config.port}`);
})