const formulario = document.querySelector(".form")
const enviar = document.querySelector("#enviar")
const titulo = document.querySelector("#titulo")
const titulosmall = document.querySelector("#titulosmall")
const categoria = document.querySelector("#categoria")
const categoriasmall = document.querySelector("#categoriasmall")
const descripcion = document.querySelector("#descripcion")
const descripcionsmall = document.querySelector("#descripcionsmall")
const imagenes = document.querySelector("#imagen")
const imagenesmall = document.querySelector("#imagensmall")
const precio = document.querySelector("#precio")
const preciosmall = document.querySelector("#preciosmall")
const marca = document.querySelector("#marca")
const marcasmall = document.querySelector("#marcasmall")



console.log(enviar);

enviar.disabled = true
enviar.classList.add("disable")

function validate(obj) {
    let validatearray = Object.values(obj)
    if (!validatearray.includes(false)) {
        enviar.disabled = false 
        enviar.classList.remove("disable")
    } else {
        enviar.disabled = true
    }
}


const validacion = {
    titulo: false,
    categoria: false,
    descripcion: false,
    precio: false,
    imagenes: false,
   


} 

titulo.addEventListener("input", (e) => {
    if (e.target.value == "") {
        titulosmall.innerText = "Este campo no puede estár vacío"
        titulo.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.titulo = true
        titulosmall.innerText = " "
        titulo.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
 })

 
categoria.addEventListener("input", (e) => {
    if (e.target.value == "") {
        categoriasmall.innerText = "Este campo no puede estár vacío"
        categoria.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.categoria = true
        categoriasmall.innerText = " "
        categoria.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
})

descripcion.addEventListener("input", (e) => {
    if (e.target.value == "") {
        descripcionsmall.innerText = "Este campo no puede estár vacío"
        descripcion.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.descripcion = true
        descripcionsmall.innerText = " "
        descripcion.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
})

 imagenes.addEventListener("input", (e) => {
    if (e.target.value == "") {
        imagenesmall.innerText = "Este campo no puede estár vacío"
        imagenes.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.imagenes = true
        imagenesmall.innerText = " "
        imagenes.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
}) 

precio.addEventListener("input", (e) => {
    if (e.target.value == "") {
        preciosmall.innerText = "Este campo no puede estár vacío"
        precio.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.precio = true
        preciosmall.innerText = " "
        precio.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
})



 formulario.addEventListener("submit", (e) => { 
    
})