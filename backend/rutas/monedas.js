const express = require('express');

const MonedasService = require('../servicios/monedasService');

function monedasAPI(app) {
    const router = express.Router();
    app.use('/api/monedas', router);

    const monedasService = new MonedasService();

    router.get('/', async function (req, res, next) {
        const tags = req.query;
        try {
            const tareas = await monedasService.getMonedas({tags});
            res.status(200).json(
                {
                    data: tareas,
                    message: 'operariones devueltas con éxito'
                }
            )
        } catch (err){
            next(err);
        }
    })

    router.post('/', async function (req, res, next) {
        const { body: moneda } = req; 
        try {
            const nuevaMoneda = await monedasService.crearMoneda({moneda});

            res.status(201).json({
                data: nuevaMoneda,
                message: 'operacion añadida con éxito'
            });
        } catch (err) {
            next(err);
        }
    })

    router.put('/:monedaId', async function (req, res, next) {
        const  monedaId  = req.params.monedaId;
        const  nuevaMoneda  = req.body; 

        try {
            const monedaActualizada = await monedasService.actualizarMoneda(monedaId, nuevaMoneda);

            res.status(200).json({
                data: monedaActualizada,
                message: 'operacion actualizada con éxito'
            });
        } catch (err) {
            next(err);
        }

    })

    router.delete('/:monedaId', async function (req, res, next) {
        const  monedaId  = req.params.monedaId;

        try {
            const monedaBorrada = await monedasService.borrarMoneda(monedaId);

            res.status(200).json({
                data: monedaBorrada,
                message: 'operacion borrada con éxito'
            });
        } catch (err) {
            next(err);
        }

    })

}

module.exports = monedasAPI;