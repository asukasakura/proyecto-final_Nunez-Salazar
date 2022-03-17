class Producto{
  constructor( id, nombre, categoria, marca, fecha_caducidad, fecha_apertura, pao, clasificacion, notas ){
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.marca = marca;
    this.fecha_caducidad = fecha_caducidad;
    this.apertura = false;
    this.fecha_apertura = fecha_apertura;
    this.pao = pao;
    this.calificacion = clasificacion;
    this.notas = notas;
  }
}

let formulario = document.querySelector("#add_products");
let nombreProducto =  document.querySelector('#nombre_producto');
let categoriaProducto =  document.querySelector('#categoria');
let marcaProducto =  document.querySelector('#marca');
let checkApertura =  document.querySelector('.estado_apertura');
let isOpen =  document.querySelector('#checkOpen');
let paoProducto =  document.querySelector('#pao');
let notasProducto =  document.querySelector('#notas');
let fechaCaducidad = document.querySelector('#fecha_caducidad');
let fechaApertura = document.querySelector('#fecha_apertura');
let radios = document.querySelectorAll(".estado_apertura");
let clasificacion = document.querySelectorAll(".estrellas");

let id = 0;


function obtenerValRadio(el){
  for(i = 0; i < el.length; i++) {
    if(el[i].checked)
    val = el[i].value;
  }
  return val;
}

for(var i = 0, max = radios.length; i < max; i++) {
  radios[i].onclick = function() {
    if(this.value == 'true'){
      isOpen.classList.add('isOpen')
    }else{
      isOpen.classList.remove('isOpen')
    }
  }
}

function addProduct(e){
  e.preventDefault(e);
  let productosList = JSON.parse(localStorage.getItem('productos')) || [];
  let productos = new Producto(id ,nombreProducto.value, categoriaProducto.value, marcaProducto.value, fechaCaducidad.value, fechaApertura.value , paoProducto.value, obtenerValRadio(clasificacion), notasProducto.value);
  productosList.push(productos);
  localStorage.setItem('productos', JSON.stringify(productosList))
 
  formulario.reset();
  id++;
}

formulario.addEventListener("submit", addProduct)
formulario.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    addProduct;
  }
});