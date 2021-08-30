const canvas = /** @type {CanvasRenderingContext2D} */
                    (document.querySelector('canvas'));
const ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

let imageData=ctx.createImageData(width,height);



for(let i=0;i < width;i++){
    for(let j=0;j < height;j++){
        setPixel(imageData,i,j,111,77,77,255);
    }
}
ctx.putImageData(imageData,0,0);

function setPixel(imageData,x,y,r,g,b,a){
    index = (x + y * imageData.width)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}