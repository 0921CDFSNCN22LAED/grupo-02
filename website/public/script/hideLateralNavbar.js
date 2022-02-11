window.addEventListener('load', () => {
    function hideLateralNavbar() {
        const footerHeight = document.querySelector('#footer').scrollHeight;
        document.querySelector('#main-nav').style.marginBottom =
            footerHeight + 50 + 'px';
    }

    hideLateralNavbar();
});
