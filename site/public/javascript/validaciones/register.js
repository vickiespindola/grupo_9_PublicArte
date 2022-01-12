const nombre = document.querySelector("#nombre")
const nombresmall = document.querySelector("#nombresmall")
const apellido = document.querySelector("#apellido")
const apellidosmall = document.querySelector("#apellidosmall")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const password2 = document.querySelector("#password2")
const formulario = document.querySelector("form")
const smallemail = document.querySelector("#smallemail")
const smallpass = document.querySelector("#smallpass")
const smallpass2 = document.querySelector("#smallpass2")
const crear = document.querySelector("#crear")
const mostrar = document.getElementById("mostrar")
const mostrar2 = document.getElementById("mostrar2")

/* console.log(crear); */

function validate(obj) {
    let validatearray = Object.values(validacion)
    if (!validatearray.includes(false)) {
        crear.disabled = false
        crear.classList.remove("disable")
    } else {
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

function mostrarcontraseña() {

    let pass = document.getElementById("password")



    if (pass.type == "password") {
        pass.type = "text"
    } else {


        pass.type = "password"
    }

}
mostrar.onclick = () => {
    mostrarcontraseña()
}

function verpass() {

    let pass2 = document.getElementById("password2")
    if (pass2.type == "password") {
        pass2.type = "text"

    } else {
        pass2.type = "password"
    }
}
mostrar2.onclick = () => {
    verpass()
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
        smallemail.innerText = "";
        email.style.border = "3px solid green";
        console.log("Email válido");

    } else {
        validacion.email = false;
        smallemail.innerText = "El email debe ser del siguiente formato ejemplo@gmail.com ";
        email.style.border = "3px solid red";
        console.log("Email inválido");
    }
    validate(validacion)
})

password.addEventListener("input", (e) => {
    const validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/

    console.log(e.target.value);

    if (validatePass.test(e.target.value)) {
        validacion.password = true;
        smallpass.innerText = "";
        password.style.border = "3px solid green";
        console.log("Contraseña válida");

    } else {
        validacion.password = true;
        smallpass.innerText = "La contraseña debe contener una mayúscula, una misnúscula, un número y entre 8 y 15 caracteres";
        password.style.border = "3px solid red";
        console.log("Contraseña inválida");
    }
    validate(validacion)
})

password2.addEventListener("input", (e) => {
    const validatePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}$/

    console.log(e.target.value);

    if (validatePass.test(e.target.value)) {
        validacion.password2 = true;
        smallpass2.innerText = "";
        password2.style.border = "3px solid green";
        console.log("Contraseña válida");

    } else {
        validacion.password2 = false;
        smallpass2.innerText = "La contraseña debe contener una mayúscula, una misnúscula, un número y entre 8 y 15 caracteres";
        password2.style.border = "3px solid red";
        console.log("Contraseña inválida");
    }
    validate(validacion)
})


formulario.addEventListener("submit", (e) => {
    e.preventDefault()
})