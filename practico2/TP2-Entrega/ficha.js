class Ficha{
    constructor(posX,posY,radius,fill,ctx,canvas){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.canvas = canvas;
        this.radius = radius;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    isInsede(x,y){
        let rect = this.canvas.getBoundingClientRect();
        let distancia,restaPuntos,fichaX,fichaY;
        fichaX = x - rect.left;
        fichaY = y - rect.top ;
        restaPuntos = Math.pow(fichaX-this.posX,2) + Math.pow(fichaY-this.posY,2);
        distancia = Math.sqrt(restaPuntos);
        let unNumber=this.getRadius();
        if(distancia < unNumber){ return true };
    }
    getRadius(){
        return this.radius;
    }

}