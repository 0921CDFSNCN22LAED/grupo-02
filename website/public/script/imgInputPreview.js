window.addEventListener('load', () => {
    const avatarInput = document.querySelectorAll('.avatarInput');

    for (let i = 0; i < avatarInput.length; i++) {
        avatarInput[i].addEventListener(
            'change',
            function () {
                const [file] = this.files;
                if (file) {
                    avatarInput[
                        i
                    ].parentElement.previousElementSibling.firstElementChild.src =
                        URL.createObjectURL(file);
                }
            },
            false
        );
    }
});
