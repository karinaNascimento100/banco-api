const db = require('./db');

async function inserirTransferencia(contaOrigem, contaDestino, valor, autenticada) {
    await db.query(
        'INSERT INTO transferencias (conta_origem_id, conta_destino_id, valor, autenticada) VALUES (?, ?, ?, ?)',
        [contaOrigem, contaDestino, valor, autenticada]
    );
}

async function getTransferenciasPaginadas(limit, offset) {
    const [result] = await db.query(
        'SELECT transferencias.*, origem.titular AS titular_origem, destino.titular AS titular_destino FROM transferencias JOIN contas AS origem ON transferencias.conta_origem_id = origem.id JOIN contas AS destino ON transferencias.conta_destino_id = destino.id ORDER BY transferencias.id DESC LIMIT ? OFFSET ?',
        [parseInt(limit), parseInt(offset)]
    );
    return result;
}

async function getTotalTransferencias() {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM transferencias');
    return total;
}

module.exports = { 
    inserirTransferencia, 
    getTransferenciasPaginadas, 
    getTotalTransferencias 
};