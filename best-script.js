  let submitBtn = document.getElementById('submit-button');
  let form = document.getElementById("myform");
  let person = {};

  submitBtn.addEventListener('click', (event) => {
    let valid = true;
    for(f of form) {
        person[f.id]=f.value;
        if(!f.checkValidity()){
            valid = false;
        }
    }
    if(valid){
        var urlParams = new URLSearchParams(window.location.search);
        var productId = urlParams.get('productId');
        window.location.href = `summary.html?productId=${productId}`;
        localStorage.setItem("person", JSON.stringify(person));
    }
});



