// lista con items
var items = []


//agregar items
//monitoreo clicks en botones
var addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    //obtengo items del html
    var clickedButton = event.target;
    var parentContainer = clickedButton.parentNode.parentNode;    

    //me fijo si ya hay en el carrito
    var productName = parentContainer.querySelector(".nombre-producto").textContent;
    var presentInCart = items.find(item => item.name === productName);

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


//restar items



//calcular el monto total
//sumo todos los precios y los multiplico por cantidad de items
//lo reflejo en la UI



//actualizar items en el carrito
function updateCart(){
    //eligo carrito
    var cartElement = document.querySelector(".carr-items");
    //vacio carrito
    cartElement.innerHTML = "";
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
                items.splice(0, 1);
            }
        });

        //actualizo carrito
        updateCart()

        console.log(items)
      });
    });



    //quantity editor
    //fijate de copiar lo de arriba de remove functionality
    //si toco el item de quantity (usar un event de cambios en el input)
    //actualizar la lista de items usando el find
    //correr update cart para que se actualize el html



}



//pasar precio string a número
function convertPriceToNumber(priceString) {
    var cleanedString = priceString.replace(/[^0-9.]/g, "");
    var priceNumber = parseFloat(cleanedString);
    return priceNumber;
}