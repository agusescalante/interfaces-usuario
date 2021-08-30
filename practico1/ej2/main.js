"use strict";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const height = 75;
const width = 100; 
  
let colores = ['#550000','#801515','#D46A6A','#07123A'];

function createRec(x,y,color,height,width){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,height,width);
}

createRec(300,225,colores[0],100,75);
createRec(200,225,colores[1],100,75);
createRec(100,225,colores[2],100,75);
createRec(0,225,colores[3],100,75);

createRec(50,150,colores[3],100,75);
createRec(150,150,colores[2],100,75);
createRec(250,150,colores[1],100,75);

createRec(100,75,colores[3],100,75);
createRec(200,75,colores[2],100,75);

createRec(150,0,colores[3],100,75);

