window.onload = function(){
    var canvas = document.querySelector('.canvas');
    var ctx = canvas.getContext('2d');
    
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    const fichasJugadores = 42;
    var fichaSelected = false;
    
    var fichas = Array();
    let colorFichaTablero = `rgba(${155},${155},${155},${1})`;
    
    //creamos el tablero y sus fichas "vacias"
    var tablero = new Tablero(129,70,800,500,colorFichaTablero,ctx,canvas);
    tablero.draw();    
    tablero.drawFichasEmpty();
    
    function addFicha(posX,color){
        var ficha;
        let posY = Math.round(Math.random() * (canvas.height)-30);
        ficha = new Ficha(posX,posY,25,color,ctx,canvas);
        fichas.push(ficha);
    }
    
    function addFigure(){
        let color;
        let posX;
            if(fichas.length >= 24){
                color = `rgba(${255},${0},${0},${1})`;
                posX=1000;
            }else{
                color = `rgba(${255},${233},${0},${1})`;
                posX=60;
            }
        addFicha(posX,color);
        drawFigures();
    }
    
    function drawFigures(){
        for(let i=0; i < fichas.length ;i++){
            fichas[i].draw();
        }
    }
    
    function addFigures(){
        addFigure();
        if(fichas.length <= fichasJugadores){
            setTimeout(addFigures,1);
        }
    }
    setTimeout(()=>{
        addFigures();
    },0.0);
    
    canvas.addEventListener("mousedown", function(e){
        for(let i=0;i < fichasJugadores ; i++){
            if(fichas[i].isInsede(e.clientX,e.clientY)){
                fichaSelected=fichas[i];
        }
    }
    });
    
    canvas.addEventListener("mousemove", function(e){
        if(fichaSelected){
            fichaSelected.posX = e.clientX;
            fichaSelected.posY = e.clientY;
            fichaSelected.draw();
            clearCanvas();
            tablero.draw();
            tablero.drawFichasEmpty();
            drawFigures();
        }
    });
    
    canvas.addEventListener("mouseup",function(e){
        fichaSelected=false;
        tablero.ultFichaColumna(e.clientX);
        
    });
    
    function clearCanvas(){
        ctx.fillStyle= "#FFFFFF";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }
    };