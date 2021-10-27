let avatar = document.getElementById("avatar");
let pickup = document.querySelector("#apple");
let tronco = document.querySelector("#obstaculo");
let score = document.querySelector("#score");
let tecla = false;
let pickup_collision = true;

let puntaje = 0;


// //38 arriba
// //40 abajo
// //git credenciales

avatar = new Personaje(avatar);
tronco = new Obstaculo(tronco);
pickup = new Pickup(pickup, 50);

// freeze();
setTheme("city");

// Debug hitboxes
// avatar.debug();
// tronco.debug();
// pickup.debug();


window.addEventListener('keydown', (e) => {
    tecla = e.keyCode;
});

window.addEventListener("keyup", function() {
    avatar.update();
    tronco.update();
    tecla = null;
    avatar.restaurarEstado();
});

//gameLoop
setInterval(() => {

    avatar.update();
    tronco.update();
    pickup.update();

    if (checkCollision(avatar, tronco)) {
        // alert("termino");
        freeze();
        // console.log("Chocó");
    }

    //colision con pickup
    if (pickup_collision == true) {
        if (checkCollision(avatar, pickup)) {

            pickup.toggleView();

            puntaje += pickup.points;
            score.innerHTML = convertScore(puntaje);

            //quito la colision
            pickup_collision = false;
        }
    }

    if (tecla == 38) {
        avatar.saltar();
    } else if (tecla == 40) {
        avatar.agachar();
    }
}, 50);

function checkCollision(pj, item) {

    //objetos abajo o a nivel del avatar
    if ((pj.esquinaAbajoDerecha.x >= item.esquinaArribaIzquierda.x &&
            pj.esquinaAbajoDerecha.x <= item.esquinaArribaDerecha.x) &&
        (pj.esquinaAbajoDerecha.y >= item.esquinaArribaIzquierda.y &&
            pj.esquinaAbajoDerecha.y <= item.esquinaAbajoIzquierda.y)) {
        return true;
    }

    if ((pj.esquinaAbajoIzquierda.x <= item.esquinaArribaDerecha.x &&
            pj.esquinaAbajoIzquierda.x >= item.esquinaArribaIzquierda.x) &&
        (pj.esquinaAbajoIzquierda.y >= item.esquinaArribaDerecha.y &&
            pj.esquinaAbajoIzquierda.y <= item.esquinaAbajoDerecha.y)) {
        return true;
    }

    //Objetos arriba del avatar
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

    //Como todo este algoritmo fue ideado pensando en las esquinas de los objetos,y pensando
    // que el objeto siempre iba a ser más grande que el avatar, se agrego esta parte
    //  teniendo en cuenta si el objeto es mas chico que el avatar


    //si el item está adentro del avatar
    if (pj.esquinaAbajoDerecha.x >= item.esquinaAbajoIzquierda.x &&
        pj.esquinaAbajoDerecha.x <= item.esquinaAbajoDerecha.x &&
        item.esquinaArribaIzquierda.y >= pj.esquinaArribaDerecha.y &&
        item.esquinaAbajoIzquierda.y <= pj.esquinaAbajoDerecha.y) {
        return true;
    }

    //Si no ocurre nada de esto, es porque no chocó.
    return false;
}

function freeze() {
    document.querySelector(".sky").style.animationPlayState = "paused";
    document.querySelector(".hills").style.animationPlayState = "paused";
    document.querySelector(".middle").style.animationPlayState = "paused";
    document.querySelector(".fore").style.animationPlayState = "paused";
    document.querySelector(".cloud").style.animationPlayState = "paused";

    avatar.freeze();
    tronco.freeze();
    pickup.freeze();
}

function unfreeze() {
    document.querySelector(".sky").style.animationPlayState = "running";
    document.querySelector(".hills").style.animationPlayState = "running";
    document.querySelector(".middle").style.animationPlayState = "running";
    document.querySelector(".fore").style.animationPlayState = "running";
    document.querySelector(".cloud").style.animationPlayState = "running";

    avatar.unfreeze();
    tronco.unfreeze();
    pickup.unfreeze();
}

function convertScore(score) {
    score = score + "";
    let largo = score.length;
    let resto = 6 - largo;
    let resultado = "";

    for (let i = 0; i < resto; i++) {
        resultado = resultado + "0";
    }

    resultado += score;
    return resultado;
}

function setTheme(theme) {
    let sky = document.querySelector(".sky");
    if (theme == "forest") {
        document.querySelector(".hills").classList.add("forest_hills");
        document.querySelector(".sky").classList.add("forest_sky");
        document.querySelector(".middle").classList.add("forest_middle");
        document.querySelector(".fore").classList.add("forest_fore");
        document.querySelector(".cloud").classList.add("forest_cloud");
    } else if (theme == "city") {
        setAnimationBG();
        document.querySelector(".sky").classList.add("city_sky");
        document.querySelector(".hills").classList.add("city_hills");
        document.querySelector(".middle").classList.add("city_middle");
        // document.querySelector(".fore").classList.add("city_fore");
        document.querySelector(".cloud").classList.add("city_cloud");
    }
}


function setAnimationBG() {
    document.querySelector(".sky").classList.add("movebg_city");
    document.querySelector(".hills").classList.add("movebg_city");
    document.querySelector(".middle").classList.add("movebg_cityy");
    // document.querySelector(".fore").classList.add("movebg_city");
    document.querySelector(".cloud").classList.add("movebg_city");
}

//test