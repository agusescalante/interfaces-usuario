class Tablero{
    constructor(posX,posY,width,height,fill,ctx,canvas){
        this.posX=posX;
        this.posY=posY;
        this.fill=fill;
        this.ctx=ctx;
        this.width=width;
        this.height=height;
        this.canvas=canvas;
        this.matrizFichas=Array();
        this.arregloColumnas=Array();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.posX,this.posY,this.width,this.height);
        this.ctx.fillStyle='#ff0000';
        this.ctx.stroke();
        this.ctx.closePath();
    }
    //70,140,210,280,350,420,490,560
    drawFichasEmpty(){
        let colorFichas = `rgba(${155},${155},${155},${1})`;
        let limitWidth,limitHeight;
        limitWidth= this.posX+this.width;
        limitHeight = this.posY+this.height;
        for(let y = this.posY; y < limitHeight;y+=70){
            this.matrizFichas[y]=Array();
            for(let x = this.posX ; x < limitWidth; x+=120){
                let ficha = new Ficha(x+25,y+25,25,colorFichas,this.ctx,this.canvas);
                this.matrizFichas[y][x]=ficha.draw();

            }
        }
    }

    ultFichaColumna(columna){
         for(let y=this.posY+this.height;y < this.posY;y-=70){
            if(Math.floor(columna)  ){}
            let ficha2 = new Ficha(70,129,25,`rgba(${255},${0},${0},${1})`,this.ctx,this.canvas);
                this.matrizFichas[y][columna]=ficha2.draw();
             
        }
    }



}