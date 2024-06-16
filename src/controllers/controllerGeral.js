// const knex = require('../db/connection')
const pool = require('../db/connection')
const fs = require('fs');
const axios = require('axios')

// import { create } from 'axios';

//pegar id_ente
//montar url
//fazer requisição
//armazenar dados no banco

const preurl = 'https://apidatalake.tesouro.gov.br/ords/siconfi/tt/msc_patrimonial?'

const idTv              = ['beggining_balance', 'ending_balance', 'period_change']
const me_referência     = ['1','2','3','4','5','6','7','8','9','10','11','12']    
const classe_conta      = ['1','2','3','4']

let id = 0                      //id no banco


const listar = async (req, res) => {
    try {
        const { rows: [{ count }] } = await pool.query('SELECT COUNT(id) FROM entes');
        
        for (let index = 0; index < count; index++) {
            
            const { rows: [{ id_ente }] } = await pool.query('SELECT id_ente FROM entes ORDER BY id LIMIT 1')
            
            //exclui o id do banco, do registro utilizado.
            const deleteQuery = await pool.query(`DELETE FROM entes WHERE id = (SELECT id FROM entes ORDER BY id LIMIT 1);`);

            idTv.forEach(x => {
                me_referência.forEach(mes => {
                    classe_conta.forEach(async conta => {
                        
                        let url = `${preurl}/id_ente=${id_ente}&an_referencia=2022&me_referencia=${mes}&co_tipo_matriz=MSCC&classe_conta=${conta}&id_tv=${x}` 
                        
                        const insertQuery = 'INSERT INTO url (url) VALUES ($1)';
                        await pool.query(insertQuery, [url]);
                        console.log(`${index} de ${count}`)
                    });
                });
            });   
        }

    } catch (error) {
        return console.log('\n\n\t-- Erro --\n\n' , error)
    }
    
    return res.status(200).json("Dados estão sendo coletados. Verifique se há erros.");
}

const usarUrls = async (req, res) => {

    let urls = ['https://apidatalake.tesouro.gov.br/ords/siconfi/tt/msc_patrimonial?/id_ente=111110100&an_referencia=2022&me_referencia=1&co_tipo_matriz=MSCC&classe_conta=1&id_tv=beggining_balance'];

    //fazer requisição com as urls do banco de dados
    // 1 requisição por segundo

    //consulta no banco: pegar a primeira url e armazenar numa variável.
        // usar a mesma variável no 'axios.get'
        // excluir url do banco
        // passar 'res' no 'fs.appendFile', escrevendo a 'res' no arquivo 'dados.txt'.

    try {
        const response = await axios.get(urls[0]);
        console.log('Data from url base: ', response.data);
    } catch (error) {
        console.error(`Error fetching data from urls: `, error.message);
    }

    //armazenar resposta da api
    fs.appendFile('dados.txt', 'Hello, World!\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Arquivo salvo com sucesso!');
        }
    });

    return res.status(200).json("Dados estão sendo escritos no arquivo \'dados.txt\'. Verifique se há erros.");   

}

module.exports = {
    listar,
    usarUrls
};
