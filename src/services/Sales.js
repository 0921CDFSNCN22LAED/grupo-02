module.exports = {
    addToCart: function (productId, old) {
        old.cart.push(Number(productId));
        this.destroy(old.id);
        this.createUser("", old.id, old);
    },
    removeFromCart: function (productId, old) {
        cartItems = old.cart.filter((cartItem) => cartItem != productId);
        old.cart = cartItems;
        this.destroy(old.id);
        this.createUser("", old.id, old);
    },
};
