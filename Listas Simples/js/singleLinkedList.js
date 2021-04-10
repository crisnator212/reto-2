let ingresoInput = new Array();
let ingresoImagenes = new Array();
let ingresoTexto = new Array();

const capturaValorInputAnonima = function() {
    let valoresNodos = document.getElementById("nodos").value;
    if(valoresNodos != ""){
        var array3 = valoresNodos.split(",");
        document.getElementById("nodosIngresados").innerHTML = array3;
        array3.forEach(i => {
            ingresoInput.push(i);
        });
    }else{
        alert("El campo de ingreso está vacío");
    }
};

function cargueImagenes(eventoSeleccionar) {
    let files = eventoSeleccionar.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        /* Cargue de sólo imagenes */
        if (f.type.match('image.*')) {
            document.getElementById("nameImage").className = "file-path validate";
        }else{
            alert("Todos los archivos seleccionados deben ser imagenes");
            document.getElementById("nameImage").className = "";
            document.getElementById("list").className = "";
            return;
        }
    }

    for (let i = 0, f; f = files[i]; i++) {
        let cargueImagenes = new FileReader;
        /* Capturar información de la imagen: tipo, nombre, tamaño */
        cargueImagenes.onload = (function(imagenSeleccionada) {
            return function(imagen) {
                /* Crear etiqueta HTML en el DOM */
                let span = document.createElement('span');
                /* Escribimos en la etiqueta span: cargamos la imagen */
                span.innerHTML = ['<img class ="thumb" width ="100px" heigth="100px" src= " ',
                    imagen.target.result, ' "title=" ', escape(imagenSeleccionada.name),
                    ' "/> '
                ].join('');
                document.getElementById("list").insertBefore(span, null);
                ingresoImagenes.push(span.innerHTML);
            };
        })(f);
        /* Función de la API FileReader
        Hace la lectura del contenido de un objeto Blob
        Trabaja con el atributo result que devuelve los datos del fichero, en este caso la imagen seleccionada */
        cargueImagenes.readAsDataURL(f);
    }
    
}

document.getElementById('files').addEventListener('change', cargueImagenes, false);

/* Cargue de archivo txt */
let input = myInput;
let infoArchivo = new FileReader;
input.addEventListener('change', onChange);

function onChange(event) {
    /* event es el evento clic de selección */
    /* targer es el tipo de archivo seleccionado */
    /* files[0] sólo permite el cargue de un archivo */
    let archivo = event.target.files[0];
    if(archivo.type.match('text.*')){
        document.getElementById("nameText").className = "file-path validate";
        /* readAsText se utiliza para leer el contenido de ls archivos */
        infoArchivo.readAsText(archivo);
        /* Permite ejecutar la función onload despues de cargar el archivo */
        infoArchivo.onload = onLoad;
    }else{
        document.getElementById("nameText").className = "";
        alert("No se ingreso un documento de texto");
    }
    
}

/* Lectura del contenido del archivo */
function onLoad() {
    let contenidoTxt = infoArchivo.result;
    var array3 = contenidoTxt.split("\n");
    var datos = new Array();
    array3.forEach(i => {
        datos.push(i.trim());
    });
    document.getElementById("ver").innerHTML = datos;
    array3.forEach(i => {
        ingresoTexto.push(i.trim());
    });
}

function crearLista(){
    alert("Se creará la lista con los valores ingresados");
    ingresoInput.forEach(i => {
        lista.añadirNodoF(i);
    });
    ingresoImagenes.forEach(i => {
        lista.añadirNodoF(i);
    });
    ingresoTexto.forEach(i => {
        lista.añadirNodoF(i);
    });
    document.getElementById("nuevaLista").innerHTML = lista.imprimirArrayList();
}

/* fincion para agregar por la lista */
function listaAHacer(){
    let seleccion = document.getElementById("functionSelected").value;
    let nodoAñadir = document.getElementById("valorN").value;
    let index = document.getElementById("posicionN").value;
    /* (seleccion === "1")&&(document.getElementById("inicio"))) */
    switch(seleccion){
        case "1":
            if(document.getElementById("inicio").checked){
               lista.añadirNodoI(nodoAñadir);
               document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();
            }else if(document.getElementById("final")){
               lista.añadirNodoF(nodoAñadir);
               document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();
            }
            break;

        case "2":
            if(document.getElementById("inicio").checked){
               lista.eliminarNodoI();
               document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();
            }else if(document.getElementById("final")){
               lista.eliminarNodoF();
               document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();
            }
            break;
        case "3":
                lista.getPosicionPuntero(index);
                document.getElementById("listaResultado").innerHTML = instClass.getPosicionPuntero(puntero).valor;
           break;
        case "4":
                lista.removerNodoPorPosicion(index);
                document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();
                break;
        case "5":
                lista.removerNodoPorValor(nodoAñadir, index);
                document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();

             break;
        case "6":
          
                lista.modificarValorNodo(nodoAñadir, index);
                document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();

            break;
        case "7":
                /* reverse */
                lista.insertarNodoPorPosicion(nodoAñadir, index);
                document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();

            break;
        case "8":
            lista.reverse();
            document.getElementById("listaResultado").innerHTML = lista.imprimirArrayList();   

    }

}

function alerta(){
    let seleccion = document.getElementById("functionSelected").value;
    switch(seleccion){
        case "1":
           alert("recuerde llenar el campo valor para realizar el cambio");
           break;
        case "2":
            alert("seleccion exitosa ");
            break;
        case "3":
            alert("recuerde llenar el campo index para realizar el cambio");
            break;
         case "4":
            alert("seleccion exitosa");
            break;
        case "5":
            alert("recuerde llenar el campo index y value para realizar el cambio");
            break;
        case "6":
            alert("recuerde llenar el campo index y value para realizar el cambio");
            break;
        case "7":
            alert("seleccion exitosa ");
            break;
    }
}

class NodeClass {

    constructor(valor) {
        this.valor = valor;
        this.next = null;
    }
}

class listasSimples {
    constructor() {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
        /* Métodos de la lista: añadir, eliminar, buscar, actualizar valor */
    añadirNodoF(valor) {
        /* Instancia de la clase NodeClass */
        let newNode = new NodeClass(valor);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    añadirNodoI(valor) {
        let newNode = new NodeClass(valor);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    eliminarNodoF() {
        if (!this.head) return undefined;
        let nodoVisitado = this.head;
        let nuevaColaLista = nodoVisitado;
        while (nodoVisitado.next) {
            nuevaColaLista = nodoVisitado;
            nodoVisitado = nodoVisitado.next;
        }
        this.tail = nuevaColaLista;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return nodoVisitado;
    }
    eliminarNodoI() {
        if (!this.head) return undefined;
        let cabezaactual = this.head;
        this.head = cabezaactual.next;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return cabezaactual;
    }

    getPosicionPuntero(index) {
        if (index < 0 || index >= this.length) return null;
        let contadorPuntero = 0;
        let nodoVisitado = this.head;
        while (contadorPuntero !== index) {
            nodoVisitado = nodoVisitado.next;
            contadorPuntero++;
        }
        return nodoVisitado;
    }

    modificarValorNodo(index, valor) {
        let encontrarNodo = this.getPosicionPuntero(index);
        if (encontrarNodo) {
            encontrarNodo.valor = valor;
            return true;
        }
        return false;
    }

    removerNodoPorPosicion(index) {
        let nodoVisitad = this.head;
        let nodoAnteriorAlVisitado = null;
        if (index < 0 || index >= this.length) return null;
        if (index === 0) this.head = nodoVisitad.next;
        else {
            for (let i = 0; i < index; i++) {
                nodoAnteriorAlVisitado = nodoVisitad;
                nodoVisitad = nodoVisitad.next;
            };
            nodoAnteriorAlVisitado.next = nodoVisitad.next;
        };
        this.length--;
        return nodoVisitad.valor;
    }

    insertarNodoPorPosicion(valor, index) {
        let newNode = new NodeClass(valor);
        let nodoVisitado = this.head;
        let nodoAnteriorAlVisitado;
        if (index < 0 || index >= this.length) return null;
        if (index === 0) this.añadirNodoI(valor);
        else {
            for (let i = 0; i < index; i++) {
                nodoAnteriorAlVisitado = nodoVisitado;
                nodoVisitado = nodoVisitado.next;
            }
            newNode.next = nodoVisitado;
            nodoAnteriorAlVisitado.next = newNode;
        }
        this.length++;
    }
    removerNodoPorValor(valor) {
        let nodoVisitado = this.head;
        let nodoAnteriorAlVisitado = null;
        while (nodoVisitado !== null) {
            if (nodoVisitado.valor === valor) {
                if (!nodoAnteriorAlVisitado)
                    this.head = nodoVisitado.next;
                else
                    nodoAnteriorAlVisitado.next = nodoVisitado.next;
                this.length--;
                return nodoVisitado.valor;
            }
            nodoAnteriorAlVisitado = nodoVisitado;
            nodoVisitado = nodoVisitado.next;
        }
        return null;
    }

    reverse() {
        let inicialCabeza = this.head;
        let inicialCola = this.tail;

        let nodoAnterior;
        let nodoActual = this.head;
        let nodoSiguiente;
        while (nodoActual != null) {
            nodoSiguiente = nodoActual.next;
            nodoActual.next = nodoAnterior;
            nodoAnterior = nodoActual;
            nodoActual = nodoSiguiente;
        }
        
        this.head = inicialCola;
        this.tail = inicialCabeza;
        return nodoAnterior;
    }

    /* Implementar método reverse (invertir nodos de la lista) */
    /* Implementar función para llamar método según selección del user en la lista desplagable */
    /* Crear la lista simple a partir de los valores ingresados por el usuario, 
    en la opción por default y del campo input */

    imprimirArrayList() {
        let arregloNodos = [];
        let nodoVisitado = this.head;
        while (nodoVisitado) {
            arregloNodos.push(nodoVisitado.valor);
            nodoVisitado = nodoVisitado.next;
        }
        return arregloNodos;
    }
}

let lista = new listasSimples();
lista.añadirNodoF(5);
lista.añadirNodoI(4);
lista.añadirNodoI(3);
lista.añadirNodoI(2);
lista.añadirNodoI(1);
lista.añadirNodoI(7);
lista.añadirNodoI(8);
lista.añadirNodoI(9);

document.getElementById("listaPorDefault").innerHTML = lista.imprimirArrayList();
console.log(lista);
/* /* instClass.eliminarNodoI();
instClass.eliminarNodoF(); 
instClass.modificarValorNodo(1, "Dos");
instClass.removerNodoPorPosicion(1);  Elimina nodo con valor 3 
console.log(lista);

instClass.insertarNodoPorPosicion("Nuevo nodo", 0);
instClass.removerNodoPorValor(3);

instClass.imprimirArrayList();
instClass.imprimirArrayList(); */

