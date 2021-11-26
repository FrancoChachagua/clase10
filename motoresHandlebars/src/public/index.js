//Form uno (POST)
const $divPost = document.querySelector('#formPost')
const $formOne = document.querySelector('#addProducts')

$divPost.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData($formOne);
    fetch('http://localhost:8080/productos',{
        method:'POST',
        body:formData,
    })
    .then(alert(`Usted ha añadido un nuevo producto!`))
    .then(result =>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })
})