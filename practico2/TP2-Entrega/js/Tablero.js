class Tablero {
    altura;
    anchura;
    posY;
    posX;
    recuadroSize;
    tablero;
    ctx;
    imgTablero;

    constructor(altura, anchura, ctx, imgFicha, imgTablero) {
        this.altura = altura;
        this.radius = 35;
        this.imgFicha = imgFicha;
        this.anchura = anchura;
        this.tablero = this.initTablero();
        this.ctx = ctx;
        this.posX = 170;
        this.posY = 100;
        this.recuadroSize = 80;
        this.imgTablero = imgTablero;
    }

    printMatrix() {
        console.table(this.tablero);
        console.log(this.getVecinos(5, 1));
    }

    drawTablero() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.imgTablero, this.posX, this.posY, this.recuadroSize * this.anchura, this.recuadroSize * this.altura);
        this.ctx.fillStyle = '#E6A26E';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawCasilleros() {
        for (let i = this.posX; i < this.recuadroSize * this.anchura + this.posX; i += this.recuadroSize) {
            for (let j = this.posY; j < this.recuadroSize * this.altura + this.posY; j += this.recuadroSize) {

                this.ctx.beginPath();
                //+ 40 pa centrar
                this.ctx.arc(i + 40, j + 40, 35, 0, 2 * Math.PI);
                this.ctx.fillStyle = "gray";
                this.ctx.fill();
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    initTablero() {
        let tablero = [];
        for (let i = 0; i < this.altura; i++) {
            tablero[i] = [];
            for (let j = 0; j < this.anchura; j++) {
                tablero[i][j] = 0;
            }
        }
        return tablero;
    }

    drawFichaInTablero(color, x, y) {
        this.ctx.beginPath();
        //Offset = this.recuadroSize + this.posX
        this.ctx.arc(x * this.recuadroSize + this.posX + 40, y * this.recuadroSize + this.posY + 40, 35, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.drawImage(this.imgFicha, x * this.recuadroSize + this.posX + 2, y * this.recuadroSize + this.posY + 2, this.radius * 2.2, this.radius * 2.2);
        this.ctx.closePath();
    }

    drawFicha(color, x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 35, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.drawImage(this.imgFicha, x - this.radius, y - this.radius, this.radius * 2, this.radius * 2);
        this.ctx.closePath();
    }

    colocarIdleFichas(fichas1, fichas2) {
        let y = 100;
        for (let i = 0; i < fichas1.length; i++) {
            this.drawFicha(fichas1[i].relleno, 75, y);
            fichas1[i].posX = 75;
            fichas1[i].posY = y;
            y += 20;
        }
        y = 100;
        for (let i = 0; i < fichas2.length; i++) {
            //para que se acomode al tablero
            let xFichasDerechas = this.recuadroSize * this.anchura + this.posX + 80;
            this.drawFicha(fichas2[i].relleno, xFichasDerechas, y);
            fichas2[i].posX = xFichasDerechas;
            fichas2[i].posY = y;
            y += 20;
        }
    }

    // muestra quien juega en ese momento
    drawTurno(jugadorActual, j1, j2) {
        if (jugadorActual == j1.name) {
            this.ctx.fillStyle = j1.color;
            this.ctx.font = "bold 30px Prompt";
            this.ctx.fillText("Juega " + j1.name, this.posX - 40, this.posY - 40);
        } else {
            let xFichasDerechas = this.recuadroSize * this.anchura;
            this.ctx.fillStyle = j2.color;
            this.ctx.font = "bold 30px Prompt";
            this.ctx.fillText("Juega " + j2.name, xFichasDerechas, this.posY - 40);
        }
    }

    refreshTablero() {
        for (let i = 0; i < this.altura; i++) {
            for (let j = 0; j < this.anchura; j++) {
                if (this.tablero[i][j] != 0) {
                    let ficha = this.tablero[i][j];
                    this.drawFichaInTablero(ficha.relleno, j, i);
                }
            }
        }
    }

    refreshVecinosOfFichas() {
        for (let y = 0; y < this.tablero.length; y++) {
            for (let x = 0; x < this.tablero[y].length; x++) {
                if (this.tablero[y][x] != 0) {
                    this.tablero[y][x].vecinos = this.getVecinos(y, x);
                }
            }
        }

    }

    refreshIdleFichas(fichas1, fichas2) {
        let ficha;
        for (let i = 0; i < fichas1.length; i++) {
            ficha = fichas1[i];
            this.drawFicha(ficha.relleno, ficha.posX, ficha.posY);
        }

        for (let i = 0; i < fichas2.length; i++) {
            ficha = fichas2[i];
            this.drawFicha(ficha.relleno, ficha.posX, ficha.posY);
        }
    }

    colocarFichaInTablero(ficha, x) {
        for (let y = this.altura - 1; y >= 0; y--) {
            if (this.tablero[y][x] == 0) {
                this.tablero[y][x] = ficha;
                this.drawFichaInTablero(ficha.relleno, x, y);
                return true;
            }
        }
        return false;
    }

    getXFromPx(Xpixels) {
        return Math.floor((Xpixels - this.posX) / 80);
    }

    itsCandidate(y, x) {
        try {
            if (this.tablero[y][x] != undefined && this.tablero[y][x] != 0) {
                return true;
            } else return false;
        } catch (error) {
            return false;
        }
    }

    checkTableroLleno() {
        let contador = 0;
        for (let y = 0; y < this.tablero.length; y++) {
            for (let x = 0; x < this.tablero[y].length; x++) {
                if (this.tablero[y][x] == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    getVecinos(y, x) {

        let vecinos = [];

        for (let i = 0; i < 7; i++) {
            vecinos[i] = null;
        }

        if (this.itsCandidate(y, x - 1)) {
            vecinos.splice(5, 1, this.tablero[y][x - 1]);
        }

        if (this.itsCandidate(y, x + 1)) {
            vecinos.splice(1, 1, this.tablero[y][x + 1]);
        }

        if (this.itsCandidate(y + 1, x)) {
            vecinos.splice(3, 1, this.tablero[y + 1][x]);
        }

        if (this.itsCandidate(y + 1, x - 1)) {
            vecinos.splice(4, 1, this.tablero[y + 1][x - 1]);
        }

        if (this.itsCandidate(y + 1, x + 1)) {
            vecinos.splice(2, 1, this.tablero[y + 1][x + 1]);
        }

        if (this.itsCandidate(y - 1, x + 1)) {
            vecinos.splice(0, 1, this.tablero[y - 1][x + 1]);
        }

        if (this.itsCandidate(y - 1, x - 1)) {
            vecinos.splice(6, 1, this.tablero[y - 1][x - 1]);
        }
        return vecinos;
    }
}