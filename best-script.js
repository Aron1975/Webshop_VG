let submitBtn = document.getElementById('submit-button');
let form = document.getElementById("myform");
let person = {};
let sumPrice = 0;

submitBtn.addEventListener('click', (event) => {
    let valid = true;
    for(f of form) {
        person[f.id]=f.value;
        if(!f.checkValidity()){
            valid = false;
        }
    }
    if(valid){
       // var urlParams = new URLSearchParams(window.location.search);
       // var productId = urlParams.get('productId');
       if(sumPrice != 0){
        localStorage.setItem("person", JSON.stringify(person));
        window.location.href = `summary.html?sumPrice=${sumPrice}`;
       }
       else{
        alert("Kundkorgen är tom.");
       }
    }
});

(function () {

    let webshopCart = JSON.parse(localStorage.getItem("webshopCart"));
    if (webshopCart != null){
        webshopCart.forEach(item => {putItemInTable(item);
        });
    } 
    sumPrice = webshopCart.map(item => item.antal).reduce((sum, value, i) => 
                        sum + (value * webshopCart.map(item => item.price)[i]), 0).toFixed(2);
    document.getElementById("best-tot-pris").innerText = "$" + sumPrice;
})();

function putItemInTable(item){

    const table = document.getElementById("order-table");
    let newRow = table.insertRow();
    for(let i=0; i<4; i++){
        newRow.insertCell(i);
    }
    var x = newRow.cells;
    x[0].innerText = item.name;
    x[1].innerText = item.antal;
    x[2].innerText = "$" + item.price;
    x[3].innerText = "$" + item.price*item.antal;
    
}
