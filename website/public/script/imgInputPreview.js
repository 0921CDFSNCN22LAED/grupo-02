window.addEventListener('load', () => {
    avatarParent.addEventListener('change', () => {
        const [file] = avatarParent.files;
        if (file) {
            avatarParentImg.src = URL.createObjectURL(file);
        }
    });

    const avatarChildInput = document.querySelectorAll('.avatarChildInput');

    for (let i = 0; i < avatarChildInput.length; i++) {
        avatarChildInput[i].addEventListener(
            'change',
            function () {
                const [file] = this.files;
                if (file) {
                    document.querySelector(`#avatarChildImg-${i}`).src =
                        URL.createObjectURL(file);
                }
            },
            false
        );
    }
});
