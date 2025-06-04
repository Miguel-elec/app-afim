require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT | 3000,
    DB_HOST : 'localhost', 
    DB_PORT : 27017,
    DB_NAME : 'monedas',
    DB_USER: '',
    DB_PASSWORD: ''
}

module.exports = { config }