let avatar = document.getElementById("avatar");
let pickup = document.querySelector("#apple");
let tronco = document.querySelector("#tronco");
// let rock = document.getElementById("rock");
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


// console.log(manzana);
avatar.debug();
tronco.debug();
pickup.debug();


window.addEventListener('keydown', (e) => {
    tecla = e.keyCode;
});

window.addEventListener("keyup", function() {
    avatar.update();
    tronco.update();
    tecla = null;
    avatar.restaurarEstado();
});

setInterval(() => {
    //flecha arriba

    avatar.update();
    tronco.update();
    pickup.update();

    // if (checkCollision(avatar, tronco)) {
    //     // alert("termino");
    // }

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
}, 70);

pickup.view.addEventListener("animationiteration", function() {
    // console.log("a");
});


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

//test