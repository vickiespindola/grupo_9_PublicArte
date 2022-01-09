const $ = id => document.getElementById(id)

$("product-img").addEventListener('change', (e) => {

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => $("img-preview").src = reader.result
    changeImage(e.target.name, e.target.files)

})

$("product-sub-img-1").addEventListener('change', (e) => {

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => $("img-preview2").src = reader.result
    changeImage(e.target.name, e.target.files)

})

$("product-sub-img-2").addEventListener('change', (e) => {

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => $("img-preview3").src = reader.result
    changeImage(e.target.name, e.target.files)

})

$("product-sub-img-3").addEventListener('change', (e) => {

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => $("img-preview4").src = reader.result
    changeImage(e.target.name, e.target.files)

})