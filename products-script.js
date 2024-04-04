let cart = [];

(function () {

    let webshopCart = JSON.parse(localStorage.getItem("webshopCart"));
    if (webshopCart != null){
        webshopCart.forEach(item => {addItemToCart(item, "ls");
        });
    }
})();

let orderButton = document.getElementById("order-btn");
orderButton.addEventListener('click', () => {
            window.location.href = `beställning.html`;
    });

let emptyCartBtn = document.getElementById('empty-cart-btn');
emptyCartBtn.addEventListener('click', emptyCart);

// Addar element till varukorg, inputOrigin avgör om den läggs till från LocalStorage('ls') eller via websidan('ws').
function addItemToCart(product, inputOrigin){

    let item = {};

    if(inputOrigin == "ws"){

        //--------rullgardin antal---------
        let antalItem = parseInt(document.getElementById('form-select ' + product.id).value);

        //----------cart Array-------------
        item = {
            id: product.id,
            name: product.title,
            price: product.price,
            info: product.description,
            image: product.image,
            antal: antalItem
        }
    }
    else{
        item = {
            id: product.id,
            name: product.name,
            price: product.price,
            info: product.info,
            image: product.image,
            antal: product.antal
        }
    }

    cart.push(item);
    //console.log(cart);
    
    //------------------------------

    //-----------Tabellen---------------
    const table = document.getElementById("cart-table");
    const antalRader = table.rows.length;
    let newRow = table.insertRow(antalRader-1);
    newRow.setAttribute('id', product.id);
    for(let i=0; i<5; i++){
        newRow.insertCell(i);
    }
    var x = newRow.cells;
    x[0].innerText = item.name;
    addQuantButtons(x[1], item.id, item.antal);
    x[2].innerText = "$" + item.price;
    x[3].innerText = "$" + item.price*item.antal;
    x[3].setAttribute('id', "tot-pris " + item.id);

    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', "rm-btn " + item.id);
    removeButton.setAttribute('type', "button");
    removeButton.classList.add('btn-close');
    x[4].appendChild(removeButton);
    removeButton.addEventListener('click', removeItemFromCart);

    updateTotalItemsAndPrice();
    saveToLocalStorage();
    //alert(product.title + " har lagts till i varukorgen.");
    
}

function emptyCart(){

    const table = document.getElementById("cart-table");
    while(table.rows.length>2){
        table.deleteRow(1);
    }

    cart.forEach((c) => resetAddButtons(c.id));
    cart = [];
    updateTotalItemsAndPrice();
    saveToLocalStorage();
}

function removeItemFromCart(event){

    const idArray = event.target.id.split(" ");
    let id = parseInt(idArray[1]);

    //----Array cart--------
    const indexToRemove = cart.findIndex((item) => item.id == id);
    cart.splice(indexToRemove, 1);

    resetAddButtons(id);
    
    //-----Tabellen-------
    
    var row = document.getElementById(idArray[1]);
    row.parentNode.removeChild(row);
    updateTotalItemsAndPrice();
    saveToLocalStorage();
}

function resetAddButtons(id){

    console.log("card " + id);
    let card = document.getElementById("card " + id);
    card.querySelector('.btn').disabled = false;
    card.querySelector('.btn').textContent = 'Lägg till';
    card.querySelector('.btn').style.backgroundColor="blue";
}

function addQuantButtons(cell,prodId,antal){

    const quantBtnsDiv = document.createElement('div');
    quantBtnsDiv.classList.add("quant-btns-div");

    const minusButton = document.createElement('button');
    minusButton.setAttribute('id', "quatity-minus-btn " + prodId);
    minusButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'm-2');
    minusButton.style.backgroundColor="darkorange";
    minusButton.style.color="yellow";
    minusButton.textContent = '-';
    quantBtnsDiv.appendChild(minusButton);

    const antalSpan = document.createElement('span');
    antalSpan.setAttribute('id', "prod-quantity " + prodId);
    antalSpan.style.marginTop="11%";
    antalSpan.textContent = antal;
    quantBtnsDiv.appendChild(antalSpan);

    const plusButton = document.createElement('button');
    plusButton.setAttribute('id', "quatity-plus-btn " + prodId);
    plusButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'm-2');
    plusButton.style.backgroundColor="darkorange";
    plusButton.style.color="yellow";
    plusButton.textContent = '+';
    quantBtnsDiv.appendChild(plusButton);

    cell.appendChild(quantBtnsDiv);

    minusButton.addEventListener('click', changeQuantity);
    plusButton.addEventListener('click', changeQuantity);
}

function changeQuantity(event){
    const idArray = event.target.id.split(" ");
    let prodId = idArray[1];
    const prodQuantId = 'prod-quantity ' + idArray[1];
    let antal = getQuantity(prodQuantId);
    if(idArray[0] == 'quatity-minus-btn'){
        if(antal>1){
         setQuantity(prodId, antal-1); 
        }
    }
    else{
        setQuantity(prodId, antal+1);      
    }
}

function getQuantity(prodQuantId){
    let antalStr = document.getElementById(prodQuantId).innerText;
    let antal = parseInt(antalStr);
    return antal;
}

function setQuantity(prodId, nyAntal){
    const prodQuantId = 'prod-quantity ' + prodId;

    //------Array-------------
    let itemIndex = cart.findIndex((item) => item.id == parseInt(prodId));
    cart[itemIndex].antal=nyAntal;   //Ändra Local storage oxå

    //------Table----------
    let antal = document.getElementById(prodQuantId);
    antal.innerText = nyAntal.toString();

    let totPriceStr = document.getElementById("tot-pris " + prodId);
    let totPrice = (nyAntal*cart[itemIndex].price).toFixed(2);
    totPriceStr.innerText = "$" + totPrice.toString();

    updateTotalItemsAndPrice();
    saveToLocalStorage();
}

function updateTotalItemsAndPrice(){

    const sumAntal = cart.map(item => item.antal).reduce((result, item) => {
        return result + item},0);

    const sumPrice = cart.map(item => item.antal).reduce((sum, value, i) => 
                        sum + (value * cart.map(item => item.price)[i]), 0).toFixed(2);

    console.log("Antal: " + sumAntal + " Tot Price: " + sumPrice);
    
    let totAntal = document.getElementById("th-cart-total-antal");
    let totPrice = document.getElementById("th-cart-total-price");
    totAntal.innerText = sumAntal.toString();
    totPrice.innerText = "$" + sumPrice.toString();
}

function saveToLocalStorage(){

    localStorage.setItem("webshopCart", JSON.stringify(cart));
}

