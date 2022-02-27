window.addEventListener('load', () => {
    //PRODUCTS
    const createProductButton = document.querySelector(
        '#create-product-form button'
    );
    const createProductForm = document.querySelector('#create-product-form');

    const inputs = document.querySelectorAll(
        '#create-product-form input, #create-product-form select, #create-product-form textarea'
    );

    const errors = {};

    const extensionRegEx = /(?:\.([^.]+))?$/;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];

    for (let input of inputs) {
        input.addEventListener('blur', (e) => {
            let errorMsg;
            const errorP = document.querySelector(`#${e.target.id} ~ p`);
            switch (e.target.id) {
                case 'title':
                    if (validator.isEmpty(e.target.value)) {
                        errorMsg =
                            'Tenés que ingresar el nombre o tema de la clase';
                    } else if (e.target.value.length < 5) {
                        errorMsg =
                            'El título de la clase debe tener por lo menos 5 caracteres';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'grade':
                    if (
                        validator.isEmpty(e.target.value) ||
                        e.target.value == 'Seleccioná el año'
                    ) {
                        errorMsg = 'Tenés que elegir un grado';
                    }
                    break;
                case 'subject':
                    if (
                        validator.isEmpty(e.target.value) ||
                        e.target.value == 'Seleccioná la materia'
                    ) {
                        errorMsg = 'Tenés que elegir un grado';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'contents':
                    if (validator.isEmpty(e.target.value)) {
                        errorMsg = 'Ingresá al menos un contenido';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'descriptionShort':
                    if (e.target.value.length < 20) {
                        errorMsg =
                            'La descripción corta deberá tener por lo menos 20 caracteres';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'price':
                    if (validator.isEmpty(e.target.value)) {
                        errorMsg = 'Ingresá el precio de la clase';
                    } else if (!validator.isCurrency(e.target.value)) {
                        errorMsg = 'El precio debe ser un número';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'video':
                    acceptedExtensions = ['.jpg', '.png', '.gif'];
                    let [videoFileExtension] = extensionRegEx.exec(
                        e.target.value
                    );
                    if (
                        e.target.value != '' &&
                        !acceptedExtensions.includes(videoFileExtension)
                    ) {
                        errorMsg = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                            ', '
                        )}`;
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'preview':
                    acceptedExtensions = ['.jpg', '.png', '.gif'];
                    let [previewFileExtension] = extensionRegEx.exec(
                        e.target.value
                    );
                    if (
                        e.target.value != '' &&
                        !acceptedExtensions.includes(previewFileExtension)
                    ) {
                        errorMsg = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                            ', '
                        )}`;
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'bonus':
                    acceptedExtensions = ['.jpg', '.png', '.gif'];
                    let [bonusFileExtension] = extensionRegEx.exec(
                        e.target.value
                    );
                    if (
                        e.target.value != '' &&
                        !acceptedExtensions.includes(bonusFileExtension)
                    ) {
                        errorMsg = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                            ', '
                        )}`;
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'teacherFirstName':
                    if (validator.isEmpty(e.target.value)) {
                        errorMsg = 'Ingresá tu nombre';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'teacherLastName':
                    if (validator.isEmpty(e.target.value)) {
                        errorMsg = 'Ingresá tu apellido';
                    } else {
                        errorMsg = null;
                    }
                    break;
                case 'teacherEmail':
                    if (validator.isEmpty(e.target.value)) {
                        errorMsg = 'Ingresá tu email';
                    } else if (!validator.isEmail(e.target.value)) {
                        errorMsg =
                            'Debes utilizar un correo electrónico valido';
                    } else {
                        errorMsg = null;
                    }
                    break;
            }
            if (errorP) {
                errorP.innerHTML = errorMsg;
                if (errorMsg) {
                    errors[e.target.id] = errorMsg;
                    errorP.classList.remove('d-none');
                } else {
                    errorP.classList.add('d-none');
                    delete errors[e.target.id];
                }
            }
        });
    }

    createProductButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (Object.values(errors).length == 0) {
            createProductForm.submit();
        } else {
            // alert('completa los campos correctamente');
        }
    });
});
