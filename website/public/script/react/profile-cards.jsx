'use strict';

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

function ProfileCards() {
    return (
        <section class="row">
            <ProfileCard name="Sara" />
            <ProfileCard name="Cahal" />
            <ProfileCard name="Edite" />
        </section>
    );
}

ReactDOM.render(<ProfileCards />, document.getElementById('profiles-cards'));
