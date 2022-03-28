export class ProductoStoraged{
  constructor( obj ){
    this.id = obj.id;
    this.image = obj.image;
    this.nombre = obj.nombre;
    this.categoria = obj.categoria;
    this.marca = obj.marca;
    this.fecha_caducidad = obj.fecha_caducidad;
    this.apertura = obj.apertura;
    this.fecha_apertura = obj.fecha_apertura;
    this.pao = obj.pao;
    this.calificacion = obj.calificacion;
    this.notas = obj.notas;
  }
  calificar (val) {
    this.calificacion = val;
  }
}

const sumarDias = (fecha, dias) => {
  fecha = new Date(fecha);
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

const definirFecha = (dias) => {
  let restAnios = Math.floor(dias / 365);
  let restoMeses = dias % 365;
  let restoDias = Math.floor(restoMeses % 30);
  restoMeses = Math.floor(restoMeses / 30);
  fechaDefinida = restAnios + " años, " + restoMeses + " meses y " + restoDias + " días";
  return fechaDefinida;
}

const vencimiento = (fechaCaducidad) => {
  let dias = Math.round((fechaCaducidad - fechaActual) / (1000 * 60 * 60 * 24));
  return definirFecha(dias);
}

export const pao = (fechaApertura, pao) => {
  let paoToMs = pao * 2.628e+9;
  let paoToDias = Math.round(paoToMs / (1000 * 60 * 60 * 24));
  let fechaVencimiento = sumarDias(fechaApertura, paoToDias);
  // vidaUtil = Math.round((vidaUtil - fechaActual) / (1000 * 60 * 60 * 24)); //calcula los días de esta fecha
  return fechaVencimiento;
}

export const dateInPast = (firstDate, secondDate) => {
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};

const stars = (calificacion) => {
  let icons = '';
  for(let i = 0; calificacion > i ; i++){
    icons += '<i class="red-text text-lighten-2 material-icons">star</i>';
  }
  return icons;
}

export const renderProductos = (arrProductos,container) => {

  let cards = '';
  let fechaActual = new Date();
  let optionDates = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  let nuevoDiv = document.createElement('div');
  
  for (const producto of arrProductos){
    let imageProd = producto.image;

    if(imageProd != '' && !imageProd.includes('http') && (imageProd.includes('.jpg') || imageProd.includes('.jpeg') || imageProd.includes('.png') )){
      imageProd = 'assets/images/productos/' + imageProd;
    } else if (imageProd.includes('http')) {
      imageProd = imageProd;
    } else {
      imageProd = 'assets/images/default-fallback-image.png';
    }
    
    let thispao = pao(producto.fecha_apertura, producto.pao);
    let siEstaVencidoPAO = dateInPast(thispao, fechaActual);
    let caduce = new Date(producto.fecha_caducidad);
    let siEstaVencidoFecha = dateInPast(caduce, fechaActual);
    let dangerText = '';
    let caducidad  = '';
    
    if (producto.apertura == false && siEstaVencidoFecha == false){
      caduce = caduce.toLocaleDateString('es-ES', optionDates);
      caducidad = `<h6>${caduce.split(' ')[3].toUpperCase()}</h6>
                      <span>${caduce.split(' ')[5]}</span>`;
    }else if(siEstaVencidoPAO == true || siEstaVencidoFecha == true){
      caduce = caduce.toLocaleDateString('es-ES', optionDates);
      caducidad = `<h6 class="red-text text-darken-2"><b>${caduce.split(' ')[3].toUpperCase()}</b></h6>
      <span class="red-text text-darken-2"><b>${caduce.split(' ')[5]}</b></span>`;
      dangerText = 'red-text text-darken-2';
    }else{
      caduce = thispao.toLocaleDateString('es-ES', optionDates);
      caducidad = `<h6>${caduce.split(' ')[3].toUpperCase()}</h6>
                      <span>${caduce.split(' ')[5]}</span>`;
    }
  

    cards += `<div class="card horizontal">
          <div class="card-image">
              <img src="${imageProd}" alt="Beany | Skin care" class="" height="120">
          </div>
          <div class="card-stacked">
              <div class="card-content">
                  <div class="col s8">
                      <h4 class="left-align margin top-0 bottom-0 ${dangerText}"> ${producto.nombre} </h4>
                      <p class="left-align"> ${producto.marca} </p>
                  </div>
                  <div class="col s4 right-align">
                    <small>VENC</small>
                    ${caducidad}
                  </div>
              </div>
              <div class="card-action">
                  <div class="col s6 left-align"><span> ${producto.categoria} </span></div>
                  <div class="col s6 right-align"> ${stars(producto.calificacion)} </div>
          </div>
      </div>
      </div>`;
  //inserto el contenido en el contenedor vacío
  container.innerHTML = cards;
  }
  container.append(nuevoDiv)
}

export const renderProductosAPI = (arrProductos,container) => {

  let cards = '';
  let nuevoDiv = document.createElement('div');
  
  for (const producto of arrProductos){
    
    cards += `<div class="card horizontal">
          <div class="card-image">
              <img src="${producto.api_featured_image}" alt="Beany | Skin care" class="" height="120">
          </div>
          <div class="card-stacked">
              <div class="card-content">
                  <div class="col s8">
                      <h4 class="left-align margin top-0 bottom-0"> ${producto.name} </h4>
                      <p class="left-align"> ${producto.brand} </p>
                  </div>
                  <div class="col s4 right-align">
                    <small>VENC</small>
                    
                  </div>
              </div>
              <div class="card-action">
                  <div class="col s6 left-align"><span> ${producto.category} </span></div>
                  <div class="col s6 right-align"> ${stars(producto.rating)} </div>
          </div>
      </div>
      </div>`;
  container.innerHTML = cards;
  }
  container.append(nuevoDiv)
}