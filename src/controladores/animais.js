const pool = require("../conexao")


const cadastrarAnimal = async (req, res) => {
const{nome, tipo,  apelido} = req.body;

if(!nome || !tipo || !apelido){
return res.status(400).json({mensagem: "Dados obrigatórios"})
}

console.log(req.body)

try {
    const query = ` insert into animal (usuario_id, nome, tipo, apelido )
    values ($1, $2, $3, $4) returning * `
              
    const params = [req.usuario.id, nome,  tipo, apelido]
    
    const { rows } = await pool.query(query, params)
   

    return res.status(201).json(rows[0])

} catch (error) {
    return res.status(500).json(error.message)
}

}
const atualizarAnimal = async (req, res) => {
    const{nome, tipo,  apelido} = req.body;
	const { id } = req.params

    if(!nome & !tipo & !apelido){
return res.json({mensagem: "Falta dados"})
    }

    

    try {
        const { rowCount } = await pool.query(
			'select * from animal where id = $1 and usuario_id = $2',
			[id, req.usuario.id])

            if (rowCount === 0) {
                return res.status(404).json({ mensagem: 'Animal não existe' })
            }
            const queryAtualizaAnimal = 'update animal set nome = $1, tipo = $2, apelido = $3  where id = $4'
            await pool.query(queryAtualizaAnimal, [nome, tipo, apelido || "meuPet", id])

            return res.status(204).send()
        
    } catch (error) {
        return res.status(500).json(error.message)
    }

}
const listarAnimais = async (req, res) =>{
    try {
        const {rows: animais} = await pool.query(
            "select id, nome, tipo, apelido from animal where usuario_id = $1", [req.usuario.id]
        )
    
        return res.json(animais)
    } catch (error) {
        return res.status(500).json(error.message)
    }
    
    } 
    const detalharAnimal = async(req, res) =>{
        const { id } = req.params
    
        try {
            const { rows, rowCount } = await pool.query(
                "select id, nome, tipo, apelido from animal where id = $1 and usuario_id = $2",
                [id, req.usuario.id]
            )
    
            if (rowCount === 0) {
                return res.status(404).json({ mensagem: 'Animal não existe' })
            }
    
    
            const animal = rows[0]
            
           
    
            return res.json(animal)
        
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    const excluirAnimal = async (req, res) =>{
        const { id } = req.params
    
        try {
            const { rows, rowCount } = await pool.query(
                "select id, nome, tipo, apelido from animal where id = $1 and usuario_id = $2",
                [id, req.usuario.id]
            )
    
            if (rowCount === 0) {
                return res.status(404).json({ mensagem: 'Animal não existe' })
            }
             
            await pool.query("delete from animal where id = $1", [id])
            return res.status(204).send()
        
        } catch (error) {
            return res.status(500).json(error.message)
        }
    
    } 

module.exports ={
cadastrarAnimal,
atualizarAnimal,
listarAnimais,
detalharAnimal,
excluirAnimal

}