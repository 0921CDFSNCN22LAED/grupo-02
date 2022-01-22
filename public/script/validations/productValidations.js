window.addEventListener('load', () => {
    //PRODUCTS

    const title = document.querySelector('#title');
    const grade = document.querySelector('#grade');
    const subject = document.querySelector('#subject');
    const contents = document.querySelector('#contents');
    const description_short = document.querySelector('#description_short');
    const price = document.querySelector('#price');
    const video = document.querySelector('#video');
    const videoError = document.querySelector('#videoError');
    const preview = document.querySelector('#preview');
    const bonus = document.querySelector('#bonus');
    const teacherFirstName = document.querySelector('#teacherFirstName');
    const teacherLastName = document.querySelector('#teacherLastName');
    const teacherEmail = document.querySelector('#teacherEmail');
    const createProductButton = document.querySelector(
        '#create-product-form button'
    );
    const createProductForm = document.querySelector('#create-product-form');

    const errors = {};

    title.addEventListener('blur', () => {
        delete errors.title;
        if (title.value.length < 5) {
            errors.title =
                'El título de la clase debe tener por lo menos 5 caracteres';
        }
        if (validator.isEmpty(title.value)) {
            errors.title = 'Tenés que ingresar el nombre o tema de la clase';
        }
        if (errors.title) {
            titleError.classList.remove('d-none');
            titleError.innerHTML = errors.title;
        } else {
            titleError.classList.add('d-none');
            titleError.innerHTML = '';
        }
    });
    grade.addEventListener('blur', () => {
        delete errors.grade;
        if (
            validator.isEmpty(grade.value) ||
            grade.value == 'Seleccioná el año'
        ) {
            errors.grade = 'Tenés que elegir un grado';
        }
        if (errors.grade) {
            gradeError.classList.remove('d-none');
            gradeError.innerHTML = errors.grade;
        } else {
            gradeError.classList.add('d-none');
            gradeError.innerHTML = '';
        }
    });
    subject.addEventListener('blur', () => {
        delete errors.subject;
        if (
            validator.isEmpty(subject.value) ||
            subject.value == 'Seleccioná la materia'
        ) {
            errors.subject = 'Tenés que elegir un grado';
        }
        if (errors.subject) {
            subjectError.classList.remove('d-none');
            subjectError.innerHTML = errors.subject;
        } else {
            subjectError.classList.add('d-none');
            subjectError.innerHTML = '';
        }
    });
    contents.addEventListener('blur', () => {
        delete errors.contents;
        if (validator.isEmpty(contents.value)) {
            errors.contents = 'Ingresá al menos un contenido';
        }
        if (errors.contents) {
            contentsError.classList.remove('d-none');
            contentsError.innerHTML = errors.contents;
        } else {
            contentsError.classList.add('d-none');
            contentsError.innerHTML = '';
        }
    });
    description_short.addEventListener('blur', () => {
        delete errors.description_short;

        if (description_short.value.length < 20) {
            errors.description_short =
                'La descripción corta deberá tener por lo menos 20 caracteres';
        }
        if (errors.description_short) {
            descriptionError.classList.remove('d-none');
            descriptionError.innerHTML = errors.description_short;
        } else {
            descriptionError.classList.add('d-none');
            descriptionError.innerHTML = '';
        }
    });
    price.addEventListener('blur', () => {
        delete errors.price;
        if (!validator.isCurrency(price.value)) {
            errors.price = 'El precio debe ser un número';
        }
        if (validator.isEmpty(price.value)) {
            errors.price = 'Ingresá el precio de la clase';
        }
        if (errors.price) {
            priceError.classList.remove('d-none');
            priceError.innerHTML = errors.price;
        } else {
            priceError.classList.add('d-none');
            priceError.innerHTML = '';
        }
    });
    const extensionRegEx = /(?:\.([^.]+))?$/;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];
    video.addEventListener('input', () => {
        let [fileExtension] = extensionRegEx.exec(video.value);
        delete errors.video;
        if (!acceptedExtensions.includes(fileExtension)) {
            errors.video = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                ', '
            )}`;
        }
        if (errors.video) {
            videoError.classList.remove('d-none');
            videoError.innerHTML = errors.video;
        } else {
            videoError.classList.add('d-none');
            videoError.innerHTML = '';
        }
    });
    preview.addEventListener('input', () => {
        let [fileExtension] = extensionRegEx.exec(preview.value);
        delete errors.preview;
        if (!acceptedExtensions.includes(fileExtension)) {
            errors.preview = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                ', '
            )}`;
        }
        if (errors.preview) {
            previewError.classList.remove('d-none');
            previewError.innerHTML = errors.preview;
        } else {
            previewError.classList.add('d-none');
            previewError.innerHTML = '';
        }
    });

    bonus.addEventListener('input', () => {
        let [fileExtension] = extensionRegEx.exec(bonus.value);
        delete errors.bonus;
        if (!acceptedExtensions.includes(fileExtension)) {
            errors.bonus = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                ', '
            )}`;
        }
        if (errors.bonus) {
            bonusError.classList.remove('d-none');
            bonusError.innerHTML = errors.bonus;
        } else {
            bonusError.classList.add('d-none');
            bonusError.innerHTML = '';
        }
    });
    teacherFirstName.addEventListener('blur', () => {
        delete errors.teacherFirstName;
        if (validator.isEmpty(teacherFirstName.value)) {
            errors.teacherFirstName = 'Ingresá tu nombre';
        }
        if (errors.teacherFirstName) {
            teacherFirstNameError.classList.remove('d-none');
            teacherFirstNameError.innerHTML = errors.teacherFirstName;
        } else {
            teacherFirstNameError.classList.add('d-none');
            teacherFirstNameError.innerHTML = '';
        }
    });
    teacherLastName.addEventListener('blur', () => {
        delete errors.teacherLastName;
        if (validator.isEmpty(teacherLastName.value)) {
            errors.teacherLastName = 'Ingresá tu apellido';
        }
        if (errors.teacherLastName) {
            teacherLastNameError.classList.remove('d-none');
            teacherLastNameError.innerHTML = errors.teacherLastName;
        } else {
            teacherLastNameError.classList.add('d-none');
            teacherLastNameError.innerHTML = '';
        }
    });
    teacherEmail.addEventListener('blur', () => {
        delete errors.teacherEmail;
        if (!validator.isEmail(teacherEmail.value)) {
            errors.teacherEmail = 'Debes utilizar un correo electrónico valido';
        }
        if (validator.isEmpty(teacherEmail.value)) {
            errors.teacherEmail = 'Ingresá tu email';
        }
        if (errors.teacherEmail) {
            teacherEmailError.classList.remove('d-none');
            teacherEmailError.innerHTML = errors.teacherEmail;
        } else {
            teacherEmailError.classList.add('d-none');
            teacherEmailError.innerHTML = '';
        }
    });

    createProductButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (Object.values(errors).length == 0) createProductForm.submit();
    });
});
