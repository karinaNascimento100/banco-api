const db = require('./db');

async function getContaById(id) {
    const [result] = await db.query('SELECT saldo, ativa FROM contas WHERE id = ?', [id]);
    return result[0];
}

async function atualizarSaldo(id, valor) {
    await db.query('UPDATE contas SET saldo = saldo + ? WHERE id = ?', [valor, id]);
}

module.exports = { 
    getContaById, 
    atualizarSaldo 
};