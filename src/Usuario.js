class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.mascotas = mascotas
        this.libros = libros
    }

    getFullName() {
        return this.nombre + " " + this.apellido;

    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    addBook( nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }
    countMascotas() {
        return this.mascotas.length;
    }
    getBookNames(){
        const nombres = []
        for (const {nombre: n } of this.libros){
            nombres.push(n); 
        }
        return nombres;
    }
}

const usuario1 = new Usuario(
    'Sebastian', 
    'Maidana', 
    [
        {
            nombre: "El señor de las moscas", 
            autor: "William Golding"
        },
        {
            nombre: "Fundacion", 
            autor: "Isaac Asimov"
        }
    ], 
    [
        "perro", 
        "gato"
    ]
);
usuario1.addMascota('perro'); 
usuario1.addMascota('gato'); 
usuario1.addBook('El señor de los anillos', 'William Golding' );
usuario1.addBook('Fundacion 2', 'Isaac Asimov' );
console.log(usuario1.countMascotas())
console.log(usuario1.getBookNames());
console.log(usuario1.getFullName());

/*
class Usuario {
  // valores por defecto de los parametros
  constructor(nombre, lastname, books = [], pets = []) {
    this.name = nombre;
    this.lastname = lastname;
    this.books = books;
    this.pets = pets;
  }

  getFullName() {
    return `${this.name} ${this.lastname}`;
  }

  addPets(pet) {
    this.pets.push(pet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(title, author) {
    this.books.push({ title, author: author });
  }

  //   getBookNames() {
  //     const bookNames = [];

  //     this.books.forEach((book) => bookNames.push(book.title));

  //     return bookNames;
  //   }
  getBookNames() {
    return this.books.map((book) => book.title);
  }
}

const usuario1 = new Usuario(
  "Juan",
  "Perrino",
  [{ title: "Harry Potter", author: "JK Rowling" }],
  ["gato", "perro"]
);

console.log(usuario1.getFullName());

console.log({ cantidad: usuario1.countPets() });
usuario1.addPets("loro");

console.log({ cantidad: usuario1.countPets() });

usuario1.addBook("La larga marcha", "Stephen King");

const booksName = usuario1.getBookNames();
console.log(booksName);

const usuario2 = new Usuario(
  "Sebastian",
  "Riquelme",
  [{ title: "titel", author: "JK " }],
  ["gato", "loro"]
);

console.log(usuario2.getBookNames());

*/