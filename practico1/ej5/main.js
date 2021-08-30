
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

let height = canvas.height;
let width = canvas.width;
let imageData = ctx.createImageData(width,height);

let r=0;
let g=0;
let b=0;
let a=255;

for(let x = 0;x < height; x++){
    let media = 255 / (height/2)
    for(let y=0; y < width; y++){
        if(x < width / 2){
            r = media * x;
            g = media * x;
        }else{
            //g = 255 - (media * (x - (width/2)));
            r = 255 - (media * (x - (width/2)));

        }
        setPixel(imageData,x,y,r,g,b,a);
    }
    ctx.putImageData(imageData,0,0);
}



function setPixel(imageData,x,y,r,g,b,a){
    index = (x + y * imageData.width)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
}

