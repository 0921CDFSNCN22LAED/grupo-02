window.addEventListener('load', () => {
    const selects = document.querySelectorAll('select');
    const hiddenInputs = document.querySelectorAll('.hiddenInputs');
    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', () => {
            hiddenInputs[i].value = selects[i].value;
        });
    }
});
