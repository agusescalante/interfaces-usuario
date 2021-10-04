    let canvas = document.querySelector('.canvas');
    let ctx = canvas.getContext('2d');

    let filas, cols;

    //Fichas por jugador
    let tablero;
    let endedGame;

    // 'x' en linea, depende de la dimension de tablero
    let limite;

    let crono;

    let fichas1 = [],
        fichas2 = [];

    //select tablero
    let tagTablero = document.querySelector('#selectTablero');

    let imgTablero = new Image();
    imgTablero.src = "./images/fondoTablero2.jpg";

    let imgFicha = new Image();
    imgFicha.src = "./images/Ficha.png";

    // inicia el selector de jugador
    let jugadorActual;

    //Color y nombre por defecto de los jugadores
    let Jugador1 = new Jugador('#F37A15', 'Jugador 1');

    let Jugador2 = new Jugador('#3F5BCF', 'Jugador 2');

    setBtnColors();

    setBtnsColorListeners("button_color_1", Jugador1);
    setBtnsColorListeners("button_color_2", Jugador2);

    //Cuando se hace click en el btn sorteo
    document.querySelector('#btn-sorteo').addEventListener("click", function() {

        setPlayersNames();
        startGame(Jugador1, Jugador2);

    });

    let fichaSelected;

    canvas.addEventListener("mousedown", function(e) {
        let array;
        if (jugadorActual == Jugador1.name) {
            array = fichas1;
        } else {
            array = fichas2;
        }

        //Si no se termino el juego, puedo seguir moviendo fichas
        if (!endedGame) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].isInside(e.clientX, e.clientY, canvas)) {
                    fichaSelected = array[i];
                }
            }
        }
    });

    canvas.addEventListener("mousemove", function(e) {
        if (fichaSelected) {
            fichaSelected.posX = e.layerX;
            fichaSelected.posY = e.layerY;

            tablero.drawFicha(fichaSelected.relleno, fichaSelected.posX, fichaSelected.posY);
            reDrawTable();
        }
    });

    //checkea si pasa algo
    canvas.addEventListener("mouseup", function(e) {

        if (fichaSelected) {

            let winnerName;
            let rect = canvas.getBoundingClientRect();
            fichaX = e.clientX - rect.left;

            let posInX = tablero.getXFromPx(fichaX);
            //35 seria el radius de la ficha

            //checkear si esta arriba del tablero
            if ((fichaSelected.posY + 35) < tablero.posY) {

                if (tablero.colocarFichaInTablero(fichaSelected, posInX) == true) {


                    if (jugadorActual == Jugador1.name) {
                        removeFromArray(fichas1, fichaSelected);
                    } else {
                        removeFromArray(fichas2, fichaSelected);
                    }

                    tablero.refreshVecinosOfFichas();
                    reDrawTable();

                    let fullTablero = tablero.checkTableroLleno();
                    endedGame = fichaSelected.checkWinGame(1, fichaSelected.vecinos, fichaSelected.jugador, limite);

                    winnerName = fichaSelected.jugador;

                    if (!endedGame && fullTablero != true) {
                        //Switch players
                        if (jugadorActual == Jugador1.name) {
                            jugadorActual = Jugador2.name;
                            tablero.drawTurno(jugadorActual, Jugador1, Jugador2);
                        } else {
                            jugadorActual = Jugador1.name;
                            tablero.drawTurno(jugadorActual, Jugador1, Jugador2);
                        }
                    } else {
                        let retorno;

                        if (endedGame) retorno = "se termino por jugador " + winnerName;
                        else retorno = "se termino por tablero lleno";

                        endGame(retorno);
                        //bloquear todos los listener de las fichas
                        endedGame = true;
                    }
                }
            }
            fichaSelected = null;
        }
    });

    function restart() {
        Jugador1 = {
            color: '#F37A15',
            name: 'Jugador 1'
        }

        Jugador2 = {
            color: '#3F5BCF',
            name: 'Jugador 2'
        }

    }


    function startGame(Jugador1, Jugador2) {
        let numRandom = Math.round(Math.random() * 10);

        endedGame = false


        //Setea colores a los jugadores
        document.querySelector(".j1").style.color = Jugador1.color;
        document.querySelector(".j2").style.color = Jugador2.color;

        //Trae el tamanio deseado del tablero desde el select
        let valueBoard = tagTablero.value;
        let arrColsRows = valueBoard.split('x');
        filas = arrColsRows[0];
        cols = arrColsRows[1];
        limite = arrColsRows[2];
        limite = parseInt(limite);



        tablero = new Tablero(filas, cols, ctx, imgFicha, imgTablero);


        //Saca la cuenta de cuantas fichas por jugador
        let fichasPorJugador = Math.floor(((filas * cols) - 1) / 2);

        //arranca un jugador segun el "sorteo"
        if (numRandom > 4.5) {
            jugadorActual = Jugador1.name;
        } else {
            jugadorActual = Jugador2.name;
        }
        //agrega las fichas por jugador
        for (let i = 0; i <= fichasPorJugador; i++) {
            fichas1[i] = new Ficha(Jugador1.name, Jugador1.color);
            fichas2[i] = new Ficha(Jugador2.name, Jugador2.color);
        }


        reDrawTable();

        //dibuja de quien es el turno
        tablero.drawTurno(jugadorActual, Jugador1, Jugador2);
        tablero.drawTablero();
        tablero.drawCasilleros();

        //dibuja las fichas de cada jugador
        tablero.colocarIdleFichas(fichas1, fichas2);

        crono = new Cronometro(2, 10);
    }


    function setPlayersNames() {
        //Si puso algun nombre se lo setea
        if (document.querySelector("#nameP1").value !== '') {
            Jugador1.name = document.querySelector("#nameP1").value;
        }
        if (document.querySelector("#nameP2").value !== '') {
            Jugador2.name = document.querySelector("#nameP2").value;
        }
    }


    function reDrawTable() {
        ctx.fillStyle = "#E6A26E";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        tablero.drawTablero();
        tablero.drawCasilleros();
        tablero.refreshTablero();
        tablero.refreshIdleFichas(fichas1, fichas2);
    }

    function removeFromArray(array, obj) {
        let index = array.indexOf(obj);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    function endGame(string) {
        alert(string);
    }

    function setBtnsColorListeners(clase, jugador) {

        //agarra los botones y los prepara
        let select_player_btns = document.querySelectorAll("." + clase);

        select_player_btns.forEach(btn => {
            //cuando se haga click cambiara el boton
            btn.addEventListener("click", function() {
                jugador.color = btn.id;
            });
        });
    }

    function setBtnColors() {
        let players_btns = document.querySelectorAll(".color_rect");
        players_btns.forEach(rect => {
            let btn = rect.parentElement;
            rect.style.backgroundColor = btn.id;
        });
    }