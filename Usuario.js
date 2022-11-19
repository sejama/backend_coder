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