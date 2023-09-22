// elementos visibles del carrito
var carritoVisible = false;

//  espera de cargar la pagina para seguir con el script

if (document.readyState=='loading'){
   document.addEventListener('DOMContentLoaded',ready)
}else{
   ready();
}

// funciones 
// funcionalidad al boton eliminar del carrito
function ready(){
   var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
   for (var i = 0; i < botonesEliminarItem.length; i++) {
      var button = botonesEliminarItem[i];
      button.addEventListener('click', eliminarItemCarrito);
   }

   // agrego funcion al boton sumar cantidad
   var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
   for (var i = 0; i < botonesSumarCantidad.length; i++){
      var button = botonesSumarCantidad[i];
      button.addEventListener('click', sumarCantidad);
   }

   // agrego funcion al boton restar cantidad
   var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
   for (var i = 0; i < botonesRestarCantidad.length; i++){
      var button = botonesRestarCantidad[i];
      button.addEventListener('click', restarCantidad);
   }

   // agrego funcion al los botones de agregar al carrito
   var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
   for (var i = 0; i < botonesAgregarAlCarrito.length; i++){
      var button = botonesAgregarAlCarrito[i];
      button.addEventListener('click', agregarAlCarritoClicked);
   }

   // funcionalidad al boton pagar
   document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}



// eliminando item seleccionado del carrito
function eliminarItemCarrito (event) {
   var buttonClicked = event.target;
   buttonClicked.parentElement.parentElement.remove();

   // Actualizacion de monto total del carrito
   actualizarTotalCarrito();

   // se controla si hay elementos en el carrito una vez se eliminan
   // si no hay se oculta el carrito
   ocultarCarrito();
}

// funcion de actualizacion del carrito de compras

function actualizarTotalCarrito () {
   // seleccion del contenedor carrito

   var carritoContenedor = document.getElementsByClassName('carrito')[0];
   var carritoItem = carritoContenedor.getElementsByClassName('carrito-item');
   var total = 0;

   // recorrido de los elementos para actualizarlo
   for (var i = 0; i < carritoItem.length; i++) {
      var item = carritoItem[i];
      var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
      console.log(precioElemento);

      // se quita el simbolo de peso y el punto de milesimo
      var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
      console.log(precio);

      var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
      var cantidad = cantidadItem.value;
      console.log(cantidad);
      total = total + (precio * cantidad);
   }
   total = Math.round(total*100)/100;
   document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

// funcion ocultar carrito
function ocultarCarrito(){
   var carritoItems = document.getElementsByClassName('carrito-items')[0];
   if (carritoItems.childElementCount == 0){
      var carrito = document.getElementsByClassName('carrito')[0];
      carrito.style.marginRight = '-100%';
      carrito.style.opacity = '0';
      carritoVisible = false;

      // se maximiza el contenedor de elementos
      var item = document.getElementsByClassName('container-items')[0];
      item.style.width = '100%';
   }
}

// Aumento de cantidad selecionada de elementos

function sumarCantidad (event){
   var buttonClicke = event.target;
   var selector = buttonClicke.parentElement;
   var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
   console.log(cantidadActual);
   cantidadActual ++;
   selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

   // actualizacion del total de carrito
   actualizarTotalCarrito();
}

// funcion restar cantidad
function restarCantidad (event){
   var buttonClicke = event.target;
   var selector = buttonClicke.parentElement;
   var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
   console.log(cantidadActual);
   cantidadActual --;

   // controlamos que no sea menor a 1
   if (cantidadActual >=1){
      selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
      // actualizacion del total de carrito
      actualizarTotalCarrito();
   }
}

// funcion agreger al carrito
function agregarAlCarritoClicked (event){
   var button = event.target;
   var item = button.parentElement;
   var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
   console.log(titulo);

   var precio = item.getElementsByClassName('precio-item')[0].innerText;
   var imagenSrc = item.getElementsByClassName('img-item')[0].src;
   console.log(imagenSrc);

   // funcion que agrega el elemento al carrito. se le envia los parametros
   agregarItemAlCarrito(titulo, precio, imagenSrc);

   // agregar funcion de hacer visible el carrito con nuevos productos
   hacerVisibleCarrito();
}

   // funcion que agrega el elemento al carrito
   function agregarItemAlCarrito(titulo, precio, imagenSrc){
      var item = document.createElement('div');
      item.classList.add = 'item';
      var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

      // controlamos los item ingresados no se encuentren en el carrito
      var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
      for (var i = 0; i <nombresItemsCarrito.length; i++){
         if (nombresItemsCarrito[i].innerText == titulo){
            alert("Este producto ya se encuentra en el carrito");
            return;
         }
      }

      var itemCarritoContenido = `

      <div class="carrito-item">
         <img src="${imagenSrc}" alt="" width="80px">
         <div class="carrito-item-detalles" id="product-description">
            <span class="carrito-item-titulo">${titulo}</span>
               <div class="selector-cantidad">
               <i class='bx bx-minus-circle restar-cantidad' ></i>
                  <input type="text" value="1" class="carrito-item-cantidad" disabled>
                  <i class='bx bx-plus-circle sumar-cantidad'></i>
               </div>
            <span class="carrito-item-precio" id="unit-price">${precio}</span>
         </div>
         <span class="btn-eliminar">
         <i class='bx bx-trash-alt'></i>
         </span>
      </div>
      `
      item.innerHTML = itemCarritoContenido;
      itemsCarrito.append(item);

      //agregamos la funcionalidad al boton de eliminar el nuevo item
      item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

      //agregamos la funcionalidad al boton de sumar el nuevo item
      var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
      botonSumarCantidad.addEventListener('click', sumarCantidad);

      //agregamos la funcionalidad al boton de restar el nuevo item
      var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
      botonRestarCantidad.addEventListener('click', restarCantidad);
   }

   // funcion al boton pagar

   function pagarClicked(event){
      alert("gracias por su compra");

      // eliminar todos los elementos del carrito
      var carritoItem = document.getElementsByClassName('carrito-items')[0];
      while (carritoItem.hasChildNodes()){
         carritoItem.removeChild(carritoItem.firstChild);
      }

      //funcion que actualiza al carrito
      actualizarTotalCarrito();

      //funcion que oculta al carrito
      ocultarCarrito();
   }

   // funcion de visibilidad del carrito por primera vez
   function hacerVisibleCarrito(){
      carritoVisible = true;
      var carrito = document.getElementsByClassName('carrito')[0];
      carrito.style.marginRight = 0;
      carrito.style.opacity = '1';

      var items = document.getElementsByClassName('container-items')[0];
      items.style.width = '60%';
   }




   // mercado pago

// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new mercadoPago('<TEST-871df5bd-5577-48dc-9a67-3696cba25dac>', {
   locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});


// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function () {

   const orderData = {
      quantity: document.getElementById("quantity").value,
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML
};

   fetch("http://127.0.0.1:5500/html/productos.html/create_preference", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
   })
      .then(function (response) {
         return response.json();
      })
      .then(function (preference) {
         createCheckoutButton(preferenceId);
      })
      .catch(function () {
         alert("Unexpected error");
      });
});

   function createCheckoutButton(preferenceId) {
   // Initialize the checkout
   const bricksBuilder = mercadopago.bricks();
   const renderComponent = async (bricksBuilder) => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create(
         'wallet',
         'button-checkout', // class/id where the payment button will be displayed
      {
         initialization: {
         preferenceId: preferenceId
         },
         callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {}
         }
      }
   );
};
   window.checkoutButton =  renderComponent(bricksBuilder);
}
 

/*
 // Handle price update
 function updatePrice() {
   let quantity = document.getElementById("quantity").value;
   let unitPrice = document.getElementById("unit-price").innerHTML;
   let amount = parseInt(unitPrice) * parseInt(quantity);
 
   document.getElementById("cart-total").innerHTML = "$ " + amount;
   document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
   document.getElementById("summary-quantity").innerHTML = quantity;
   document.getElementById("summary-total").innerHTML = "$ " + amount;
 }
 
 document.getElementById("quantity").addEventListener("change", updatePrice);
 updatePrice();
 
 // Go back
 document.getElementById("go-back").addEventListener("click", function () {
   $(".container_payment").fadeOut(500);
   setTimeout(() => {
     $(".shopping-cart").show(500).fadeIn();
   }, 500);
   $('#checkout-btn').attr("disabled", false);
 }); 
 */




