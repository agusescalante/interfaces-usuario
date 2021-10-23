class Pickup {
    view;

    type;
    width;
    height;

    esquinaArribaIzquierda;
    esquinaArribaDerecha;
    esquinaAbajoIzquierda;
    esquinaAbajoDerecha;

    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;

        this.esquinaArribaIzquierda = new Coordenada(x, y);
        this.esquinaArribaDerecha = new Coordenada(x + width, y);
        this.esquinaAbajoIzquierda = new Coordenada(x, y + height);
        this.esquinaAbajoDerecha = new Coordenada(x + width, y + height);

        this.type = "Pickup";
    }

    // create() {
    //     let div = document.createElement("div");
    //     div.classList.add("a1");
    //   //  div.classList.add("a1");
    //     div.style.width = this.width + "px";
    //     div.style.height = this.height + "px";
    //     this.view = div;
    //     return div;
    // }

    // setHeight(height) {
    //     this.view.style.height = height + "px";
    // }

    // setSpeed(speed) {
    //     this.view.style.animationDuration = speed + "s";
    // }

    // freeze() {
    //     this.view.style.animationPlayState = "paused";
    // }

    // toggleView() {
    //     if (this.view.classList.contains("shown")) {
    //         this.view.classList.remove("shown");
    //         this.view.classList.add("hidden");
    //     } else {
    //         this.view.classList.add("shown");
    //         this.view.classList.remove("hidden");
    //     }
    // }

    update() {
        let pos = this.view.getBoundingClientRect();

        this.esquinaArribaIzquierda.update(pos.x, pos.y);
        this.esquinaArribaDerecha.update(pos.x + pos.width, pos.y);
        this.esquinaAbajoIzquierda.update(pos.x, pos.y + pos.height);
        this.esquinaAbajoDerecha.update(pos.x + pos.width, pos.y + pos.height);
    }

    print() {
        let pos = this.view.getBoundingClientRect();
        console.log(pos.x, pos.y);
    }
}