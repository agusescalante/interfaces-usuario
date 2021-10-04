'use strict';

class Ficha {
    posX;
    posY;
    jugador;
    relleno;
    vecinos;

    constructor(jugador, relleno) {
        this.jugador = jugador;
        this.relleno = relleno;
    }

    setposY(y) {
        this.posY = y;
    }

    setPosX(x) {
        this.PosX = x;
    }

    setJugador(jugador) {
        this.jugador = jugador;
    }

    setVecinos(vecinos) {
        this.vecinos = vecinos;
    }

    //AddEventListener...?
    isInside(x, y, canvas) {
        let rect = canvas.getBoundingClientRect();
        let distancia, restaPuntos, fichaX, fichaY;
        fichaX = x - rect.left;
        fichaY = y - rect.top;
        restaPuntos = Math.pow(fichaX - this.posX, 2) + Math.pow(fichaY - this.posY, 2);
        distancia = Math.sqrt(restaPuntos);
        let unNumber = 35;

        if (distancia < unNumber) {
            return true
        }
    }



    //cant 1, mis vecinos, mi jugador
    checkWinGame(cant, vecinos, jugador, limite, orientacion = null) {

        //Cond de corte
        if (cant == limite) {
            return cant;
        } else {
            //Estoy en la ficha madre
            if (orientacion == null) {
                //0 = arriba der
                //1 = der
                //2 = abajo der
                //3 = abajo
                //4 = abajo izq
                //5 = izq
                //6 = arriba izq

                for (let i = 0; i < 4; i++) {
                    switch (i) {
                        case 0:
                            //Caso diagonal arriba_derecha - abajo_izq
                            if (this.checkLine(vecinos, limite, 0, 4)) {
                                return true;
                            }

                        case 1:
                            //Caso horizontal derecha-izquierda
                            if (this.checkLine(vecinos, limite, 1, 5)) {
                                return true;
                            }

                        case 2:
                            //Caso diagonal abajo_derecha - arriba_izquierda
                            if (this.checkLine(vecinos, limite, 2, 6)) {
                                return true;
                            }
                        case 3:
                            //Caso vertical solo abajo
                            if (this.checkSingleLine(vecinos, limite, 3)) {
                                return true;
                            }
                    }
                }
                return false;
            } else {
                //Estoy en una ficha secundaria
                if (vecinos[orientacion] != null) {
                    if (vecinos[orientacion].jugador == jugador) {
                        let resultado = this.checkWinGame(cant + 1, vecinos[orientacion].vecinos, jugador, limite, orientacion);
                        return resultado;
                    } else return cant;
                } else return cant;
            }
        }
    }

    checkSingleLine(vecinos, limite, or1) {
        let resultado1 = this.getVecinoCant(vecinos[or1], this.jugador, 1, limite, or1);
        if (resultado1 == limite) return true;
    }

    checkLine(vecinos, limite, or1, or2) {
        //Or1 = Orientacion 1
        //Or2 = Orientacion 2

        let resultado1 = 0;
        let resultado2 = 0;

        resultado1 = this.getVecinoCant(vecinos[or1], this.jugador, 0, limite, or1);
        if (resultado1 == limite) return true;

        resultado2 = this.getVecinoCant(vecinos[or2], this.jugador, 0, limite, or2);
        if (resultado2 == limite) return true;
        else {
            if ((resultado1 + resultado2 + 1) >= limite) {
                return true;
            }
        }
    }

    getVecinoCant(vecino, jugador, cant, limite, orientacion) {
        if (vecino != null) {
            if (vecino.jugador == jugador) {
                return this.checkWinGame(cant + 1, vecino.vecinos, jugador, limite, orientacion);
            } else return 0;
        } else return 0;
    }
}