var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var domContainer = document.querySelector('#ParentLogSecure');
ReactDOM.render(React.createElement(Prueba, null), domContainer);
console.log('aca');
'use strict';

function Prueba() {
    var _React$useState = React.useState(''),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        passedData = _React$useState2[0],
        setPassedData = _React$useState2[1];

    var button = document.querySelector('[data-bs-target*="parentVerificationModal"]');
    if (button) {
        var passingData = document.querySelector('#selectChild');
        button.addEventListener('click', function (e) {
            e.preventDefault;
            setPassedData(passingData.value);
            console.log('passingData.value', passingData.value);
        });
    }
    return React.createElement(
        'div',
        {
            'class': 'modal fade w-95vw',
            id: 'parentVerificationModal',
            tabindex: '-1',
            'aria-labelledby': 'parentVerificationModal',
            'aria-hidden': 'true'
        },
        React.createElement(
            'div',
            { 'class': 'modal-dialog modal-dialog-centered ' },
            React.createElement(
                'div',
                { 'class': 'modal-content bg-light' },
                React.createElement(
                    'div',
                    { 'class': 'modal-header' },
                    React.createElement('button', {
                        type: 'button',
                        'class': 'btn-close button-right ',
                        'aria-label': 'Close',
                        'data-bs-dismiss': 'modal'
                    })
                ),
                React.createElement(
                    'div',
                    { 'class': 'modal-body' },
                    React.createElement(
                        'form',
                        { action: '/user/secure', method: 'post' },
                        React.createElement(
                            'h5',
                            null,
                            'Reingres\xE1 tu contrase\xF1a para continuar como padre'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'form-floating my-3' },
                            React.createElement('input', {
                                'class': 'form-control',
                                type: 'password',
                                name: 'pass',
                                id: 'pass',
                                placeholder: 'Contrase\xF1a',
                                autofocus: true
                            }),
                            React.createElement(
                                'label',
                                { 'class': 'text-shadow', 'for': 'pass' },
                                'Contrase\xF1a'
                            )
                        ),
                        React.createElement('input', {
                            type: 'text',
                            name: 'passedData',
                            id: 'passedData',
                            'class': 'hidden',
                            value: passedData
                        }),
                        React.createElement(
                            'button',
                            {
                                type: 'submit',
                                'class': 'btn btn-success button-right',
                                'data-bs-dismiss': 'modal'
                            },
                            'Continuar con privilegios de padre'
                        )
                    )
                )
            )
        )
    );
}