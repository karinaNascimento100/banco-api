const contaService = require('../../src/services/contaService');

async function getContas(req, res, next) {
    try {
        const result = await contaService.getContas();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getContas
};
