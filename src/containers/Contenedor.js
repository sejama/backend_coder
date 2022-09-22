import fs from 'fs';

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = `./${nombreArchivo}`;
        this.contadorId = 0;
        this.contenido = [];
        this.leer();
    }
    async leer() {
        try {
            const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            this.contenido = JSON.parse(archivo)
            for (const elemento of this.contenido) {
                if (elemento.id > this.contadorId) this.contadorId = elemento.id
              }
        } catch (error) {
            if(error.code === 'ENOENT'){
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([],null, 3));
            }
            console.log(`Error en cargar el archivo ${this.nombreArchivo}` , error)
        }
    }

    async escribir() {
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.contenido,null,3));
        }catch (error){
            console.log(`Error en escribir el archivo` ,error)
        }
    }
        
    save(object) {
        this.contadorId++
        object['id'] = this.contadorId
        this.contenido.push(object)
        this.escribir()
        return `El id del objeto es: ${this.contadorId}.`
    }

    getAll() {
        return this.contenido
    }
    
    getById(id) {
        let resultado
        if (this.contenido !== []) {
            resultado = this.contenido.find(x => x.id === id)
            if (resultado === undefined) {
                resultado = null
            }
        } else {
            resultado = 'El archivo está vacío'
        }
        return resultado
    }

    deleteById(id) {
        let resultado
        if (this.contenido !== []) {
            //let newContentenido = this.contenido.filter(x => x.id !== id)
            //this.contenido = newContentenido
            //this.escribir()
            const foundElementIndex = this.contenido.findIndex((elemento) => elemento.id === id)
            
            if (foundElementIndex === -1){
                resultado = `El producto no se encontro!`
            }else{
                this.contenido = foundElement.splice(foundElementIndex,1)
                this.escribir()
            }
            resultado = `El producto fue eliminado!`
        } else {
            resultado = `El archivo está vacío!`
        }
        return resultado
    }
    
    async deleteAll() {
        this.contenido = []
        this.escribir()
    }
}

const archivo = new Contenedor('productos.txt');
console.log(archivo.getAll());
console.log(archivo.save({
        'title': 'Escuadra',
        'price': 123.45,
        'thumbnail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        }));
console.log(archivo.save({
        'title': 'Calculadora',
        'price': 234.56,
        'thumbnail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        }));
console.log(archivo.save({
        'title': 'Globo Terráqueo',
        'price': 345.67,
        'thumbnail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        }));
console.log("Mostramos Todos: ",archivo.getAll());
console.log("Mostramois el productro id = 2 ", archivo.getById(2));
console.log("Eliminamos el productro id = 2 ", archivo.deleteById(2));
console.log("Mostramos Todos: ",archivo.getAll());
console.log("Eliminamos todos los productros", archivo.deleteAll());
console.log("Mostramos Todos: ",archivo.getAll());



/*
>> Consigna:Implementar programa que contenga una clase llamada Contenedor que reciba el 
nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
● save(Object): Number- Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
● getById(Number): Object- Recibe un id y devuelve el objeto con ese id, o null si no está.
● getAll(): Object[]- Devuelve un array con los objetos presentes en el archivo.
● deleteById(Number): void- Elimina del archivo el objeto con el id buscado.
● deleteAll(): void- Elimina todos los objetos presentes en el archivo.

Sugerencia: usar un archivo para la clase y otro de test, que la importe
>> Aspectos a incluir en el entregable:
- El método saveincorporará al producto un id numérico, que deberá ser siempre uno más que el id 
del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
- Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
- Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con 
async/await y manejo de errores.
- Probar el módulo creando un contenedor de productos, que se guarde en el archivo: 
“productos.txt”
- Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para 
verificar el correcto funcionamiento del módulo construído. 
- El formato de cada producto será : 
{
title: (nombre del producto),
price: (precio),
thumbnail: (url de la foto del producto)
}

>> Ejemplo:
Contenido de "productos.txt" con 3 productos almacenados 
 [
{
title: 'Escuadra',
price: 123.45,
thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
id: 1
},
{
title: 'Calculadora',
price: 234.56,
thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
id: 2
},
{
title: 'Globo Terráqueo',
price: 345.67,
thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
id: 3
}
] 
*/