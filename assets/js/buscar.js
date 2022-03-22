import { renderProductos, ProductoStoraged } from './funcitions-module.js';

const alamacenados = JSON.parse(localStorage.getItem('productos')) || [];
const productosNews = []
let cards = '';
let formulario = document.querySelector('#search-form');
let container = document.querySelector("#result");
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems, {
  onCloseEnd: function() { 
    setTimeout(function(){
      window.location.href = "/proyecto-final_Nunez-Salazar/add_product.html";
      }, 1000)
  } 
});
let singleModalElem = document.querySelector('#modal1');
let instance = M.Modal.getInstance(singleModalElem);

closeModal.addEventListener('click', () => {
  instance.close();
});

if( localStorage.length != 0 ){
  alamacenados.reverse();

  for (const objeto of alamacenados){
    productosNews.push(new ProductoStoraged(objeto))
  }
} else {

  instance.open();

}

function buscarfx(e){
  e.preventDefault(e);
  let buscar = document.querySelector('#search').value;
  if(buscar != ''){
    let resultado = productosNews.filter( (el) => parseInt(el.calificacion) == buscar );
    resultado.length > 0 && resultado.length <= 5 ? renderProductos(resultado, container) :  container.innerHTML = "No hay productos aun con esta clasificación";
    cards = '';
  }else{
    container.innerHTML = "Ingresa un valor para buscar";
  }
}

formulario.addEventListener("submit", buscarfx)
formulario.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    buscarfx;
  }
});

