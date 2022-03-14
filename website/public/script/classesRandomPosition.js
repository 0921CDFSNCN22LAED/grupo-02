window.addEventListener('load', () => {
    let cl = document.querySelectorAll('#classesRandomPosition a');
    for (let c of cl) {
        const random = Math.floor(Math.random() * 20);
        c.style.transform = `translateY(${random}px)`;
    }
});
