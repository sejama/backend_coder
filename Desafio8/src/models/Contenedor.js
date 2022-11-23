//import { fs } from 'fs'
const fs = require('fs')
const { mysql, sqlite3 } = require('../config/index.js')

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = `./src/database/${nombreArchivo}.txt`;
        this.contadorId = 0;
        this.contenido = [];
        this.leer();
        
        mysql.schema.hasTable('product')
            .then((exists) => {
                if (!exists) {
                    mysql.schema.createTable('product', table => {
                        table.increments('id').primary();
                        table.string('title')
                        table.integer('price')
                        table.string('thumbnail')                        
                    })
                    .then(() => console.log('Tabla creada'))
                    .catch(err => { console.log(err) })
                    .finally(() => mysql.destroy())
                }
            })  
        sqlite3.schema.hasTable('message')
            .then((exists) => {
                if (!exists) {
                    sqlite3.schema.createTable('message', table => {
                        table.increments('id')
                        table.string('correo')
                        table.string('mensaje')
                        table.string('createdAt')                        
                    })
                    .then(() => console.log('Tabla creada'))
                    .catch(err => { console.log(err) })
                    .finally(() => sqlite3.destroy())
                }
            })              
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
        if(object.title){
            mysql('product').insert({
                'title': object.title,
                'price': object.price,
                'thumbnail': object.thumbnail
                })
            .then(id => console.log('Producto agregado a la BD con el ID: ',id))
            .catch(err => { console.log(err); })
        }
        if(object.correo){
            sqlite3('message').insert({
                'correo': object.correo,
                'mensaje': object.mensaje,
                'createdAt': object.createdAt
                })
            .then(id => console.log('Mensaje agregado a la BD con el ID: ',id))
            .catch(err => { console.log(err); })
        }        
        return `El id del objeto es: ${this.contadorId}.`
    }

    getAll() {
        mysql.from('product').select('*')
	        .then(rows => {
                console.log("--------------PRODUCTOS------------")
		        rows.forEach(row => {
                    console.log(`${row['id']} ${row['title']} ${row['price']} ${row['thumbnail']}`);
                    });
	        })
	        .catch(err => console.log(err))
    
            sqlite3.from('message').select('*')
	        .then(rows => {
                console.log("--------------MENSAJES------------")
		        rows.forEach(row => {
                    console.log(`${row['id']} ${row['correo']} ${row['createdAt']} ${row['mensaje']}`);
                    });
	        })
	        .catch(err => console.log(err))
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
                return resultado = -1
            }else{
                this.contenido.splice(foundElementIndex,1)
                this.escribir()
                return resultado = `El producto fue eliminado!`
            }
        } else {
            return resultado = -1
        }
    }
    
    async deleteAll() {
        this.contenido = []
        this.escribir()
    }

    async update(id, obj) {
        const index = this.contenido.findIndex(objT => objT.id == id)
        if(index === -1) {
            return {error: 'Producto no encontrado'}
        }else{
            //this.contenido[index] = {...this.contenido[index],...obj}
            obj.id = id
            this.contenido[index] = obj
            return this.contenido[index]
        }
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
//export { Contenedor }
module.exports = Contenedor;