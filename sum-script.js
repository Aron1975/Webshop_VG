window.onload = function () {
    const person = JSON.parse(localStorage.getItem("person"));
    console.log(person);
    var urlParams = new URLSearchParams(window.location.search);
    var sumPrice = urlParams.get('sumPrice');
    document.getElementById('namn').innerText = person.firstname + " " + person.surname;
    document.getElementById('email').innerText = person.email;
    document.getElementById('telefon').innerText = person.phonenumber;
    document.getElementById('adress').innerText = person.streetaddress;
    document.getElementById('adress2').innerText = person.zipcode + " " + person.location;
    document.getElementById('produkt-paid').innerText = "$" + sumPrice;

    localStorage.removeItem("webshopCart");
}