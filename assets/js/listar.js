import { renderProductos, ProductoStoraged } from './funcitions-module.js';

const alamacenados = JSON.parse(localStorage.getItem('productos')) || [];

let container = document.querySelector("#cards");
let closeModal = document.querySelector('#closeModal');

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

if( localStorage.length > 0 ){
  alamacenados.reverse();
  const productosNews = []
  
  for (const objeto of alamacenados){
    productosNews.push(new ProductoStoraged(objeto))
  }
  
  renderProductos( productosNews, container );
} else {

  let preloader = document.querySelector('.preloader-wrapper');
  preloader.classList.remove('hide');
  instance.open();

}