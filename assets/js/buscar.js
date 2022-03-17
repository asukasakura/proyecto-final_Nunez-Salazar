import { renderProductos, ProductoStoraged } from './funcitions-module.js';

let cards = '';
let formulario = document.querySelector('#search-form');
let container = document.querySelector("#result");

const alamacenados = JSON.parse(localStorage.getItem('productos'));
alamacenados.reverse();
const productosNews = []

for (const objeto of alamacenados){
  productosNews.push(new ProductoStoraged(objeto))
}


function buscarfx(e){
  e.preventDefault(e);
  let buscar = document.querySelector('#search').value;
  if(buscar != ''){
    let resultado = productosNews.filter( (el) => parseInt(el.calificacion) == buscar );
    if (resultado.length > 0 && resultado.length <= 5){
      renderProductos(resultado, container);
    }else{
      container.innerHTML = "No hay productos aun con esta clasificación";
    }
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