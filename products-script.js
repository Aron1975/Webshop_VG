/*const item = {
    id: 1,
    name: "Item",
    price: 1,
    info: "Info",
    image: " "
  };*/

  const cart = [];


let orderButton = document.getElementById("order-btn");
orderButton.addEventListener('click', () => {
        //      localStorage.setItem("prodId", product.id);
        //     window.location.href = `beställning.html?productId=${product.id}`;
        alert("Beställ");
    });

let emptyCartBtn = document.getElementById('empty-cart-btn');
emptyCartBtn.addEventListener('click', emptyCart);

/*
let prodMinusBtn = document.getElementById('quatity-minus-btn');
let prodPlusBtn = document.getElementById('quatity-plus-btn');

prodMinusBtn.addEventListener('click', changeQuantity);
prodPlusBtn.addEventListener('click', changeQuantity);



function changeQuantity(event){
    if(event.target.id == 'quatity-minus-btn'){
        let antal = getQuantity();
        if(antal>0) setQuantity(antal-1);
    }
    else{
        let antal = getQuantity();
        setQuantity(antal+1);
    }
}

function getQuantity(){
    let antalStr = document.getElementById('prod-quantity').innerText;
    let antal = parseInt(antalStr);
    console.log("Antal: " + antal);
    return antal;
}

function setQuantity(nyAntal){
    let antal = document.getElementById('prod-quantity');
    console.log("ny antal: " + nyAntal);
    antal.innerText = nyAntal.toString();
}*/

function emptyCart(){

    const table = document.getElementById("cart-table");
    while(table.rows.length>1){
        table.deleteRow(1);
    }
}

function removeItemFromCart(event){

    //----Array cart--------


    //--------------------------
    
    //-----Tabellen-------
    const idArray = event.target.id.split(" ");
    var row = document.getElementById(idArray[1]);
    row.parentNode.removeChild(row);
}

function addItemToCart(product){

    alert(product.title + " har lagts till i varukorgen.");
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
   // x[4].innerText = "X";

    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', "rm-btn " + product.id);
    removeButton.setAttribute('type', "button");
    removeButton.classList.add('btn-close');
    x[4].appendChild(removeButton);
    removeButton. addEventListener('click', removeItemFromCart)
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

    minusButton.addEventListener('click', changeQuantityNy);
    plusButton.addEventListener('click', changeQuantityNy);
}

function changeQuantityNy(event){
    const idArray = event.target.id.split(" ");
    const prodQuantId = 'prod-quantity ' + idArray[1];
    let antal = getQuantityNy(prodQuantId);
    if(idArray[0] == 'quatity-minus-btn'){
        if(antal>1){
         setQuantityNy(prodQuantId, antal-1); //Ändra Local storage oxå
        }
    }
    else{
        setQuantityNy(prodQuantId, antal+1);       //Ändra Local storage oxå
    }
}

function getQuantityNy(prodQuantId){
    let antalStr = document.getElementById(prodQuantId).innerText;
    let antal = parseInt(antalStr);
    console.log("Antal: " + antal);
    return antal;
}

function setQuantityNy(prodQuantId, nyAntal){
    let antal = document.getElementById(prodQuantId);
    console.log("ny antal: " + nyAntal);
    antal.innerText = nyAntal.toString();
}

