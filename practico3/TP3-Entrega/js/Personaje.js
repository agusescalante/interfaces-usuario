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

    imgJump;
    imgRun;
    imgDown;

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

        this.imgJump = 'url(images/avatarBetty/jump-right.png)';
        this.imgRun = 'url(images/avatarBetty/avatarRun.png)';
        this.imgDown = 'url(images/avatarBetty/down.png)';

        this.view = div;
        div.style.backgroundImage = this.imgRun;
        div.classList.add("run");

    }

    freeze() {
        this.view.style.animationPlayState = "paused";
    }

    update() {
        let pos = this.view.getBoundingClientRect();

        this.esquinaArribaIzquierda.update(pos.x, pos.y);
        this.esquinaAbajoDerecha.update(pos.x + pos.width, pos.y + pos.height);
        this.esquinaArribaDerecha.update(pos.x + pos.width, pos.y);
        this.esquinaAbajoIzquierda.update(pos.x, pos.y + pos.height);
    }

    saltar() {
        // this.view.style.backgroundImage = this.imgJump;
        this.view.classList.remove("run");
        this.view.classList.add("jump-animation");

        // this.view.addEventListener("mousemove", myFunction);
    }

    agachar() {
        // this.view.style.backgroundImage = this.imgDown;
        this.view.classList.remove("run");
        this.view.classList.add("down-animation");
    }

    restaurarEstado() {
        this.view.classList.remove("jump-animation");
        this.view.classList.remove("down-animation");
        this.view.classList.add("run");
        this.view.style.backgroundImage = this.imgRun;
    }


    debug() {
        this.view.style.backgroundColor = "green";
    }

}