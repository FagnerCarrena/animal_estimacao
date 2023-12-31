const jwt = require("jsonwebtoken");
const pool = require("../conexao")
const senhajwt = require("../../senhajwt");


const verificaLogin = async( req, res, next) => {
const {authorization} = req.headers;

if(!authorization){
return res.status(401).json({mensagem: "Falta o Autorização"})

}

const token = authorization.split(' ')[1]
try {
  
    

const {id} = jwt.verify(token, senhajwt)



const {rows, rowCount} = await pool.query('select * from usuarios where id = $1', [id])


if(rowCount === 0){
    return res.status(401).json({mensagem: "Não AAutorizado"})
}

const {senha, ...usuario} = rows[0]

req.usuario = usuario;
//criou uma nova requisicao chamada req.usuario

next()

    
} catch (error) {
    return res.status(401).json(error.message)
}


}

module.exports = verificaLogin;