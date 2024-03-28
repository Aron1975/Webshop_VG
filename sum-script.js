window.onload = function () {
    const person = JSON.parse(localStorage.getItem("person"));
    console.log(person);
    //localStorage.getItem("namn")
    document.getElementById('namn').innerText = person.firstname + " " + person.surname;
    document.getElementById('email').innerText = person.email;
    document.getElementById('telefon').innerText = person.phonenumber;
    document.getElementById('adress').innerText = person.streetaddress;
    document.getElementById('adress2').innerText = person.zipcode + " " + person.location;
    //document.getElementById('produkt').innerText = person.;

}