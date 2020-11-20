var express = require('express');
var router = express.Router();
var riesgoControllerAPI = require('../../controllers/riskControllerAPI'); //Necesario para optener os resultados de las busquedas en la BD


router.get('/:id', riesgoControllerAPI.risk_list); //Se obtiene la información de todos los riesgos
router.post('/evaluar_riesgo/generar_informe/:id', riesgoControllerAPI.riesgo_create); //Se crea un nuevo riesgo y se guarda
router.get('/buscar_riesgo/:id/:code', riesgoControllerAPI.riesgo_getOne); //Se obtiene la información de un riesgo en especifico
router.delete('/eliminar_riesgo/:id/:code', riesgoControllerAPI.riesgo_deleteOne); //Se elimina un riesgo en especifico de la BD
router.put('/actualizar_riesgo/:id/:code', riesgoControllerAPI.riesgo_updateOne); //Se actualiza la información de un riesgo en especifico
router.get('/mapear_riesgos/:id', riesgoControllerAPI.map_risk); //Se obtiene la información necesaria de todos los riesgos para mapearlos 
router.get('/informe_gerencial/:id', riesgoControllerAPI.gerential_inform); //Se obtiene la información necesaria de todos los riesgos para generar un informe gerencial

module.exports = router;