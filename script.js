const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML =`
    <td>
      <img src="${elemento.imagen}" width=100/>
    </td>
    <td>
       ${elemento.titulo}
    </td>
    <td>
       ${elemento.precio}
    </td>
    <td>
       <a href="#" class="borrar" data-id="${elemento.id}">x</a>
    `;
    lista.appendChild(row);
    mostrarPopup('Artículo agregado');
}

function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoid;
    if(e.target.classList.contains('borrar')){
        elemento = e.target.parentElement.parentElement;
        elemento.remove();
        elementoid = elemento.querySelector('a').getAttribute('data-id');
        mostrarPopup('Artículo eliminado');
    }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
        mostrarPopup('Carrito vaciado');
    }
    return false;
    
}
//asasasasas//
function mostrarPopup(mensaje) {
    const popup = document.getElementById('popup-notificacion');
    const mensajePopup = document.getElementById('mensaje-popup');
    mensajePopup.textContent = mensaje;
    popup.classList.add('mostrar');

    // Cerrar el pop up al hacer clic en el botón
    document.getElementById('cerrar-popup').onclick = function() {
        popup.classList.remove('mostrar');
    };
}