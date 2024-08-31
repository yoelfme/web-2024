const listado = [2, 4, 5, 6, 7];

// console.log(listado[0])
// console.log(listado[3 - 2])

const indice = 3
// console.log(listado[indice])

// console.log('tamaño de lista:', listado.length)

// Objetos
const estudiante1 = {
    // llave (nombre de propieda): valor (int, array, string, object, function)
    nombre: 'Yoel',
    apellido: 'Monzon',
    edad: 29,
    altura: 183    
}

// console.log(typeof estudiante1)
// console.log(typeof estudiante1.nombre)
// console.log(typeof estudiante1.edad)

// const llave = 'nombre2'
const numerosPares = [2, 4, 6, 8, 4]

console.log(numerosPares.includes(2))
console.log(numerosPares.slice(0, 3))
console.log(numerosPares.indexOf(4))
console.log(numerosPares.lastIndexOf(4))

const matrix = [
    [1, 2, 3],
    [3, 4, 5],
    [5, 6, 7]
]

console.log()

// console.log(estudiante1.nombre)
// console.log(estudiante1[llave])
// for (llave in estudiante1) {
//     console.log(`La propiedad ${llave} tiene como valor ${estudiante1[llave]}`)
// }

const lista = [10, 20, 24, 34]

// For estilo C
for (let i = 0; i < lista.length; i++) {
    const elemento = lista[i]
    // console.log(`El elemento en el indice ${i} es ${elemento}`)
}

// For...of
for (elemento of lista) {
    // console.log(`El elemento es: ${elemento}`)
}

// For...each
const impresora = function (value, index) {
    // console.log(`El elemento en el indice ${index} es ${value}`)
}
lista.forEach(impresora)

// console.log(Object.keys(estudiante1))
// console.log(Object.values(estudiante1))

// for (llave in estudiante1) {
//     console.log(llave)
// }

// const estudiante2 = Object.assign({}, estudiante1)
// estudiante2.nombre = 'Juan'

// console.log(`El nombre del estudiante 1 es: ${estudiante1.nombre}`)
// console.log(`El nombre del estudiante 2 es: ${estudiante2.nombre}`)

// console.log(estudiante.apellido)
// delete estudiante.apellido
// console.log(estudiante.apellido)
// console.log(estudiante.peso)

// if (estudiante.hasOwnProperty('apellido')) {
//     console.log(`El apellido es ${estudiante.apellido}`)
// } else {
//     console.log(`No tiene apellido`)
// }

let counter = (sentence, search) => {
    let words = sentence.split(' ')
    let times = 0

    for (let word of words) {
        if (word === search) {
            times++;
        }
    }
    return times
}
console.log(counter('Anita lava la tina en la cocina', 'la'))
console.log(counter('Mi mama me mima', 'mama'))

// console.log(`La palabra '${search}' occure ${times} veces`)

// let sentence = "Secretarybirds specialize in stomping";
// let words = sentence.split(" ");
// console.log(words);
// console.log(words.join(","));