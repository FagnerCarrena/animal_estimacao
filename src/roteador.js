const express = require("express");
const { cadastro, login } = require("./controladores/usuarios");
const { cadastrarAnimal, atualizarAnimal, listarAnimais, detalharAnimal, excluirAnimal } = require("./controladores/animais");
const verificaLogin = require("./intermediarios/verificaLogin");
const validarCorpoRequisicao = require("./intermediarios/validarCorpoRequisicao");
const schemaUsuario = require("./validacoes/schemaUsuario");
const schemaLogin = require("./validacoes/schemaLogin");
const schemaAnimal = require("./validacoes/schemaAnimal");

const rotas = express();


rotas.post('/', validarCorpoRequisicao(schemaUsuario),cadastro)

rotas.post("/login", validarCorpoRequisicao(schemaLogin),login )



rotas.use(verificaLogin)
rotas.post("/animal", validarCorpoRequisicao(schemaAnimal),cadastrarAnimal )
rotas.put("/animal/:id", validarCorpoRequisicao(schemaAnimal),atualizarAnimal )
rotas.get("/animal", listarAnimais )
rotas.get("/animal/:id", detalharAnimal )
rotas.delete("/animal/:id", excluirAnimal )


module.exports = rotas