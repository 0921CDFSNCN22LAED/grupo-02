const object = {
    duracionVideoHoras: function () {
        let horas = Math.floor(this.duracionVideo / 60);
        let minutos = this.duracionVideo % 60;
        let minutosFraccionHora = minutos / 60;
        return horas + minutosFraccionHora;
    },

    rating: function () {
        return (
            Math.round(
                (this.resenas.reduce((a, b) => a.rating + b.rating) /
                    this.resenas.length) *
                    2
            ) / 2
        );
    },
};
