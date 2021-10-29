let theme;
let pickup_collision = true;
let points_limit = 250;

function startGame() {
    // pickup_collision = true;


    let avatar = document.getElementById("avatar");
    let pickup = document.querySelector("#apple");
    let tronco = document.querySelector("#obstaculo");
    let score = document.querySelector("#score");
    let tecla = false;

    document.querySelector("#score").innerHTML = "000000";
    let puntaje = 0;

    avatar = new Personaje(avatar);
    tronco = new Obstaculo(tronco);
    pickup = new Pickup(pickup, 50);
    

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
    let stopper = setInterval(() => {

        avatar.update();
        tronco.update();
        pickup.update();

       // console.log(pickup_collision);
        if (checkCollision(avatar, tronco)) {
            clearInterval(stopper);
            freeze();

            setTimeout(() => {
                unfreeze();
            }, 1000);

            showBadEnding();
        }

        //colision con pickup
        if (pickup_collision == true) {
            if (checkCollision(avatar, pickup)) {

                pickup.toggleView();

                puntaje += pickup.points;
                score.innerHTML = convertScore(puntaje);

                if (puntaje >= points_limit) {

                    clearInterval(stopper);
                    freeze();

                    setTimeout(() => {
                        unfreeze();
                    }, 1000);

                    showGoodEnding();
                }

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
}

function resetGame() {
    pickup_collision = true;
    resetAnims();
    startGame();
}

function resetAnims() {
    restartAnim("hills");
    restartAnim("middle");
    restartAnim("fore");
    restartAnim("cloud");
    restartAnim("sky");

    restartObjectsAnim();
}



function restartAnim(div) {
    let htmlDiv = document.querySelector("." + div);
    let cssClass = htmlDiv.classList[2];
    htmlDiv.classList.remove(cssClass);
    void htmlDiv.offsetWidth;
    htmlDiv.classList.add(cssClass);

}

function restartObjectsAnim() {
    let apple = document.querySelector("#apple");
    apple.classList.remove("apple_anim");
    void apple.offsetWidth;
    apple.classList.add("apple_anim");

    let obst = document.querySelector("#obstaculo");
    obst.classList.remove(obst.classList[0]);
    void obst.offsetWidth;
    obst.classList.add("tronco");
}

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
            if(!sky.classList.contains('forest_sky') && (!sky.classList.contains('city_sky')) ) {
                addImgFore();
                }else{
                    if(document.querySelector(".floor").classList.contains('city_floor')){
                        document.querySelector(".floor").classList.remove("city_floor");
                        
                }
                removeImgFore();
                        removeImgCity();
                        addImgFore();
            }
        }else if (theme == "city"){
            setAnimationBG();
            if(!sky.classList.contains('forest_sky') && (!sky.classList.contains('city_sky')) ) {
                addImgCity();
               }else{
                    if(document.querySelector(".floor").classList.contains('city_floor')){
                        document.querySelector(".floor").classList.remove("city_floor");
                       
                    }
                    removeImgFore();
                    removeImgCity();
                    addImgCity();
        }
    }   
}

    
    


function removeImgFore(){
    document.querySelector(".sky").classList.remove("forest_sky");
    document.querySelector(".hills").classList.remove("forest_hills");
    document.querySelector(".middle").classList.remove("forest_middle");
    document.querySelector(".fore").classList.remove("forest_fore");
    document.querySelector(".cloud").classList.remove("forest_cloud");
    // if(document.querySelector(".floor").classList.contains('floor')){
    // document.querySelector(".floor").classList.remove("floor");
    // }
}


function removeImgCity(){
    document.querySelector(".sky").classList.remove("city_sky");
    document.querySelector(".hills").classList.remove("city_hills");
    document.querySelector(".middle").classList.remove("city_middle");
    document.querySelector(".fore").classList.remove("city_fore");
    document.querySelector(".cloud").classList.remove("city_cloud");
    // if(document.querySelector(".floor").classList.contains('floor')){
    //     document.querySelector(".floor").classList.remove("floor");
    // }}
}



function setAnimationBG() {
    document.querySelector(".sky").classList.add("movebg_city");
    document.querySelector(".hills").classList.add("movebg_city");
    document.querySelector(".middle").classList.add("movebg_cityy");
    // document.querySelector(".fore").classList.add("movebg_city");
    document.querySelector(".cloud").classList.add("movebg_city");
}

function addImgFore(){
    document.querySelector(".sky").classList.add("forest_sky");
    document.querySelector(".hills").classList.add("forest_hills");
    document.querySelector(".middle").classList.add("forest_middle");
    document.querySelector(".fore").classList.add("forest_fore");
    document.querySelector(".cloud").classList.add("forest_cloud");
}

function addImgCity(){
    document.querySelector(".sky").classList.add("city_sky");
    document.querySelector(".hills").classList.add("city_hills");
    document.querySelector(".middle").classList.add("city_middle");
    document.querySelector(".fore").classList.add("city_fore");
    document.querySelector(".cloud").classList.add("city_cloud");
    document.querySelector(".floor").classList.add("city_floor");
}

function togglePopup() {
    let popup = document.querySelector(".popupContainer");

    if (popup.classList.contains("popUp_shown")) {
        popup.classList.remove("popUp_shown");
        popup.classList.add("popUp_hidden");
    } else {
        popup.classList.add("popUp_shown");
        popup.classList.remove("popUp_hidden");
    }
}

function showBadEnding() {
    let popupText = document.querySelector(".popupText");

    let h1 = popupText.children[0];
    let h2 = popupText.children[1];

    h1.innerHTML = "Te chocaste un obstaculo!";
    h2.innerHTML = "Quieres jugar nuevamente?"
    togglePopup();
}

function showGoodEnding() {
    let popupText = document.querySelector(".popupText");

    let h1 = popupText.children[0];
    let h2 = popupText.children[1];

    h1.innerHTML = "Ha llegado al límite de puntos!";
    h2.innerHTML = "Quiere reiniciar?"
    togglePopup();
}

document.querySelector("#city").addEventListener("click", () => {
    theme = "city";
    setTheme(theme);
    startGame();
    resetAnims();
    togglePopup();
});

document.querySelector("#forest").addEventListener("click", () => {
    theme = "forest";
    setTheme(theme);
    startGame();
    resetAnims();
    togglePopup();
});

//test