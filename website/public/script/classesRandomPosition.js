window.addEventListener('load', () => {
    let cl = document.querySelectorAll('#classesRandomPosition a');
    for (let c of cl) {
        const randomX = Math.floor(Math.random() * 10) / 10;
        const randomY = Math.floor(Math.random() * 20) / 10;
        c.style = `margin: ${randomX}rem ${randomY}rem`;
    }
});
