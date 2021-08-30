var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

let width = 150;
let height = 150;

let r=0;
let g=0;
let b=0;
let a=100;

let imageData = ctx.createImageData(width,height);

for(let i=0;i < width;i++){
    for(let j=0;j < height;j++){
        let colour =255/width;
        let r= colour * j;
        let g= colour * j;
        let b= colour * j;
        let a= 255;
        setPixel(imageData,i,j,r,g,b,a);
    }
}
ctx.putImageData(imageData,0,0);

function setPixel(imageData,i,j,r,g,b,a){
    index = (i + j * imageData.width)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}