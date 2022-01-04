const email = document.querySelector("#email")
const smallemail = document.querySelector("#smallemail")
const password = document.querySelector("#password")
const smallpass = document.querySelector("#smallpass")
const insesion = document.querySelector("#sesion")
const formulario = document.querySelector("form")

console.log(password);

insesion.disabled = true
insesion.classList.add("disable")

function validate(obj) {
    let validatearray = Object.values(validacion)
    if (!validatearray.includes(false)) {
        insesion.disabled = false
    } else {
        insesion.disabled = true
    }
}


const validacion = {
    email: false,
    password: false,

}

email.addEventListener("input", (e) => {
    const validateEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/
    if (validateEmail.test(e.target.value)) {
        validacion.email = true
        smallemail.innerText = ""
        console.log("Email válido");

    } else {

        smallemail.innerText = "El email debe ser del siguiente formato ejemplo@gmail.com "


        console.log("Email inválido")
    }
    validate(validacion);


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


    formulario.addEventListener("submit", (e) => {
        e.preventDefault()
    })
})