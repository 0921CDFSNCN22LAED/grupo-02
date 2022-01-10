function hideLateralNavbar() {
    const footerHeight = document.getElementById('footer').scrollHeight;
    document.getElementById('main-nav').style.marginBottom =
        footerHeight + 50 + 'px';
}

hideLateralNavbar();
