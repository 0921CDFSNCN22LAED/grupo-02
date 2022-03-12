import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.addEventListener('load', function () {
    //REGISTER

    var name = document.querySelector('#register #name');
    // const nameError = document.querySelector('#nameError');
    var email = document.querySelector('#register #email');
    var passReg = document.querySelector('#register #passReg');
    var registerButton = document.querySelector('#register button');
    var register = document.querySelector('#register');

    var errors = {};

    name.addEventListener('blur', function () {
        delete errors.name;
        if (name.value.length < 2) {
            errors.name = 'El nombre de usuario debe tener por lo menos 2 caracteres';
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
    email.addEventListener('blur', _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var response, user;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        delete errors.email;
                        _context.next = 3;
                        return fetch('http://localhost:3001/api/users/email?email=' + email.value);

                    case 3:
                        response = _context.sent;
                        _context.next = 6;
                        return response.json();

                    case 6:
                        user = _context.sent;

                        if (user !== null) {
                            errors.email = 'Ya hay un usuario registrado con este correo electrónico';
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

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    })));
    passReg.addEventListener('blur', function () {
        delete errors.passReg;
        if (!validator.isStrongPassword(passReg.value)) {
            errors.passReg = 'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial';
        }
        if (passReg.value.length < 8) {
            errors.passReg = 'La contraseña debe tener por lo menos 8 caracteres';
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

    registerButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (Object.values(errors).length == 0) register.submit();
    });

    //LOGIN

    var emailLog = document.querySelector('#login #emailLog');
    var passLog = document.querySelector('#login #passLog');
    var loginButton = document.querySelector('#login button');
    var login = document.querySelector('#login');

    var logErrors = {};

    emailLog.addEventListener('blur', function () {
        delete logErrors.emailLogError;

        if (!validator.isEmail(emailLog.value)) {
            logErrors.emailLogError = 'Tenés que ingresar un correo electrónico valido';
        }
        if (validator.isEmpty(emailLog.value)) {
            logErrors.emailLogError = 'Tenés que ingresar un correo electrónico';
        }
        if (logErrors.emailLogError) {
            emailErrorLog.classList.remove('d-none');
            emailErrorLog.innerHTML = logErrors.emailLogError;
        } else {
            emailErrorLog.classList.add('d-none');
            emailErrorLog.innerHTML = '';
        }
    });
    passLog.addEventListener('blur', function () {
        delete logErrors.passLogError;

        if (!validator.isStrongPassword(passLog.value)) {
            logErrors.passLogError = 'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial';
        }
        if (passLog.value.length < 8) {
            logErrors.passLogError = 'La contraseña debe tener por lo menos 8 caracteres';
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

    loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (Object.values(logErrors).length == 0) login.submit();
    });
});