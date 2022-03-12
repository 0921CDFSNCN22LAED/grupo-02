window.addEventListener('load', () => {
    const progressData = document.querySelectorAll('.progressData');
    progressData.forEach((progress) => {
        progress.firstElementChild.value = 0;
        const objective = Number(progress.dataset.value);
        let barProgress = 0;

        function fillBar() {
            progress.firstElementChild.value++;
            barProgress++;
            if (barProgress > objective) clearInterval(interval);
        }
        const interval = setInterval(fillBar, 100 / 6);
    });

    const progressValueInput = document.querySelector('#progressValueInput');
    if (progressValueInput) {
        progressValue.innerText = progressValueInput.value + '%';
        progressValueInput.addEventListener('change', () => {
            document.querySelector('#progressValue').innerText =
                progressValueInput.value + '%';
        });
    }
});
