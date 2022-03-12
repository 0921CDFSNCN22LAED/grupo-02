var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.addEventListener('load', function () {
    //PRODUCTS
    var createProductButton = document.querySelector('#create-product-form button');
    var createProductForm = document.querySelector('#create-product-form');

    var inputs = document.querySelectorAll('#create-product-form input, #create-product-form select, #create-product-form textarea');

    var errors = {};

    var extensionRegEx = /(?:\.([^.]+))?$/;
    var acceptedExtensions = ['.jpg', '.png', '.gif'];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var input = _step.value;

            input.addEventListener('blur', function (e) {
                var errorMsg = void 0;
                var errorP = document.querySelector('#' + e.target.id + ' ~ p');
                switch (e.target.id) {
                    case 'title':
                        if (validator.isEmpty(e.target.value)) {
                            errorMsg = 'Tenés que ingresar el nombre o tema de la clase';
                        } else if (e.target.value.length < 5) {
                            errorMsg = 'El título de la clase debe tener por lo menos 5 caracteres';
                        } else {
                            errorMsg = null;
                        }
                        break;
                    case 'grade':
                        if (validator.isEmpty(e.target.value) || e.target.value == 'Seleccioná el año') {
                            errorMsg = 'Tenés que elegir un grado';
                        }
                        break;
                    case 'subject':
                        if (validator.isEmpty(e.target.value) || e.target.value == 'Seleccioná la materia') {
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
                            errorMsg = 'La descripción corta deberá tener por lo menos 20 caracteres';
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

                        var _extensionRegEx$exec = extensionRegEx.exec(e.target.value),
                            _extensionRegEx$exec2 = _slicedToArray(_extensionRegEx$exec, 1),
                            videoFileExtension = _extensionRegEx$exec2[0];

                        if (e.target.value != '' && !acceptedExtensions.includes(videoFileExtension)) {
                            errorMsg = 'Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', ');
                        } else {
                            errorMsg = null;
                        }
                        break;
                    case 'preview':
                        acceptedExtensions = ['.jpg', '.png', '.gif'];

                        var _extensionRegEx$exec3 = extensionRegEx.exec(e.target.value),
                            _extensionRegEx$exec4 = _slicedToArray(_extensionRegEx$exec3, 1),
                            previewFileExtension = _extensionRegEx$exec4[0];

                        if (e.target.value != '' && !acceptedExtensions.includes(previewFileExtension)) {
                            errorMsg = 'Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', ');
                        } else {
                            errorMsg = null;
                        }
                        break;
                    case 'bonus':
                        acceptedExtensions = ['.jpg', '.png', '.gif'];

                        var _extensionRegEx$exec5 = extensionRegEx.exec(e.target.value),
                            _extensionRegEx$exec6 = _slicedToArray(_extensionRegEx$exec5, 1),
                            bonusFileExtension = _extensionRegEx$exec6[0];

                        if (e.target.value != '' && !acceptedExtensions.includes(bonusFileExtension)) {
                            errorMsg = 'Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', ');
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
                            errorMsg = 'Debes utilizar un correo electrónico valido';
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
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    createProductButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (Object.values(errors).length == 0) {
            createProductForm.submit();
        } else {
            // alert('completa los campos correctamente');
        }
    });
});