const express = require('express');
const contaController = require('../controllers/contaController');
const autenticarToken = require('../middleware/autenticarToken');

const router = express.Router();

router.get('/', autenticarToken, contaController.getContas);

module.exports = router;