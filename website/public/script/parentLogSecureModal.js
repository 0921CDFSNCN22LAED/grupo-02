function ParentLogSecure() {
    return React.createElement(
        "div",
        {
            "class": "modal fade w-95vw",
            id: "parentVerificationModal",
            tabindex: "-1",
            "aria-labelledby": "parentVerificationModal",
            "aria-hidden": "true"
        },
        React.createElement(
            "div",
            { "class": "modal-dialog modal-dialog-centered " },
            React.createElement(
                "div",
                { "class": "modal-content bg-light" },
                React.createElement(
                    "div",
                    { "class": "modal-header" },
                    React.createElement("button", {
                        type: "button",
                        "class": "btn-close button-right ",
                        "aria-label": "Close",
                        "data-bs-dismiss": "modal"
                    })
                ),
                React.createElement(
                    "div",
                    { "class": "modal-body" },
                    React.createElement(
                        "form",
                        { action: "/user/secure", method: "post" },
                        React.createElement(
                            "h5",
                            null,
                            "Reingres\xE1 tu contrase\xF1a para continuar como padre"
                        ),
                        React.createElement(
                            "div",
                            { "class": "form-floating my-3" },
                            React.createElement("input", {
                                "class": "form-control",
                                type: "password",
                                name: "pass",
                                id: "pass",
                                placeholder: "Contrase\xF1a",
                                autofocus: true
                            }),
                            React.createElement(
                                "label",
                                { "class": "text-shadow", "for": "pass" },
                                "Contrase\xF1a"
                            )
                        ),
                        React.createElement("input", {
                            type: "text",
                            name: "passedData",
                            id: "passedData",
                            "class": "hidden",
                            value: ""
                        }),
                        React.createElement(
                            "button",
                            {
                                type: "submit",
                                "class": "btn btn-success button-right",
                                "data-bs-dismiss": "modal"
                            },
                            "Continuar con privilegios de padre"
                        )
                    )
                )
            )
        )
    );
}