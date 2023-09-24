class Error{
    constructor(evento, tipo, linea, columna){
        this.evento = evento;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    imprimir(){
        return {"Evento": this.evento, "Tipo": this.tipo, "Linea": this.linea, "Columna": this.columna}
    }
}

module.exports = Error;