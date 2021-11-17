class Personaje {
    x;
    y;
    width;
    height;

    view;

    esquinaAbajoDerecha;
    esquinaAbajoIzquierda;
    esquinaArribaDerecha;
    esquinaArribaIzquierda;

    constructor(div) {
        let pos = div.getBoundingClientRect();

        let x = pos.x;
        let y = pos.y;

        this.x = x;
        this.y = y;
        this.width = pos.width;
        this.height = pos.height;

        this.esquinaArribaIzquierda = new Coordenada(x, y);
        this.esquinaAbajoDerecha = new Coordenada(x + this.width, y + this.height);
        this.esquinaArribaDerecha = new Coordenada(x + this.width, y);
        this.esquinaAbajoIzquierda = new Coordenada(x, y + this.height);

        this.view = div;
        div.classList.add("run");
    }

    freeze() {
        this.view.style.animationPlayState = "paused";
    }

    unfreeze() {
        this.view.style.animationPlayState = "running";
    }

    update() {
        let pos = this.view.getBoundingClientRect();
        this.esquinaArribaIzquierda.update(pos.x, pos.y);
        this.esquinaAbajoDerecha.update(pos.x + pos.width, pos.y + pos.height);
        this.esquinaArribaDerecha.update(pos.x + pos.width, pos.y);
        this.esquinaAbajoIzquierda.update(pos.x, pos.y + pos.height);
    }

    saltar() {
        this.view.classList.remove("run");
        this.view.classList.add("jump-animation");
    }

    chocar() {
        this.view.classList.remove("run");
        this.view.classList.remove("jump-animation");
        this.view.classList.add("crashed");
    }

    restaurarEstado() {
        this.view.classList.remove("jump-animation");
        this.view.classList.remove("crashed");
        this.view.classList.add("run");
    }


    debug() {
        this.view.style.backgroundColor = "green";
    }

}