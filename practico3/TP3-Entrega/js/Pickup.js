class Pickup {
    view;
    points;

    type;
    width;
    height;

    esquinaArribaIzquierda;
    esquinaArribaDerecha;
    esquinaAbajoIzquierda;
    esquinaAbajoDerecha;

    constructor(div, puntos) {
        let pos = div.getBoundingClientRect();

        let x = pos.x;
        let y = pos.y;

        this.x = x;
        this.y = y;
        this.width = pos.width;
        this.height = pos.height;

        this.points = puntos;


        this.esquinaArribaIzquierda = new Coordenada(x, y);
        this.esquinaArribaDerecha = new Coordenada(x + this.width, y);
        this.esquinaAbajoIzquierda = new Coordenada(x, y + this.height);
        this.esquinaAbajoDerecha = new Coordenada(x + this.width, y + this.height);

        this.view = div;
        this.type = "Pickup";

        //this == this.view
        this.view.addEventListener("animationiteration", function() {
            let random = Math.floor(Math.random() * 3);

            //si sale 1, muestra y permite colisión con el pickup 
            if (random == 1) {
                pickup_collision = true;

                //si esta escondida que se muestre
                if (this.classList.contains("hidden")) {
                    this.classList.add("shown");
                    this.classList.remove("hidden");
                }
            } else {
                pickup_collision = false;
            }
        });
    }

    freeze() {
        this.view.style.animationPlayState = "paused";
    }


    unfreeze() {
        this.view.style.animationPlayState = "running";
    }


    toggleView() {
        if (this.view.classList.contains("shown")) {
            this.view.classList.remove("shown");
            this.view.classList.add("hidden");
        } else {
            this.view.classList.add("shown");
            this.view.classList.remove("hidden");
        }
    }

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

    debug() {
        this.view.style.backgroundColor = "blue";
    }
}