let avatar = document.getElementById("avatar");
let manzana = document.getElementsByClassName("aplle");
let tronco = document.querySelector("#tronco");
// let rock = document.getElementById("rock");
// let score = document.getElementById("score");
let tecla = false;


// //38 arriba
// //40 abajo
// //git credenciales

avatar = new Personaje(avatar);
tronco = new Obstaculo(tronco);
manzana = new Pickup(manzana);

avatar.debug();
tronco.debug();


window.addEventListener('keydown', (e) => {
    tecla = e.keyCode;
});

window.addEventListener("keyup", function() {
    tecla = null;
    avatar.restaurarEstado();
});

setInterval(() => {
    //flecha arriba

    avatar.update();
    tronco.update();
    if (tecla == 38) {
        avatar.saltar();
  } else if (tecla == 40) {
        avatar.agachar();
    }
}, 70);

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


//test