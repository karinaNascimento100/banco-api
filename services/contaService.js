const createError = require('http-errors');
const contasModel = require('../models/contasModel');

async function getContas(page = 1, limit = 10) {
    const contas = await contasModel.getContas();

    return {
        contas
    };
}

module.exports = {
    getContas
};
