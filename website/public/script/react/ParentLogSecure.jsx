const domContainer = document.querySelector('#ParentLogSecure');
ReactDOM.render(<Prueba />, domContainer);
console.log('aca');
('use strict');

function Prueba() {
    let [passedData, setPassedData] = React.useState('');

    const button = document.querySelector(
        '[data-bs-target*="parentVerificationModal"]'
    );
    if (button) {
        const passingData = document.querySelector('#selectChild');
        button.addEventListener('click', (e) => {
            e.preventDefault;
            setPassedData(passingData.value);
        });
    }
    return (
        <div
            class="modal fade w-95vw"
            id="parentVerificationModal"
            tabindex="-1"
            aria-labelledby="parentVerificationModal"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content bg-light">
                    <div class="modal-header">
                        <button
                            type="button"
                            class="btn-close button-right "
                            aria-label="Close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form action="/user/secure" method="post">
                            <h5>
                                Reingresá tu contraseña para continuar como
                                padre
                            </h5>
                            <div class="form-floating my-3">
                                <input
                                    class="form-control"
                                    type="password"
                                    name="pass"
                                    id="passSecured"
                                    placeholder="Contraseña"
                                    autofocus
                                />
                                <label class="text-shadow" for="pass">
                                    Contraseña
                                </label>
                            </div>
                            <input
                                type="text"
                                name="passedData"
                                id="passedData"
                                class="hidden"
                                value={passedData}
                            />
                            <button
                                type="submit"
                                class="btn btn-success button-right"
                                data-bs-dismiss="modal"
                            >
                                Continuar con privilegios de padre
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
