const transferenciasService = require('../../src/services/transferenciasService');

async function realizarTransferencia(req, res, next) {
    const { contaOrigem, contaDestino, valor, token } = req.body;

    try {
        const result = await transferenciasService.realizarTransferencia(contaOrigem, contaDestino, valor, token);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function getTransferencias(req, res, next) {
    const { page, limit } = req.query;

    try {
        const result = await transferenciasService.getTransferencias(page, limit);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    realizarTransferencia,
    getTransferencias,
};
