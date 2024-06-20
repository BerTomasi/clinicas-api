const { pool } = require('../config');
const { request, response } = require("express");

const getMedico = (request, response) => {
    pool.query(`select m.codigo as codigo, 
        m.cpf as cpf,
        m.crm as crm,
        m. nome as nome,
        m.especialidade as especialidade,
        m.telefone as telefone,
        m.clinica as clinica,
        c.nome as nomeclinica
        from medico m
        join clinica c on m.clinica = c.codigo
        order by m.codigo`,
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao consultar os médicos: ' + error
                });
            }
            response.status(200).json(results.rows);
        })
}

const addMedico = (request, response) => {
    const { cpf, crm, nome, especialidade, telefone, clinica } = request.body;
    pool.query(`insert into medico (cpf, crm, nome, especialidade, telefone, clinica) 
    values ($1, $2, $3, $4, $5, $6)
    returning codigo, cpf, crm, nome, especialidade, telefone, clinica`,
        [cpf, crm, nome, especialidade, telefone, clinica],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao inserir o médico!'
                });
            }
            response.status(200).json({
                status: 'success', message: "Médico criado!",
                objeto: results.rows[0]
            });
        })
}

const updateMedico = (request, response) => {
    const { codigo, cpf, crm, nome, especialidade, telefone, clinica } = request.body;
    pool.query(`UPDATE medico
	SET cpf=$1, crm=$2, nome=$3, especialidade=$4, telefone=$5, clinica=$6
	WHERE codigo=$7
returning codigo, cpf, crm, nome, especialidade, telefone, clinica`,
        [cpf, crm, nome, especialidade, telefone, clinica, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao atualizar o médico!'
                });
            }
            response.status(200).json({
                status: 'success', message: "Médico atualizado!",
                objeto: results.rows[0]
            });
        })
}


const deleteMedico = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM medico WHERE codigo=$1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao remover o médico! ' + (error ? error : '')
                });
            }
            response.status(200).json({
                status: 'success', message: "Médico removido!"
            });
        })
}

const getMedicoPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM medico WHERE codigo=$1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao recuperar o médico!'
                });
            }
            response.status(200).json(results.rows[0]);
        })
}

module.exports = {
    getMedico, addMedico, updateMedico, deleteMedico,
    getMedicoPorCodigo
}