const express = require('express');
const cors = require('cors'); 
const app = express();

const { config } = require('./config/index');
const monedasAPI = require('./rutas/monedas');

app.use(cors());

app.use(express.json());ç

app.use(express.static(path.join(__dirname, 'public')));

monedasAPI(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(config.port, () => {
    console.log(`servidor escuchando en ${config.port}`);
})