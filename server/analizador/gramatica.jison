
// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
entero  [0-9]+;
cadena \"([A-Za-z0-9])+\"
//cadena \"([.])+\";


%%
// -----> Reglas Lexicas
'('          {return 'PARIZQ'}
')'          {return 'PARDER'}
';'          {return 'PYC'}
'+'          {return 'SUMA'}
'-'          {return 'RESTA'}
'/'          {return 'DIVISION'}
'*'          {return 'MULTIP'}
'mostrar'    {return 'MOSTRAR'}
[0-9]+("."[0-9]+)\b {return 'DECIMAL'}


{entero}                 { return 'ENTERO'; } 
{cadena}                 { return 'CADENA';}

// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}

// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
%{
    const Dato = require('../interprete/expresiones/Dato.js');
    const Mostrar = require('../interprete/instrucciones/Mostrar.js');
    const Primitivo = require('../interprete/Expresion/Primitivo.js');
    const Expresion = require('../interprete/Expresion/Expresion.js');
%}


// -------> Precedencia

%left 'SUMA' 'RESTA'
%left 'MULTIP' 'DIVISION'
%left UMINUS


// -------> Simbolo Inicial
%start inicio


%% // ------> Gramatica

inicio
	: lista_instrucciones EOF {$$ = $1; return $$;}
;

lista_instrucciones
    : lista_instrucciones instruccion  {$$ = $1; $$.push($2);}
    | instruccion  {$$ = []; $$.push($1)}
;

instruccion
	: MOSTRAR PARIZQ expresion PARDER PYC   {$$ = new Mostrar($3, this._$.first_line, this._$.first_column) }
	| error PYC	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;

expresion
    : expresion SUMA expresion      {$$ = new Expresion($1, $3, 'SUMA', false, this._$.first_line, this._$.first_column);}
    | expresion RESTA expresion     {$$ = new Expresion($1, $3, 'RESTA', false, this._$.first_line, this._$.first_column);}
    | expresion MULTIP expresion    {$$ = new Expresion($1, $3, 'MULTIP', false, this._$.first_line, this._$.first_column);}
    | expresion DIVISION expresion  {$$ = new Expresion($1, $3, 'DIVISION', false, this._$.first_line, this._$.first_column);}
    | RESTA expresion %prec UMINUS  {$$ = new Expresion($2, null, 'RESTA', true, this._$.first_line, this._$.first_column);}
    | ENTERO	{$$ = new Primitivo($1, 'ENTERO', this._$.first_line, this._$.first_column)}
    | DECIMAL   {$$ = new Primitivo($1, 'DECIMAL', this._$.first_line, this._$.first_column)}
    | CADENA    {$$ = new Primitivo($1, 'CADENA', this._$.first_line, this._$.first_column)}
;