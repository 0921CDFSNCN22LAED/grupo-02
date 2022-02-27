window.addEventListener('load', () => {
    const imgInput = document.querySelectorAll('.imgInput');

    for (let i = 0; i < imgInput.length; i++) {
        imgInput[i].addEventListener(
            'change',
            function () {
                const [file] = this.files;
                if (file) {
                    imgInput[
                        i
                    ].parentElement.previousElementSibling.firstElementChild.src =
                        URL.createObjectURL(file);
                }
            },
            false
        );
    }
});
