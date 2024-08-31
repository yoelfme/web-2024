// Funciones en JavaScript
function miFuncion(parametro1, parametro2) {
    console.log(`El parametro 1 es ${parametro1}`)
    console.log(`El parametro 2 es ${parametro2}`)

    return parametro1 * parametro2
}

// Funcion como valor
const miFuncion2 = function (operador1, operador2) {
    return operador1 * operador2;
}
// Funciones flecha (Funcion como valor)
let miFunction3 = (parametro1, parametro2) => {
   return parametro1 + parametro2
}


const calculadora = (operador) => {
    switch (operador) {
        case '+':
            return (parametro1, parametro2) => parametro1 + parametro2
        case '-':
            return (parametro1, parametro2) => parametro1 - parametro2
    }
}

function square(x) { 
    return x * x; 
}
// console.log(square(4, true, "erizo"));

// function suma(operando1, operando2) {
//     console.log(operando2)
//     return operando1 + operando2;
// }

// console.log(suma(1))
function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
}

// Valor por default
function suma(a, b = 0) {
    return a + b;
}

console.log(suma(1))