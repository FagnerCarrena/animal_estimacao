const express = require("express");
const { cadastro, login } = require("./controladores/usuarios");

const rotas = express();

rotas.post("/usuario", cadastro )
rotas.post("/login", login )


module.exports = rotas