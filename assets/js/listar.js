import { renderProductos, ProductoStoraged } from './funcitions-module.js';

let container = document.querySelector("#cards");
      
const alamacenados = JSON.parse(localStorage.getItem('productos'));
alamacenados.reverse();
const productosNews = []

for (const objeto of alamacenados){
  productosNews.push(new ProductoStoraged(objeto))
}


renderProductos( productosNews, container );

