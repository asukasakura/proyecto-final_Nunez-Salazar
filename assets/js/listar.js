import { renderProductos, renderProductosAPI, ProductoStoraged } from './funcitions-module.js';

const alamacenados = JSON.parse(localStorage.getItem('productos')) || [];
alamacenados.reverse();

let productosNews = []
let container = document.querySelector("#cards");
let containerAPI = document.querySelector("#apis");
const loader = document.querySelector("#loading");

const displayLoading = () => {
  loader.classList.add("display");
}
const hideLoading = () => {
  loader.classList.remove("display");
}

for (const objeto of alamacenados){
  productosNews.push(new ProductoStoraged(objeto))
}

/* PRODUCTOS LLAMADOS DESDE UN JSON LOCAL */
fetch('./assets/js/data_base.json')
  .then((response) => response.json())
  .then((json) => {
    productosNews = [...productosNews, ...json];
    renderProductos( productosNews, container );
  })
  .catch( (error) => {
    renderProductos( productosNews, container );
    console.log('Error: no se cargó json', error);
  })

/* PRODUCTOS LLAMADOS POR API */
let url = "http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=vegan"  
const fetchHandler = () => {
  displayLoading()
  fetch(url)
    .then(response => response.json())
    .then(json => {
      hideLoading();
      renderProductosAPI(json, containerAPI);
    })
    .catch( (error) => {
      console.log('Error: no se cargó json', error);
      hideLoading();
    })
}
  
fetchHandler();
