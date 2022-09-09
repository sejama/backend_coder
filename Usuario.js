
class Usuario {
    mascotas = [];
    libros = [];
    constructor(nombre, apellido) {
        this.nombre= nombre
        this.apellido= apellido
    }

    getFullName() {
        return this.nombre + " " + this.apellido;

    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    addBook( nombreL, autorL){
        this.libros.push({nombre: nombreL, autor: autorL});
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

const usuario1 = new Usuario('Elon', 'Musk');
usuario1.addMascota('perro'); 
usuario1.addMascota('gato'); 
usuario1.addBook('El señor de las moscas', 'William Golding' );
usuario1.addBook('Fundacion', 'Isaac Asimov' );
console.log(usuario1.countMascotas())
console.log(usuario1.getBookNames());
console.log(usuario1.getFullName());


