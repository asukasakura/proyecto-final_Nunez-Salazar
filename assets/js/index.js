import { pao, dateInPast, ProductoStoraged } from './funcitions-module.js';

let countVencidos = document.querySelector("#countVencidos");
let fechaActual = new Date();

const alamacenados = JSON.parse(localStorage.getItem('productos')) || [];
alamacenados.reverse();
const productosNews = [];

for (const objeto of alamacenados){
  let fechaCaducidad = new Date(objeto['fecha_caducidad']);
  let fechaApertura  = new Date(objeto['fecha_apertura']);
  let timePAO  = objeto['pao'];
  
  let thispao = pao(fechaApertura, timePAO);
  let siEstaVencidoPAO = dateInPast(thispao, fechaActual);
  let siEstaVencidoDate = dateInPast(fechaCaducidad, fechaActual);
  
  if(siEstaVencidoPAO == true || siEstaVencidoDate == true){
    productosNews.push(new ProductoStoraged(objeto))
  }
}

countVencidos.innerText = productosNews.length;
