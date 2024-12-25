const express = require('express');
const transferenciaController = require('../controllers/transferenciaController');
const autenticarToken = require('../middleware/autenticarToken');

const router = express.Router();

router.post('/', autenticarToken, transferenciaController.realizarTransferencia);
router.get('/', autenticarToken, transferenciaController.getTransferencias);

module.exports = router;