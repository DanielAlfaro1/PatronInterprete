const Error = require('../Interface/Error.js');
const Instruccion = require('../Interface/Instruccion.js');
const Tipo = require('../Interface/Tipos.js');

class Mostrar extends Instruccion{
    constructor(expresion, linea, columna){
        super();
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno, lista_errores){
        let valor = this.expresion.interpretar(entorno, lista_errores);
        if (valor.tipo == Tipo.NULO){
            lista_errores.push(new Error('Error No se puede mostrar dato NULO', 'Semántico', this.linea, this.columna))
            return 'Null';
        } else {
            console.log(valor.valor.toString());
            return valor.valor.toString();
        }
    }

    getArbol(){

    }
}

module.exports = Mostrar;