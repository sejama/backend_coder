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
//console.log("Mostramos Todos: ",archivo.getAll());
//console.log("Eliminamos todos los productros", archivo.deleteAll());
//console.log("Mostramos Todos: ",archivo.getAll());



/*
import fs from "fs";

// sin usar el type module en el package json usamos lo siguiente:
// const fs = require("fs");

class Container {
  constructor(fileName) {
    this.filePath = `./src/db/${fileName}.json`;
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, "utf8");
      const elements = JSON.parse(file);

      return elements;
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        return [];
      }
      console.log(error);
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();

      const id =
        elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

      // let id;
      // if(elements.length === 0){
      //     id = 1
      // } else {
      //     id = elements[elements.length - 1].id + 1;
      // }

      element.id = id;

      elements.push(element);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );

      return element.id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id == id);

      if (!foundElement) return null;

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id == id);
      //   const foundElementIndex = elements.findIndex(
      //     (element) => element.id == id
      //   );

      if (!foundElement) return "Element not found";
      //if (foundElementIndex === -1) return "Element not found";

      const filterElements = elements.filter((element) => element.id != id);

      //   elements.splice(foundElementIndex, 1);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(filterElements, null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      console.log(error);
    }
  }

  async update({ id, newData }) {
    try {
      const elements = await this.getAll();

      const foundElementIndex = elements.findIndex(
        (element) => element.id == id
      );

      if (foundElementIndex === -1) return "Element not found";
      const foundElement = elements[foundElementIndex];

      // elements[foundElementIndex] = {
      //   ...foundElement,
      //   ...newData,
      // };

      // otra forma para actualizar dinamicamnete un objeto, recorremos todas las propiedades que llegan en newData usando un for in, y por cada key de newData, con el metodo hasOwnProperty de object, analizamos si foundElement tiene esa key que viene de newData, si la tiene, le asignamos el valor de newData
      // Ejemplo, si foundElement es un objeto { title: "producto", price: 1000 } y new data {title: "Producto Modificado", pepe: "no deberia guardar"},
      // recorremos newData, y si title existe en el foundelement, reemplazamos su valor, pero pepe no va a existir, por lo tanto pasa de largo el if.
      for (const key in newData) {
        if (foundElement.hasOwnProperty(key)) {
          foundElement[key] = newData[key];
        }
      }

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export { Container };

// sin usar el type module en el package json usamos lo siguiente:
// module.exports = Container;
*/