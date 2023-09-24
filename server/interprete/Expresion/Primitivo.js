const Dato = require("../Interface/Dato.js");
const Error = require("../Interface/Error.js");
const Instruccion = require("../Interface/Instruccion.js");
const Tipo = require("../Interface/Tipos.js")

class Primitvo extends Instruccion {
    constructor (valor, tipo, linea, columna){
        super();
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.tipo = tipo;
    }

    interpretar(entorno, lista_errores){
        switch(this.tipo){
            case 'ENTERO':
                return new Dato(Number(this.valor), Tipo.ENTERO, this.linea, this.columna);
            case 'DECIMAL':
                return new Dato(Number(this.valor), Tipo.DECIMAL, this.linea, this.columna);
            case 'CADENA':
                return new Dato(this.valor.split('"')[1], Tipo.CADENA, this.linea, this.columna);
            default:
                console.log("SE RECIBIÓ VALOR POSIBLEMENTE NULO");
                lista_errores.push(new Error('Error por tipo de dato nulo o no reconocible', 'Semántico', this.linea, this.columna))
                return new Dato('null', Tipo.NULO, this.linea, this.columna);
        }
    }
}

module.exports = Primitvo;