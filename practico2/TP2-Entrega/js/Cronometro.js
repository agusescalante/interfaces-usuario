class Cronometro {
    minutos;
    segundos;
    ticker;

    constructor(minutos, segundos) {
        this.minutos = minutos;
        this.segundos = segundos;

        this.countDown();
    }

    countDown() {
        let minutos = this.minutos;
        let segundos = this.segundos;

        let ticker = setInterval(function() {
            console.log(minutos, segundos);

            if (minutos == 0 && segundos == 0) {
                clearInterval(ticker);
                fichaSelected = null;
                endedGame = true;
                endGame("Se terminó el tiempo");
            } else if (!endedGame) {
                if (segundos != 0) {
                    segundos--;
                } else {
                    minutos--;
                    segundos = 59;
                }
            }

        }, 1000);
    }

    stopTimer() {
        this.stop = true;
    }
}