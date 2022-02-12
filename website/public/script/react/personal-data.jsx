'use strict';

function PersonalData(props) {
    return (
        <div class="container-c">
            <h2>Tus datos personales</h2>
            <form
                action="/user/<%= parentLogged.id %>/updateParent?_method=PUT"
                method="post"
                enctype="multipart/form-data"
                class="item"
            >
                <fieldset>
                    <div class="form-floating my-3">
                        <input
                            class="form-control"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nombre de usuario"
                            value={props.name}
                        />
                        <label for="name">Nombre de usuario</label>
                    </div>
                    <div class="form-floating my-3">
                        <input
                            disabled
                            class="form-control disabled"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Correo electrónico"
                            value={props.email}
                        />
                        <label for="email">Correo electrónico</label>
                    </div>
                </fieldset>
                <div>
                    <label for="avatarParent" class="d-flex my-3">
                        <img
                            class="img-thumbnail w-50 me-5 rounded-circle"
                            src="/img/avatars/<%= parentLogged.avatar %> "
                            alt="avatar ya cargado"
                            id="avatarParentImg"
                        />
                        <div class="form-upload">
                            <div class="form-label">Cambiá tu avatar</div>
                        </div>
                    </label>
                    <input
                        class="form-control"
                        type="file"
                        id="avatarParent"
                        placeholder="Cargá tu avatar"
                        name="avatar"
                    />
                </div>
                <fieldset disabled="disabled">
                    <div class="form-floating my-3">
                        <input
                            class="form-control"
                            type="password"
                            name="pass"
                            id="pass"
                            placeholder="Contraseña"
                        />
                        <label class="text-shadow" for="pass">
                            Cambiá tu contraseña
                        </label>
                    </div>
                </fieldset>
                <button
                    class="btn btn-success btn-lg button-right my-3"
                    type="submit"
                >
                    Actualizar
                </button>
                <button
                    class="btn btn-warning btn-lg button-right m-3"
                    type="submit"
                    formmethod="get"
                    formaction="/user/logout"
                >
                    Cerrar sesión
                </button>
            </form>
        </div>
    );
}

ReactDOM.render(<PersonalData />, document.getElementById('personal-data'));
