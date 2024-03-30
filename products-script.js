/*const item = {
    id: 1,
    name: "Item",
    price: 1,
    info: "Info",
    image: " "
  };*/

let cart = [];


let orderButton = document.getElementById("order-btn");
orderButton.addEventListener('click', () => {
        //      localStorage.setItem("prodId", product.id);
        //     window.location.href = `beställning.html?productId=${product.id}`;
        alert("Beställ");
    });

let emptyCartBtn = document.getElementById('empty-cart-btn');
emptyCartBtn.addEventListener('click', emptyCart);

function emptyCart(){

    const table = document.getElementById("cart-table");
    while(table.rows.length>1){
        table.deleteRow(1);
    }

    cart.forEach((c) => resetAddButtons(c.id));
    cart = [];
    updateTotalItemsAndPrice();
}

function removeItemFromCart(event){

    const idArray = event.target.id.split(" ");
    let id = parseInt(idArray[1]);
    //----Array cart--------
    console.log("cart Före");
    //console.log(cart);
    cart.forEach((c) => console.log(c.id));

    const indexToRemove = cart.findIndex((item) => item.id == id);
    cart.splice(indexToRemove, 1);
    console.log("Remove: " + indexToRemove);

    resetAddButtons(id);

    console.log("cart Efter");
    //console.log(cart);
    cart.forEach((c) => console.log(c.id));

    //--------------------------
    
    //-----Tabellen-------
    
    var row = document.getElementById(idArray[1]);
    row.parentNode.removeChild(row);
    updateTotalItemsAndPrice();
}

function resetAddButtons(id){

    let card = document.getElementById("card " + id);
    card.querySelector('.btn').disabled = false;
    card.querySelector('.btn').textContent = 'Lägg till';
    card.querySelector('.btn').style.backgroundColor="blue";
}

function addItemToCart(product){

    //--------cart Array-----------
    let item = {
        id: product.id,
        name: product.title,
        price: product.price,
        info: product.description,
        image: product.image,
        antal: 1    //Ändra till rätt inläst antal
    }
    cart.push(item);
    console.log(cart);
    //------------------------------

    //-----------Tabellen---------------
    const table = document.getElementById("cart-table");
    // Kolla om produkten finns redan i kundkorg annars skapa ny
    
    let newRow = table.insertRow();
    newRow.setAttribute('id', product.id);
    for(let i=0; i<5; i++){
        newRow.insertCell(i);
    }
    var x = newRow.cells;
    x[0].innerText = product.title;
   // x[1].innerText = "1";
    addQuantButtons(x[1], product.id);
    x[2].innerText = "$" + product.price;
    x[3].innerText = "$" + product.price;
    x[3].setAttribute('id', "tot-pris " + product.id);
   // x[4].innerText = "X";

    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', "rm-btn " + product.id);
    removeButton.setAttribute('type', "button");
    removeButton.classList.add('btn-close');
    x[4].appendChild(removeButton);
    removeButton.addEventListener('click', removeItemFromCart);

    updateTotalItemsAndPrice();
    //alert(product.title + " har lagts till i varukorgen.");
}

function addQuantButtons(cell,prodId){

    const minusButton = document.createElement('button');
    minusButton.setAttribute('id', "quatity-minus-btn " + prodId);
    minusButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'm-1');
    minusButton.textContent = '-';
    cell.appendChild(minusButton);

    const antalSpan = document.createElement('span');
    antalSpan.setAttribute('id', "prod-quantity " + prodId);  
    antalSpan.textContent = "1"; //Ändra till antal satt vid tilläggning
    cell.appendChild(antalSpan);

    const plusButton = document.createElement('button');
    plusButton.setAttribute('id', "quatity-plus-btn " + prodId);
    plusButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'm-1');
    plusButton.textContent = '+';
    cell.appendChild(plusButton);

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
         setQuantity(prodId, antal-1); //Ändra Local storage oxå
        }
    }
    else{
        setQuantity(prodId, antal+1);       //Ändra Local storage oxå
    }
}

function getQuantity(prodQuantId){
    let antalStr = document.getElementById(prodQuantId).innerText;
    let antal = parseInt(antalStr);
    //console.log("Antal: " + antal);
    return antal;
}

function setQuantity(prodId, nyAntal){
    const prodQuantId = 'prod-quantity ' + prodId;

    //------Array-------------
    let itemIndex = cart.findIndex((item) => item.id == parseInt(prodId));
    cart[itemIndex].antal=nyAntal;

    //------Table----------
    let antal = document.getElementById(prodQuantId);
    //console.log("ny antal: " + nyAntal);
    antal.innerText = nyAntal.toString();

    let totPriceStr = document.getElementById("tot-pris " + prodId);
    let totPrice = (nyAntal*cart[itemIndex].price).toFixed(2);
    totPriceStr.innerText = "$" + totPrice.toString();

    updateTotalItemsAndPrice();
}

function updateTotalItemsAndPrice(){

    const sumAntal = cart.map(item => item.antal).reduce((result, item) => {
        return result + item},0);

    const sumPrice = cart.map(item => item.antal).reduce((sum, value, i) => sum + (value * cart.map(item => item.price)[i]), 0).toFixed(2);

    console.log("Antal: " + sumAntal + " Tot Price: " + sumPrice);

    
    let totAntal = document.getElementById("th-cart-total-antal");
    let totPrice = document.getElementById("th-cart-total-price");
    totAntal.innerText = sumAntal.toString();
    totPrice.innerText = "$" + sumPrice.toString();
}

