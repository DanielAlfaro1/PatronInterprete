const parser = require("../analizador/Parser.js")


const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) => {
    const {entrada} = req.body;
    const resultado = parser.parse(entrada);
    var lista_errores = [];
    resultado.forEach(element => {
        element.interpretar(null, lista_errores);
    });
    
    lista_errores.forEach(errorcito =>{
        console.log(errorcito.imprimir());
    })

    res.status(200).json({
        message: 'Analisis Realizado', 
        entrada: entrada
    });
}


module.exports = {
    index,
    analizar
}