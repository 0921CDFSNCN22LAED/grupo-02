window.addEventListener('load', () => {
    //REGISTER

    const name = document.querySelector('#register #name');
    // const nameError = document.querySelector('#nameError');
    const email = document.querySelector('#register #email');
    const passReg = document.querySelector('#register #passReg');
    const registerButton = document.querySelector('#register button');
    const register = document.querySelector('#register');

    const errors = {};

    name.addEventListener('blur', () => {
        delete errors.name;
        if (name.value.length < 2) {
            errors.name =
                'El nombre de usuario debe tener por lo menos 2 caracteres';
        }
        if (validator.isEmpty(name.value)) {
            errors.name = 'Tenés que ingresar un nombre de usuario';
        }
        // PREGUNTA: por qué funciona nameError sin haberlo capturado?
        if (errors.name) {
            nameError.classList.remove('d-none');
            nameError.innerHTML = errors.name;
        } else {
            nameError.classList.add('d-none');
            nameError.innerHTML = '';
        }
    });
    email.addEventListener('blur', async () => {
        delete errors.email;
        const response = await fetch(
            `https://mundo-sapien.herokuapp.com/api/users/email?email=${email.value}`
        );
        const user = await response.json();
        if (user !== null) {
            errors.email =
                'Ya hay un usuario registrado con este correo electrónico';
        }

        if (!validator.isEmail(email.value)) {
            errors.email = 'Tenés que ingresar un correo electrónico valido';
        }
        if (validator.isEmpty(email.value)) {
            errors.email = 'Tenés que ingresar un correo electrónico';
        }
        if (errors.email) {
            emailError.classList.remove('d-none');
            emailError.innerHTML = errors.email;
        } else {
            emailError.classList.add('d-none');
            emailError.innerHTML = '';
        }
    });
    passReg.addEventListener('blur', () => {
        delete errors.passReg;
        if (!validator.isStrongPassword(passReg.value)) {
            errors.passReg =
                'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial';
        }
        if (passReg.value.length < 8) {
            errors.passReg =
                'La contraseña debe tener por lo menos 8 caracteres';
        }
        if (validator.isEmpty(passReg.value)) {
            errors.passReg = 'Tenés que ingresar una contraseña';
        }
        if (errors.passReg) {
            passError.classList.remove('d-none');
            passError.innerHTML = errors.passReg;
        } else {
            passError.classList.add('d-none');
            passError.innerHTML = '';
        }
    });

    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (Object.values(errors).length == 0) register.submit();
    });

    //LOGIN

    const emailLog = document.querySelector('#login #emailLog');
    const passLog = document.querySelector('#login #passLog');
    const loginButton = document.querySelector('#login button');
    const login = document.querySelector('#login');

    const logErrors = {};

    emailLog.addEventListener('blur', () => {
        delete logErrors.emailLogError;

        if (!validator.isEmail(emailLog.value)) {
            logErrors.emailLogError =
                'Tenés que ingresar un correo electrónico valido';
        }
        if (validator.isEmpty(emailLog.value)) {
            logErrors.emailLogError =
                'Tenés que ingresar un correo electrónico';
        }
        if (logErrors.emailLogError) {
            emailErrorLog.classList.remove('d-none');
            emailErrorLog.innerHTML = logErrors.emailLogError;
        } else {
            emailErrorLog.classList.add('d-none');
            emailErrorLog.innerHTML = '';
        }
    });
    passLog.addEventListener('blur', () => {
        delete logErrors.passLogError;

        if (!validator.isStrongPassword(passLog.value)) {
            logErrors.passLogError =
                'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial';
        }
        if (passLog.value.length < 8) {
            logErrors.passLogError =
                'La contraseña debe tener por lo menos 8 caracteres';
        }
        if (validator.isEmpty(passLog.value)) {
            logErrors.passLogError = 'Tenés que ingresar una contraseña';
        }
        if (logErrors.passLogError) {
            passErrorLog.classList.remove('d-none');
            passErrorLog.innerHTML = logErrors.passLogError;
        } else {
            passErrorLog.classList.add('d-none');
            passErrorLog.innerHTML = '';
        }
    });

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (Object.values(logErrors).length == 0) login.submit();
    });
});
