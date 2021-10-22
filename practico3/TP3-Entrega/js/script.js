let container = document.querySelector(".container");

let keyDown;


let difficultyCounter = 0;

let heights = [100, 130, 50];

let pj = new Personaje(41, 69);
let pjAux = pj.create();

container.appendChild(pjAux);

let obs = new Obstaculo(document.documentElement.clientWidth, document.documentElement.clientHeight, 40, 90);
container.appendChild(obs.create());
// obs.toggleView();

let selected = obs;

let pickup = new Pickup(document.documentElement.clientWidth, document.documentElement.clientHeight, 100, 100);
container.appendChild(pickup.create());
pickup.toggleView();


let flag;
gameloop();


window.addEventListener("keydown", function(event) {
    let key = event.key || event.keyCode;
    if (key == "ArrowUp") {
        keyDown = true;
    }
});

window.addEventListener("keyup", function(event) {
    keyDown = false;
});

function gameloop() {
    flag = setInterval(() => {
        obs.update();
        pj.update();

        if (keyDown) {
            pj.move();
        }

        advanceSpeed();

        if (checkCollision(pj, selected) == true && selected.type == "Obstaculo") {
            obs.freeze();
            pj.freeze();
            console.log("chocó");
            clearInterval(flag);
        }

    }, 50);
}

obs.view.addEventListener("animationiteration", function() {
    if (selected.type == "Obstaculo") {
        spiceThingsUp();
        difficultyCounter++;
    }
});

pickup.view.addEventListener("animationiteration", function() {
    if (selected.type == "Pickup") {
        spiceThingsUp();
        difficultyCounter++;
    }
});

function spiceThingsUp() {
    let random = Math.floor(Math.random() * 3);
    console.log(random);

    //Si es pickup
    if (random == 2) {
        if (selected.type != "Pickup") {
            selected = pickup;
            pickup.toggleView();
            obs.toggleView();
        }
    } else {
        if (selected.type != "Obstaculo") {
            selected = obs;
            pickup.toggleView();
            obs.toggleView();
        }
        randomizeHeights();
    }
}


function checkCollision(pj, item) {

    //objetos abajo o igual al pj

    if ((pj.esquinaAbajoDerecha.x >= item.esquinaArribaIzquierda.x &&
            pj.esquinaAbajoDerecha.x <= item.esquinaArribaDerecha.x) &&
        (pj.esquinaAbajoDerecha.y >= item.esquinaArribaIzquierda.y)) {
        return true;
    }

    if ((pj.esquinaAbajoIzquierda.x <= item.esquinaArribaDerecha.x &&
            pj.esquinaAbajoIzquierda.x >= item.esquinaArribaIzquierda.x) &&
        pj.esquinaAbajoIzquierda.y >= item.esquinaArribaDerecha.y) {
        return true;
    }

    //Objetos arriba del pj
    if ((pj.esquinaArribaDerecha.x >= item.esquinaAbajoIzquierda.x &&
            pj.esquinaArribaDerecha.x <= item.esquinaAbajoDerecha.x) &&
        (pj.esquinaArribaDerecha.y <= item.esquinaAbajoIzquierda.y &&
            pj.esquinaArribaDerecha.y >= item.esquinaArribaIzquierda.y)) {
        return true;
    }

    if ((pj.esquinaArribaIzquierda.x <= item.esquinaAbajoDerecha.x &&
            pj.esquinaArribaIzquierda.x >= item.esquinaAbajoIzquierda.x) &&
        (pj.esquinaArribaIzquierda.y <= item.esquinaAbajoIzquierda.y &&
            pj.esquinaArribaIzquierda.y >= item.esquinaArribaIzquierda.y)) {
        return true;
    }

    return false;
}

//crea alturas randomizadas
function randomizeHeights() {
    let random = Math.floor(Math.random() * 3);
    obs.setHeight(heights[random]);
}

function advanceSpeed() {
    //Avanzar dificultad
    if (difficultyCounter == 4) {
        console.log("modo mediano activado");
        pickup.setSpeed(2.5);
        obs.setSpeed(2.5);
        setFloorSpeed(8.375);
        setBackgroundSpeed(30);
    } else if (difficultyCounter == 8) {
        obs.setSpeed(1.25);
        pickup.setSpeed(1.25);
        setFloorSpeed(4.125);
        setBackgroundSpeed(15);
    }
}

function setBackgroundSpeed(speed) {
    document.querySelector(".background2").style.animationDuration = speed + "s";
}

function setFloorSpeed(speed) {
    document.querySelector(".floor").style.animationDuration = speed + "s";
}