const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const password2 = document.querySelector("#password2")
const formulario = document.querySelector("form")
const smallemail = document.querySelector("#smallemail")
const smallpass = document.querySelector("#smallpass")
const smallpass2 = document.querySelector("#smallpass2")
const crear = document.querySelector("#crear")
console.log(crear);

crear.disabled = true
crear.classList.add("disable")
function validate(obj) {
    let validatearray = Object.values(validacion)
    if (!validatearray.includes(false)) {
        crear.disabled = false
    }
    else{
        crear.disabled = true
    }
}


const validacion = {
    nombre: false,
    apellido: false,
    email: false,
    password: false,
    password2: false,

}

nombre.addEventListener("input", (e) => {
    if (e.target.value == "") {
        console.log("Este campo esta vacio");
    } else {
        validacion.nombre = true
        console.log(e.target.value);
        }
    validate(validacion)
})
apellido.addEventListener("input", (e) => {
    if (e.target.value == "") {
        console.log("Este campo esta vacio");
    } else {
        validacion.apellido = true
        console.log(e.target.value);
    }
    validate(validacion)
})

email.addEventListener("input", (e) => {
    const validateEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/

    if (validateEmail.test(e.target.value)) {
        validacion.email = true
        smallemail.innerText = ""
        console.log("Email válido");

    } else {

        smallemail.innerText = "El email debe ser del siguiente formato ejemplo@gmail.com "


        console.log("Email inválido");
    }
    validate(validacion)
})

password.addEventListener("input", (e) => {
    const validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/

    console.log(e.target.value);

    if (validatePass.test(e.target.value)) {
        validacion.password = true
        smallpass.innerText = ""
        console.log("Contraseña válida");

    } else {

        smallpass.innerText = "La contraseña debe contener una mayúscula, una misnúscula, un número y entre 8 y 15 caracteres"


        console.log("Contraseña inválida");
    }
    validate(validacion)
})

password2.addEventListener("input", (e) => {
    const validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/

    console.log(e.target.value);

    if (validatePass.test(e.target.value)) {
        validacion.password2 = true
        smallpass2.innerText = ""
        console.log("Contraseña válida");

    } else {

        smallpass2.innerText = "La contraseña debe contener una mayúscula, una misnúscula, un número y entre 8 y 15 caracteres"


        console.log("Contraseña inválida");
    }
    validate(validacion)
})



formulario.addEventListener("submit", (e) => {
    e.preventDefault()
})