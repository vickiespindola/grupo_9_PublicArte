/*Inputs*/
const formulario = document.querySelector(".form")
const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const email = document.querySelector("#email")
const marca = document.querySelector("#marca")
const avatar = document.querySelector("#product-img")

/*small */

const nombresmall = document.querySelector("#nombresmall")
const apellidosmall = document.querySelector("#apellidosmall")
const emailsmall = document.querySelector("#emailsmall")
const marcasmall = document.querySelector("#marcasmall")
const avatarsmall = document.querySelector("#avatarsmall")

const guardar = document.querySelector("#guardar")


function validate(obj) {
    let validatearray = Object.values(obj)
    if (!validatearray.includes(false)) {
        guardar.disabled = false
        guardar.classList.remove("disable")
    } else {
        guardar.disabled = true
    }
}


const validacion = {
    nombre: true,
    apellido: true,
    email: true,
    marca: true,
    avatar: true,
}



nombre.addEventListener("input", (e) => {
    if (e.target.value == "") {
        nombresmall.innerText = "Este campo no puede estár vacío";
        nombre.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.nombre = false;
    } else {
        validacion.nombre = true;
        nombresmall.innerText = " ";
        nombre.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion)
})

apellido.addEventListener("input", (e) => {
    if (e.target.value == "") {
        apellidosmall.innerText = "Este campo no puede estár vacío";
        apellido.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.apellido = false;
    } else {
        validacion.apellido = true;
        apellidosmall.innerText = " ";
        apellido.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion)
})

email.addEventListener("input", (e) => {
    const validateEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/

    if (validateEmail.test(e.target.value)) {
        validacion.email = true;
        emailsmall.innerText = "";
        email.style.border = "3px solid green";
        console.log("Email válido");

    } else {
        validacion.email = false;
        emailsmall.innerText = "El email debe ser del siguiente formato ejemplo@gmail.com ";
        email.style.border = "3px solid red";
        console.log("Email inválido");
    }
    validate(validacion)
})

marca.addEventListener("input", (e) => {
    if (e.target.value == "") {
        marcasmall.innerHTML = "Este campo no puede estár vacío";
        marca.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.marca = false;
    } else {
        validacion.marca = true;
        marcasmall.innerText = " ";
        marca.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion)
})

let regExImg = /\.(jpg|jpeg|png|webp)$/;

avatar.addEventListener("input", (e) => {
    if (!regExImg.exec(avatar.value)) {
        avatarsmall.innerHTML = "Solo se permiten imagenes con extension JPG, PNG, JPEG";
        imagen4small.style.color = "red";
        validacion.avatar = false;
    } else {
        validacion.avatar = true;
        avatarsmall.innerHTML = " ";
        avatar.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion)
})


formulario.addEventListener("submit", (e) => {

})