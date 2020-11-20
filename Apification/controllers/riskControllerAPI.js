var Riesgo = require('../models/riskSchema'); //Necesario para hacer las busquedas e inserciones en la BD y además posee un esquema de validación de datos a guardar

/***
 * Método encargado de buscar todos los riesgos en la BD que pertenezcan un usuario en especifico 
 * Envia el resultado de la busqueda o indica si existió uun error.
 */
exports.risk_list = function(req, res) {
    Riesgo.find({ id_user: req.params.id }, (err, data) => {
        if (err) res.status(500).json({
            mensaje: "Lo sentimos ha surgido un problema y no podemos mostrarte los riesgos de lavado de activo. Disculpa por las molestias"
        });
        else res.send(data)
    });
}

/**
 * Método encargado de guadar la información de un riesgo de lavado de activos, 
 * esta se asocia a un usuario en especifico
 * @param {id} req Se obtiene el Id del usaio a quien se le asociaria el riesgo a guardar 
 * @param {*} res Se envia un mensaje si la acción fue exitosa o existió un error
 */
exports.riesgo_create = function(req, res) {
    var riesgo = new Riesgo({
        id_user: req.params.id,
        code: req.body.code,
        proceso_asociado: req.body.proceso_asociado,
        riesgo: req.body.riesgo,
        descripcion: req.body.descripcion,
        riesgos_asociados: req.body.riesgos_asocidos,
        causas: req.body.causas,
        factor_del_riesgo: req.body.factor_del_riesgo,
        nivel_1: req.body.nivel_1,
        nivel_2: req.body.nivel_2,
        medicion_inherente: req.body.medicion_inherente,
        medicion_residual: req.body.medicion_residual,
        controles_tratamientos: req.body.controles_tratamientos,
        nombre_indicador: req.body.nombre_indicador,
        formula_indicador: req.body.formula_indicador,
        meta: req.body.meta,
        frecuencia: req.body.frecuencia
    });

    Riesgo.create(riesgo, (err) => {
        if (err) res.status(500).json({
            mensaje: "Lo sentimos  cliente " + req.params.id + " ha surgido un problema y no podemos agregar  el riesgo número " +
                req.body.code + " a los riesgos de lavado de activos, puede ser un problema nuestro o revisa que ya no haya sido guardado un riesgo con el código " +
                req.body.code + ". Disculpa por las molestias"
        });
        else {
            var message = "Señor usuario " + req.params.id + ", el riesgo " + req.body.riesgo + " y con código " + req.params.code + " fue guardado con exito ";
            res.json({
                message: message
            });
        }
    });

}

/**
 * Método encargado de trae un riesgo en especifico y de un  especifico usuario
 * 
 * @param {id, code} req Se obtiene el id del usario y el codigo de riesgo a buscar 
 * @param {*} res Se envia la información del riesgo a consultar o si existió un error
 */
exports.riesgo_getOne = function(req, res) {
    Riesgo.findOne({ id_user: req.params.id, code: req.params.code }, (err, data) => {
        if (err) res.status(500).json({
            mensaje: "Lo sentimos  cliente " + req.params.id + " ha surgido un problema y no podemos encontrar el riesgo con código " +
                req.params.code + " en los riesgos de lavado de activos, puede ser un problema nuestro o revisa exista un riesgo guardado con el código" +
                req.params.code + ". Disculpa por las molestias"
        });
        else res.send(data)
    });
}

/**
 *  * Método que se encarga de eliminar un riesgo en especifico y de un especifico usuario
 * Primero busca si ese riesgo en especifico existe existe y despúes lo elimina
 * @param {*} req Se envia el el id del usaurio y el codigo del riesgo
 * @param {*} res Se responde si fue exitosa la operación o existio un error
 */
exports.riesgo_deleteOne = function(req, res) {
    Riesgo.findOneAndRemove({ id_user: req.params.id, code: req.params.code }, (err, data) => {
        if (err) res.status(500).json({
            mensaje: "Lo sentimos  cliente " + req.params.id + " ha surgido un problema y no podemos eliminar el riesgo con código " +
                req.params.code + " de los riesgos de lavado de activos, puede ser un problema nuestro o revisa exista un riesgo guardado con el código" +
                req.params.code + ". Disculpa por las molestias"
        })
        else {
            var message = "Señor usuario " + req.params.id + ", el riesgo con código " + req.params.code + " fue eliminado con exito";
            res.json({
                message: message
            });
        }
    });
}

/**
 * Método encargado de actualizar la información de un riesgo 
 * @param {id, code} req Se obtiene el id del usuario, el código del riesgo y la información a actualizar
 * @param {*} res Se responde si la acción fue exitosa o existió algún error
 */
exports.riesgo_updateOne = function(req, res) {
    Riesgo.findOneAndUpdate({ id_user: req.params.id, code: req.params.code }, {
        proceso_asociado: req.body.proceso_asociado,
        riesgo: req.body.riesgo,
        descripcion: req.body.descripcion,
        riesgos_asociados: req.body.riesgos_asociados,
        causas: req.body.causas,
        factor_del_riesgo: req.body.factor_del_riesgo,
        nivel_1: req.body.nivel_1,
        medicion_inherente: req.body.medicion_inherente,
        medicion_residual: req.body.medicion_residual,
        controles_tratamientos: req.body.controles_tratamientos,
        nombre_indicador: req.body.nombre_indicador,
        formula_indicador: req.body.formula_indicador,
        meta: req.body.meta,
        frecuencia: req.body.frecuencia
    }, (err, data) => {
        if (err) res.status(500).json({
            mensaje: "Lo sentimos  cliente " + req.params.id + " ha surgido un problema y no podemos actualizar el riesgo con código " +
                req.params.code + " en los riesgos de lavado de activos, puede ser un problema nuestro o revisa exista un riesgo guardado con el código" +
                req.params.code + ". Disculpa por las molestias"
        });
        else {
            var message = "Señor usuario " + req.params.id + ", el riesgo con código " + req.params.code + " fue acuatilizado con exito";
            res.json({
                message: message
            });
        }
    });
}

/**
 * Método encargado de obtener a información relevenate de todos los riesgos de un usuario en especifico, 
 * para realizar un mapeo de estos
 * @param {id} req Se obtiene el id del usuario al que se le bede realzar la consulta
 * @param {*} res Se envia el resultado de la consulta en la BD
 */
exports.map_risk = function(req, res) {
    Riesgo.aggregate(
        [{
            '$match': {
                'id_user': req.params.id
            }
        }, {
            '$replaceWith': {
                'code': '$code',
                'nombre': '$riesgo',
                'descripcion': '$descripcion',
                'proceso_asociado': '$proceso_asociado',
                'riesgos_asociados': '$riesgos_asociados',
                'factores_asociados': '$factor_del_riesgo',
                'datos_matriz_inherente': '$medicion_inherente',
                'datos_matriz_residual': '$medicion_residual'
            }
        }],
        (err, data) => {
            if (err) res.status(500).json({
                mensaje: "Lo sentimos  cliente " + req.params.id + " ha surgido un problema y no podemos mostrar el mapa de los riesgos de lavado de activos," +
                    "puede ser un problema nuestro o revisa que existan riesgos guardaos. Disculpa por las molestias "
            });
            else res.send(data)
        });
}

/**
 * Método encargado de obtener la información relevante de los reisgos de un usario en especifico para realizar un informe gerencial
 * @param {id} req Se obtiene el id del usario al que se le tiene que realizar la consulta 
 * @param {*} res Se envia el resultado de la consulta.
 */
exports.gerential_inform = function(req, res) {
    Riesgo.aggregate(
        [{
            '$match': {
                'id_user': req.params.id
            }
        }, {
            '$replaceWith': {
                'code': '$code',
                'nombre': '$riesgo',
                'descripcion': '$descripcion',
                'proceso_asociado': '$proceso_asociado',
                'riesgos_asociados': '$riesgos_asociados',
                'factores_asociados': '$factor_del_riesgo',
                'datos_matriz_inherente': '$medicion_inherente',
                'datos_matriz_residual': '$medicion_residual'
            }
        }],
        (err, data) => {
            if (err) res.status(500).json({
                mensaje: "Lo sentimos  cliente " + req.params.id + " ha surgido un problema y no podemos mostrar el informe gerencial de los riesgos de lavado de activos," +
                    "puede se un problema nuestro o revisa que existan riesgos guardaos. Disculpa por las molestias "
            });
            else res.send(data)
        });
}