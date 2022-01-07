window.addEventListener('load', () => {

    console.log("Estoy vinculado");

    let forms = document.querySelectorAll('#eliminar-producto');
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', event => {
            event.preventDefault();
            Swal.fire({
                customClass: {
                    confirmButton: 'swalBtnColor',
                    cancelButton: 'swalBtnColor'
                },

                title: '¿Estas segur@ que quieres eliminar el producto?',
                text: "¡Esta acción es irreversible!",
                icon: 'warning',
                iconColor: '#ef7437',
                background: "#ffffff",
                showCancelButton: true,
                confirmButtonColor: '#ef7437',
                cancelButtonColor: '#2c2c2c',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },

            }).then((result) => {

                if (result.isConfirmed) {
                    forms[i].submit();
                }

            })
        })
    }
})