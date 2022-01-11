const formulario = document.querySelector(".form")
const nombre = document.querySelector("#nombre")
const nombresmall = document.querySelector("#nombresmall")
const apellido = document.querySelector("#apellido")
const apellidosmall = document.querySelector("#apellidosmall")
const email = document.querySelector("#email")
const emailsmall = document.querySelector("#emailsmall")
const marca = document.querySelector("#marca")
const marcasmall = document.querySelector("#marcasmall")
const avatar =document.querySelector("#avatar")
const avatarsmall =document.querySelector("#avatarsmall")

const guardar = document.querySelector("#guardar")



console.log(guardar);

guardar.disabled= true
guardar.classList.add("disable")

function validate(obj) {
    let validatearray = Object.values(obj)
    if (!validatearray.includes(false)) {
        guardar.disabled = false
        guardar.classList.remove("disable")
    }
    else{
        guardar.disabled = true
    }
}


const validacion = {
    nombre: false,
    apellido: false,
    email: false,
    marca: false,
    avatar: false,

}



nombre.addEventListener("input", (e) => {
    if (e.target.value == "") {
    nombresmall.innerText = "Este campo no puede estár vacío"
        nombre.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.nombre = true
        nombresmall.innerText = " "
        nombre.style.border = "3px solid green"
        console.log(e.target.value);
        }
    validate(validacion)
})
apellido.addEventListener("input", (e) => {
    if (e.target.value == "") {
        apellidosmall.innerText = "Este campo no puede estár vacío"
        apellido.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.apellido = true
        apellidosmall.innerText = " "
        apellido.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
})

email.addEventListener("input", (e) => {
    const validateEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/

    if (validateEmail.test(e.target.value)) {
        validacion.email = true
        emailsmall.innerText = ""
        email.style.border = "3px solid green"
        console.log("Email válido");

    } else {

        emailsmall.innerText = "El email debe ser del siguiente formato ejemplo@gmail.com "
        email.style.border = "3px solid red"
              
        console.log("Email inválido");
    }
    validate(validacion)
})
marca.addEventListener("input", (e) => {
    if (e.target.value == "") {
    marcasmall.innerText = "Este campo no puede estár vacío"
        marca.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.marca = true
        marcasmall.innerText = " "
        marca.style.border = "3px solid green"
        console.log(e.target.value);
        }
    validate(validacion)
})

avatar.addEventListener("input", (e) => {
    if (e.target.value == "") {
        avatarsmall.innerText = "Este campo no puede estár vacío"
        avatar.style.border = "3px solid red"
        console.log("Este campo esta vacio");
    } else {
        validacion.avatar = true
        avatarsmall.innerText = " "
        avatar.style.border = "3px solid green"
        console.log(e.target.value);
    }
    validate(validacion)
}) 




formulario.addEventListener("submit", (e) => {
   
})