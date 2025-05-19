
function notFoundHandler(req, res) {

  res.status('404').json({'mensaje': 'pagina no encontrada'});
}

module.exports = notFoundHandler;