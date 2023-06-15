const express = require("express");
const { cadastro, login } = require("./controladores/usuarios");
const { cadastrarAnimal, atualizarAnimal, listarAnimais, detalharAnimal, excluirAnimal } = require("./controladores/animais");
const verificaLogin = require("./intermediarios/verificaLogin");

const rotas = express();

rotas.post("/usuario", cadastro )
rotas.post("/login", login )

rotas.use(verificaLogin)
rotas.post("/animal", cadastrarAnimal )
rotas.put("/animal/:id", atualizarAnimal )
rotas.get("/animal", listarAnimais )
rotas.get("/animal/:id", detalharAnimal )
rotas.delete("/animal/:id", excluirAnimal )


module.exports = rotas