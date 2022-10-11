const fs = require('fs')

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = `./src/archivos/${nombreArchivo}.txt`;
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
                this.contenido.splice(foundElementIndex,1)
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

    async update(id, obj) {
        const index = this.contenido.findIndex(objT => objT.id == id)
        obj.id = id
        this.contenido[index] = obj
        return obj
      }
}

/*const archivo = new Contenedor('productos.txt');
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
//console.log("Mostramos Todos: ",archivo.getAll());
//console.log("Eliminamos todos los productros", archivo.deleteAll());
//console.log("Mostramos Todos: ",archivo.getAll());
*/
module.exports = Contenedor