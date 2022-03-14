window.addEventListener('load', () => {
    const deleteForms = document.querySelectorAll('.deleteForm');

    for (let delForm of deleteForms) {
        delForm.addEventListener('submit', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: '!No te vayas!',
                text: 'Si querés cancelar tu cuenta hablá con tu adulto responsable',
            });
        });
    }
});
