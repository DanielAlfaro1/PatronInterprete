const Dato = require("../Interface/Dato.js");
const Error = require("../Interface/Error.js");
const Instruccion = require("../Interface/Instruccion.js");
const Operador = require("../Interface/Operador.js");
const Tipo = require("../Interface/Tipos.js");

class Expresion extends Instruccion {
    constructor (OpIzq, OpDer, operador, unario, linea, columna){
        super();
        this.OpIzq = OpIzq;
        this.OpDer = OpDer;
        this.unario = unario;
        this.linea = linea;
        this.columna = columna;
        if (operador == 'SUMA'){
            this.Operador = Operador.SUMA;
        } else if (operador == 'RESTA'){
            this.Operador = Operador.RESTA;
        } else if (operador == 'MULTIP'){
            this.Operador = Operador.MULTIP;
        } else if (operador == 'DIVISION'){
            this.Operador = Operador.DIVISION;
        } else {
            this.Operador = null;
        }
    }

    interpretar(entorno, lista_errores){
        var OpDerecho;
        var OpIzquierdo;
        
        OpIzquierdo = this.OpIzq.interpretar(entorno, lista_errores);
        if (!this.unario){
            OpDerecho = this.OpDer.interpretar(entorno, lista_errores);
        }

        switch(this.Operador){
            case Operador.SUMA:
                if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.ENTERO){
                    var resultado = OpIzquierdo.valor + OpDerecho.valor;
                    var tipoDato = Tipo.ENTERO;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.DECIMAL){
                    var resultado = OpIzquierdo.valor + OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if(OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.ENTERO){
                    var resultado = OpIzquierdo.valor + OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if (OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.DECIMAL){
                    var resultado = OpIzquierdo.valor + OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else {
                    lista_errores.push(new Error('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede sumar con Tipo: '+OpDerecho.tipo, 'Semántico', this.linea, this.columna));
                    return new Dato('null', Tipo.NULO, this.linea, this.columna);
                }
                break;
            case Operador.RESTA:
                if (this.unario){
                    if (OpIzquierdo.tipo == Tipo.ENTERO || OpIzquierdo.tipo == Tipo.DECIMAL){
                        resultado = OpIzquierdo.valor*-1;
                        tipoDato = OpIzquierdo.tipo;
                        linea = this.linea;
                        columna = this.columna
                        return new Dato(resultado, tipoDato, linea, columna);
                    } else {
                        lista_errores.push(new Error('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede negar', 'Semántico', this.linea, this.columna));
                        return new Dato('null', Tipo.NULO, this.linea, this.columna);
                    }
                } else {
                    if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.ENTERO){
                        var resultado = OpIzquierdo.valor - OpDerecho.valor;
                        var tipoDato = Tipo.ENTERO;
                        var linea = this.linea;
                        var columna = this.columna;
                        return new Dato(resultado, tipoDato, linea, columna);
                    } else if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.DECIMAL){
                        var resultado = OpIzquierdo.valor - OpDerecho.valor;
                        var tipoDato = Tipo.DECIMAL;
                        var linea = this.linea;
                        var columna = this.columna;
                        return new Dato(resultado, tipoDato, linea, columna);
                    } else if(OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.ENTERO){
                        var resultado = OpIzquierdo.valor - OpDerecho.valor;
                        var tipoDato = Tipo.DECIMAL;
                        var linea = this.linea;
                        var columna = this.columna;
                        return new Dato(resultado, tipoDato, linea, columna);
                    } else if (OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.DECIMAL){
                        var resultado = OpIzquierdo.valor - OpDerecho.valor;
                        var tipoDato = Tipo.DECIMAL;
                        var linea = this.linea;
                        var columna = this.columna;
                        return new Dato(resultado, tipoDato, linea, columna);
                    } else {
                        lista_errores.push(new Error('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede restar con Tipo: '+OpDerecho.tipo, 'Semántico', this.linea, this.columna));
                        return new Dato('null', Tipo.NULO, this.linea, this.columna);
                    }
                    break;
                }
                break;
            case Operador.MULTIP:
                if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.ENTERO){
                    var resultado = OpIzquierdo.valor * OpDerecho.valor;
                    var tipoDato = Tipo.ENTERO;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.DECIMAL){
                    var resultado = OpIzquierdo.valor * OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if(OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.ENTERO){
                    var resultado = OpIzquierdo.valor * OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if (OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.DECIMAL){
                    var resultado = OpIzquierdo.valor * OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else {
                    lista_errores.push(new Error('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede multiplicar con Tipo: '+OpDerecho.tipo, 'Semántico', this.linea, this.columna));
                    return new Dato('null', Tipo.NULO, this.linea, this.columna);
                }
                break;
            case Operador.DIVISION:
                if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.ENTERO){
                    var resultado = OpIzquierdo.valor / OpDerecho.valor;
                    var tipoDato = Tipo.ENTERO;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if (OpIzquierdo.tipo == Tipo.ENTERO && OpDerecho.tipo == Tipo.DECIMAL){
                    var resultado = OpIzquierdo.valor / OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if(OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.ENTERO){
                    var resultado = OpIzquierdo.valor / OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else if (OpIzquierdo.tipo == Tipo.DECIMAL && OpDerecho.tipo == Tipo.DECIMAL){
                    var resultado = OpIzquierdo.valor / OpDerecho.valor;
                    var tipoDato = Tipo.DECIMAL;
                    var linea = this.linea;
                    var columna = this.columna;
                    return new Dato(resultado, tipoDato, linea, columna);
                } else {
                    lista_errores.push(new Error('Error: El tipo de dato: '+OpIzquierdo.tipo+ ' no se puede dividir con Tipo: '+OpDerecho.tipo, 'Semántico', this.linea, this.columna));
                    return new Dato('null', Tipo.NULO, this.linea, this.columna);
                }
                break;
            default:
                console.log("Error: OPERADOR DESCONOCIDO")
                break;
        }
    }
}

module.exports = Expresion;