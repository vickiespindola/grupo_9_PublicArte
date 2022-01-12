const formulario = document.querySelector(".form");
const enviardatos = document.querySelector("#enviardatos");
const titulo = document.querySelector("#titulo");
const titulosmall = document.querySelector("#titulosmall");
const marca = document.querySelector("#marca");
const marcasmall = document.querySelector("#marcasmall");
const categoria = document.querySelector("#categoria");
const categoriasmall = document.querySelector("#categoriasmall");
const descripcion = document.querySelector("#descripcion");
const descripcionsmall = document.querySelector("#descripcionsmall");
const precio = document.querySelector("#precio");
const preciosmall = document.querySelector("#preciosmall");

function validate(obj) {
    let validatearray = Object.values(obj);
    if (!validatearray.includes(false)) {
        enviardatos.disabled = false;
        enviardatos.classList.remove("disable");
    } else {
        enviardatos.disabled = true;
    }
}

const validacion = {
    titulo: true,
    categoria: true,
    descripcion: true,
    precio: true,
    imagenes: true,
};

titulo.addEventListener("input", (e) => {
    if (e.target.value == "") {
        titulosmall.innerText = "Este campo no puede estár vacío";
        titulo.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.titulo = false;
    } else {
        validacion.titulo = true;
        titulosmall.innerText = " ";
        titulo.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion);
});

categoria.addEventListener("input", (e) => {
    if (e.target.value == "") {
        categoriasmall.innerText = "Este campo no puede estár vacío";
        categoria.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.categoria = false;
    } else {
        validacion.categoria = true;
        categoriasmall.innerText = " ";
        categoria.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion);
});

descripcion.addEventListener("input", (e) => {
    if (e.target.value == "") {
        descripcionsmall.innerText = "Este campo no puede estár vacío";
        descripcion.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.descripcion = false;
    } else {
        validacion.descripcion = true;
        descripcionsmall.innerText = " ";
        descripcion.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion);
});

precio.addEventListener("input", (e) => {
    if (e.target.value == "") {
        preciosmall.innerText = "Este campo no puede estár vacío";
        precio.style.border = "3px solid red";
        console.log("Este campo esta vacio");
        validacion.precio = false;
    } else {
        validacion.precio = true;
        preciosmall.innerText = " ";
        precio.style.border = "3px solid green";
        console.log(e.target.value);
    }
    validate(validacion);
});

/* Imagenes */
let regExImg = /\.(jpg|jpeg|png|webp)$/; //validar el formato de archivos con una expresion regular

const imagen1 = document.querySelector("#product-img");
const imagen2 = document.querySelector("#product-sub-img-1");
const imagen3 = document.querySelector("#product-sub-img-2");
const imagen4 = document.querySelector("#product-sub-img-3");

/* Small */
const imagen1small = document.getElementById("imagen1small");
const imagen2small = document.getElementById("imagen2small");
const imagen3small = document.getElementById("imagen3small");
const imagen4small = document.getElementById("imagen4small");

/* Imagen 1 */
imagen1.addEventListener("change", () => {
    if (!regExImg.exec(imagen1.value)) {
        imagen1small.innerHTML = "Solo se permiten imagenes con extension JPG, PNG, JPEG, WEBP";
        imagen1small.style.color = "red";
        validacion.imagenes = false;
    } else {
        validacion.imagenes = true;
        imagen1small.innerHTML = "";
    }
    validate(validacion);
});

/* Imagen 2 */
imagen2.addEventListener("change", () => {
    if (!regExImg.exec(imagen2.value)) {
        imagen2small.innerHTML = "Solo se permiten imagenes con extension JPG, PNG, JPEG";
        imagen2small.style.color = "red";
        validacion.imagenes = false;
    } else {
        validacion.imagenes = true;
        imagen2small.innerHTML = "";
    }

    validate(validacion);
});

/* Imagen 3 */
imagen3.addEventListener("change", () => {
    if (!regExImg.exec(imagen3.value)) {
        imagen3small.innerHTML = "Solo se permiten imagenes con extension JPG, PNG, JPEG";
        imagen3small.style.color = "red";
        validacion.imagenes = false;
    } else {
        validacion.imagenes = true;
        imagen3small.innerHTML = "";
    }

    validate(validacion);
});

/* Imagen 4 */
imagen4.addEventListener("change", () => {
if (!regExImg.exec(imagen4.value)) {
    imagen4small.innerHTML = "Solo se permiten imagenes con extension JPG, PNG, JPEG";
    imagen4small.style.color = "red";
    validacion.imagenes = false;
} else {
    validacion.imagenes = true;
    imagen4small.innerHTML = "";
}

validate(validacion);
});