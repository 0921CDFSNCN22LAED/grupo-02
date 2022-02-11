window.addEventListener('load', () => {
    let carouselVertical = document.querySelectorAll(
        '.carouselVerticalItemGroup'
    );

    function wipeIn(element) {
        element.classList.add('wipe-in');
    }

    function wipeOut(element) {
        element.classList.add('wipe-out');
        delay(2700).then(() => reset(element));
    }

    function reset(element) {
        element.classList = 'carouselVerticalItemGroup';
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function* carousel(elements) {
        for (let i = 0; i >= 0; i++) {
            if (i === 0) {
                wipeIn(elements[i]);
                yield;
            }

            wipeOut(elements[i % elements.length]);
            wipeIn(elements[(i + 1) % elements.length]);
            yield;
        }
    }

    function runCarousel(genObj) {
        if (!genObj.next().done) {
            setTimeout(runCarousel, 8000, genObj);
        }
    }

    runCarousel(carousel(carouselVertical));
});
