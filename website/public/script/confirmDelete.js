window.addEventListener('load', () => {
    const deleteForms = document.querySelectorAll('.deleteForm');

    for (let delForm of deleteForms) {
        delForm.addEventListener('submit', function (e) {
            e.preventDefault();
            Swal.fire({
                title: '¿Estás seguro que querés eliminar este perfil?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Si',
                denyButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.submit();
                }
            });
        });
    }
});
