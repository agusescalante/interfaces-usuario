class Obstaculo {
    view;

    type;
    width;
    height;

    esquinaArribaIzquierda;
    esquinaArribaDerecha;
    esquinaAbajoIzquierda;
    esquinaAbajoDerecha;

    constructor(div) {
        let pos = div.getBoundingClientRect();

        let x = pos.x;
        let y = pos.y;

        this.x = x;
        this.y = y;
        this.width = pos.width;
        this.height = pos.height;


        this.esquinaArribaIzquierda = new Coordenada(x, y);
        this.esquinaArribaDerecha = new Coordenada(x + this.width, y);
        this.esquinaAbajoIzquierda = new Coordenada(x, y + this.height);
        this.esquinaAbajoDerecha = new Coordenada(x + this.width, y + this.height);

        this.view = div;
        this.type = "Obstaculo";

        this.view.addEventListener("animationiteration", function() {
            let random = Math.floor(Math.random() * 4);

            // depende el valor, randomiza el obstaculo
            if (random == 1) {
                this.classList.add("tronco");
                this.classList.remove("roca");
                this.classList.remove("roca2");
            } else if (random == 2) {
                this.classList.remove("tronco");
                this.classList.remove("roca2");
                this.classList.add("roca");
            } else {
                this.classList.remove("tronco");
                this.classList.remove("roca");
                this.classList.add("roca2");
            }
        });
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
        this.esquinaArribaDerecha.update(pos.x + pos.width, pos.y);
        this.esquinaAbajoIzquierda.update(pos.x, pos.y + pos.height);
        this.esquinaAbajoDerecha.update(pos.x + pos.width, pos.y + pos.height);
    }

    debug() {
        this.view.style.backgroundColor = "red";
    }
}