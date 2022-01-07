const formulario = document.querySelector("form")
const enviar= document.querySelector ("#enviar")
const titulo = document.querySelector("#titulo")
const titulosmall= document.querySelector ("#titulosmall")
const categoria = document.querySelector("#categoria")
const categoriasmall= document.querySelector ("#categoriasmall")
const descripcion = document.querySelector("#descripcion")
const descripcionsmall= document.querySelector ("#descripcionsmall")
const imagenes = document.querySelector("#imagen")
const imagenesmall= document.querySelector ("#imagensmall")
const precio = document.querySelector("#precio")
const preciosmall= document.querySelector ("#preciosmall")




console.log(titulo);

enviar.disabled = true 

function validate(obj) {
    let validatearray = Object.values(validacion)
    if (!validatearray.includes(false)) {
        enviar.disabled = false
        
   enviar.classList.add("disable")
    }
    else{
        enviar.disabled = true
        enviar.classList.add("enviar")
    }
}


const validacion = {
    titulo: false,
    categoria: false,
    descripcion: false,
    imagen: false,
    precio: false,

}

titulo.addEventListener("input", (e) => {
    if (e.target.value == "") {
        titulosmall.innerText = "Este campo no puede estár vacío"
        titulo.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.nombre = true
        titulosmall.innerText = " "
        titulo.style.border = "3px solid green"
        console.log(e.target.value);
        }
    validate(validacion)
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
})
