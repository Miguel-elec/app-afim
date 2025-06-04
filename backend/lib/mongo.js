const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

const USER = config.DB_USER;
const PASSWORD = config.DB_PASSWORD;
const DB_HOST = config.DB_HOST;
const DB_NAME = config.DB_NAME;
const DB_PORT = config.DB_PORT;

const MONGO_URI = 'mongodb+srv://mgutierrezheinf:1234@prueba.rfnft5x.mongodb.net/tareasdb?retryWrites=true&w=majority&appName=prueba';


class MongoLib {
    constructor(){
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection){
            MongoLib.connection = new Promise ((resolve, reject) => {
                this.client.connect( err => {
                    if (err) {
                        reject("error en la conexión con la BBDD ", err);
                    }
                    console.log('Conectado a la BBDD');
                    resolve(this.client.db(this.dbName));
                })
            })
        }

        return MongoLib.connection;
    }

    getMonedas(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    anadirMoneda(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data)
        }).then(result => result.insertedId);
    }

    actualizarMoneda(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
        }).then(result => result.insertedId || id);
    }

    borrarMoneda(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) })

        }).then(() => id)
    }
}

module.exports = MongoLib;