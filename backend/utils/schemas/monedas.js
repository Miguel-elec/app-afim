const Joi = require('@hapi/joi')
  .extend(require('@hapi/joi-date'));

const monedaIdSchema   = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const cantidadSchema   = Joi.number().precision(2).required();
const saldoSchema      = Joi.number().precision(2).min(0);
const cambioSchema     = Joi.number().precision(2).min(0);

const crearOperacionSchema = {
  cantidad: cantidadSchema,
  saldo:    saldoSchema,
  cambio:   cambioSchema
};

module.exports = {
  monedaIdSchema,
  crearOperacionSchema
};
