"use strict";
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

let width = 900;
let height = 500;
let imageData = ctx.createImageData(width,height);

let r=0;
let g=0;
let b=0;
let a=255;

for(let x = 0;x < width; x++){
    for(let y=0; y < height; y++){
        var media = 255 / (width/2);
        if(x < (width / 2)){
            r = media * x;
            g = media * x;
            b = 0;
        }else{
            r = 255;
            g = 255 - (media * (x - (width/2)));
        }
        setPixel(imageData,x,y,r,g,b,a);
    }
}
ctx.putImageData(imageData,0,0);



function setPixel(imageData,x,y,r,g,b,a){
    let index;
    index = (x + y * imageData.width)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}

