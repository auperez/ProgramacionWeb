// lista con items
var items = []
console.log(items)

//agregar items
var addToCartButtons = document.querySelectorAll(".add-to-cart"); //Seleccino todos los elementos con la clase .add-to-cart

addToCartButtons.forEach(function (button) { //Iteracion de cada uno de los elementos con la clase .add-to-cart
  button.addEventListener("click", function (event) {
    //obtengo items del html
    var clickedButton = event.target; //Obtengo el elemento HTML que activo el boton
    var parentContainer = clickedButton.parentNode.parentNode; //Obtengo el contenedor padre del padre que contiene toda la info del elemento   

    //me fijo si ya hay en el carrito
    var productName = parentContainer.querySelector(".nombre-producto").textContent; //Busco el nombre del prodto
    var presentInCart = items.find(item => item.name === productName); //comparar el nombre del producto con cada elemento del arreglo

    if(presentInCart){
        //si está en el carrito, sumo una unidad
        items.find(function (item) {
            if(item.name === productName){
                item.quantity +=1;
            }
        });

    }else{
        //si no está, sumo el item al carro
        items.push({
            name: productName,
            thumbnail: parentContainer.querySelector("img").getAttribute("src"),
            price: convertPriceToNumber(parentContainer.querySelector("p.precio").textContent),
            quantity: 1
        })

    }

    //actualizo carrito
    updateCart()
    
  });
});




//actualizar items en el carrito
function updateCart(){
    //elijo carrito
    var cartElement = document.querySelector(".carr-items"); //Se selecciona el elemento HTML con la clase .carr-items
                                                            // y se almacena en la variable cartElement
    //vacio carrito
    console.log(cartElement)
    cartElement.innerHTML = ""; //Se vacía el contenido del carrito estableciendo cartElement.innerHTML (setea el contenido HTML
                                // del elemento cartElement)
    //armo html y lo meto
    items.forEach(function (item) {
        var html = `<div class="carr-fila">
                        <div class="carr-prod carr-col">
                            <img class="carr-prod-img" src="${item.thumbnail}" width="100" height="100">
                            <span class="carr-prod-tit">${item.name}</span>
                        </div>
                        <span class="carr-precio carr-col">$${item.price}</span>
                        <div class="carr-cant carr-col">
                            <input class="carr-cant-input" type="number" value="${item.quantity}">
                            <button class="btn btn-danger remove-from-cart" type="button">REMOVE</button>
                        </div>
                    </div>`
        cartElement.innerHTML += html
        console.log(cartElement.innerHTML)
        
        console.log(cartElement)
    })

    //add remove functionality
    var removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
    
    removeFromCartButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        //obtengo items del html
        var clickedButton = event.target;
        var parentContainer = clickedButton.parentNode.parentNode;    
    
        //lo busco en el carrito y lo elimino
        var productName = parentContainer.querySelector(".carr-prod-tit").textContent;
        console.log(productName)
        items.find(function (item) {
            if(item.name === productName){
                var index = items.indexOf(item)
                items.splice(index, 1);
            }
        });

        //actualizo carrito
        updateCart()

      });
    });


}



//pasar precio string a número
function convertPriceToNumber(priceString) {
    var cleanedString = priceString.replace(/[^0-9.]/g, "");
    var priceNumber = parseFloat(cleanedString);
    return priceNumber;
}