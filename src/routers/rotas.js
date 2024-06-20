const { Router } = require('express');

const controleClinicas = require('../controllers/clinicasController');
const controleMedicos = require("../controllers/medicosController");
const { login } = require('../controllers/segurancaController');
const { verificaJWT } = require('../controllers/segurancaController');
const { getBemVindo } = require('../controllers/comumController');

const rotas = new Router();

rotas.route('/')
   .get(getBemVindo)

rotas.route("/login")
   .post(login)

rotas.route('/clinicas')
   .get(controleClinicas.getClinica)
   .post(verificaJWT, controleClinicas.addClinica)
   .put(verificaJWT, controleClinicas.updateClinica)

rotas.route('/clinicas/:codigo')
   .delete(verificaJWT, controleClinicas.deleteClinica)
   .get(verificaJWT, controleClinicas.getClinicaPorCodigo)


rotas.route('/medicos')
   .get(controleMedicos.getMedico)
   .post(verificaJWT, controleMedicos.addMedico)
   .put(verificaJWT, controleMedicos.updateMedico)

rotas.route('/medicos/:codigo')
   .get(verificaJWT, controleMedicos.getMedicoPorCodigo)
   .delete(verificaJWT, controleMedicos.deleteMedico)

module.exports = rotas;