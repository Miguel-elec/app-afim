const MongoLib = require('../lib/mongo');

class MonedasService {

    constructor(){
        this.collection = 'monedas';
        this.mongoDB = new MongoLib();
    }

    async getMonedas({tags}) {
        const query = tags ;
        const monedas = await this.mongoDB.getMonedas(this.collection, query);
        return monedas || [];
    }

    async crearMoneda({moneda}){
        const monedaCreadaId = await this.mongoDB.anadirMoneda(this.collection, moneda);
        return monedaCreadaId || [];
    }

    async actualizarMoneda( monedaId, moneda = {}){
        const monedaActualizadaId = await this.mongoDB.actualizarMoneda(this.collection, monedaId, moneda);
        return monedaActualizadaId || [];
    }

    async borrarMoneda( monedaId ){
        const monedaBorradaId = await this.mongoDB.borrarMoneda(this.collection, monedaId);
        return monedaBorradaId || [];
    }
    
}

module.exports = MonedasService