'use strict';

function PersonalData(props) {
    return (
        <article class="col-12 col-md-6 mb-3">
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
        </article>
    );
}

function ProgressBars(props) {
    return (
        <article class="col-12 col-md-6 mb-3">
            <div class="container-c ">
                <h2>Progreso</h2>
                <div class="item">
                    <table class="table table-hover">
                        <tr>
                            <th>Hijo</th>
                            <th>Clase</th>
                            <th>Progreso</th>
                        </tr>
                        <tr>
                            <td>Hijo 1</td>
                            <td>Clase 1</td>
                            <td>Barra de progreso</td>
                        </tr>
                        <tr>
                            <td>Hijo 2</td>
                            <td>Clase 2</td>
                            <td>Barra de progreso</td>
                        </tr>
                    </table>
                </div>
            </div>
        </article>
    );
}

function ProfileCard(props) {
    return (
        <article class="col-12 col-md-6  mb-3">
            <div class="container-c ">
                <h2>
                    {props.name}
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#deleteSubUserModal"
                        class="btn-close button-right mt-0"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        type="submit"
                    ></button>
                </h2>
                <div class="item">
                    <form
                        action="/user/<%= childId %>/updateChildren?_method=PUT"
                        method="post"
                        enctype="multipart/form-data"
                    >
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-upload text-center mb-3">
                                    <label
                                        for="avatar-<%=i%>"
                                        class="form-label"
                                    >
                                        <img
                                            class="img-thumbnail rounded-circle "
                                            id="avatarChildImg-<%=i%>"
                                            src={props.img}
                                            alt="avatar"
                                        />
                                        <div>Seleccioná el avatar</div>
                                    </label>
                                    <div class="file-input-container-c">
                                        <input
                                            class="form-control  avatarChildInput"
                                            type="file"
                                            id="avatar-<%=i%>"
                                            placeholder="Avatar del hijo"
                                            name="avatar"
                                        />
                                        {props.errors}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="form-floating">
                                    <input
                                        class="form-control"
                                        type="text"
                                        name="name"
                                        id="name-<%=childId%>"
                                        placeholder="Nombre de usuario del hijo"
                                        value={props.name}
                                    />
                                    <label for="name-<%=childId%>">
                                        Nombre del hijo
                                    </label>
                                </div>
                                <select
                                    class="form-select align-self-start my-3"
                                    aria-label="select año"
                                    name="grade_id"
                                >
                                    <option>Seleccioná el año</option>
                                    <option value={props.grades}>
                                        {props.grades}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </article>
    );
}

function Dashboard() {
    return (
        <section class="row">
            <PersonalData />
            <ProgressBars />
            <ProfileCard name="Sara" />
            <ProfileCard name="Cahal" />
            <ProfileCard name="Edite" />
        </section>
    );
}

ReactDOM.render(<Dashboard />, document.getElementById('user-dashboard'));

// const domContainer = document.querySelector('#user-dashboard');
// ReactDOM.render(e(ProfileCard), domContainer);
