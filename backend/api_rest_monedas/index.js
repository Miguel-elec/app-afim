const express = require('express');
const app = express();

const { config } = require('./config/index');
const monedasAPI = require('./rutas/monedas');

app.use(express.json());

monedasAPI(app);

app.listen(config.port, () => {
    console.log(`servidor escuchando en ${config.port}`);
})