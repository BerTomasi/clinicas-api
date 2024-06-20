const { pool } = require('../config');

const getClinica = (request, response) => {
    pool.query('SELECT * FROM clinica ORDER BY codigo',
        (error, results) => {
            if (error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar a clínica: ' + error
                })
            }
            response.status(200).json(results.rows);
        }
    )
}

const addClinica = (request, response) => {
    const {nome, cep, numpredio, telefone, descricao} = request.body;
    pool.query(`INSERT INTO clinica (nome, cep, numpredio, telefone, descricao) 
    VALUES ($1, $2, $3, $4, $5) RETURNING codigo, nome, cep, numpredio, telefone, descricao`,
    [nome, cep, numpredio, telefone, descricao], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao inserir a clínica: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Clínica criada", 
            objeto : results.rows[0]
        })
    })
}

const updateClinica = (request, response) => {
    const {codigo, nome, cep, numpredio, telefone, descricao } = request.body;
    pool.query(`UPDATE clinica 
    SET nome=$1, cep=$2, numpredio=$3, telefone=$4, descricao=$5
    WHERE codigo=$6 
    RETURNING codigo, nome, cep, numpredio, telefone, descricao`,
    [nome, cep, numpredio, telefone, descricao, codigo], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar a clínica: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Clínica alterada", 
            objeto : results.rows[0]
        })
    })
}

const deleteClinica = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM clinica WHERE codigo = $1`,[codigo], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover a clínica: ' +
                 (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Clínica removida"
        })
    })
}

const getClinicaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM clinica WHERE codigo = $1`,[codigo], 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar a clínica: ' +
                 (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports =  { getClinica, addClinica, updateClinica, deleteClinica,
    getClinicaPorCodigo}