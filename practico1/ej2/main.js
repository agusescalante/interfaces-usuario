const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//fila base
ctx.fillStyle = '#550000';
ctx.fillRect(300,225,100,75);

ctx.fillStyle = '#801515';
ctx.fillRect(200,225,100,75);

ctx.fillStyle = '#D46A6A';
ctx.fillRect(100,225,100,75);

ctx.fillStyle = '#07123A';
ctx.fillRect(0,225,100,75);

//prox a la fila base
ctx.fillStyle = '#07123A';
ctx.fillRect(50,150,100,75);

ctx.fillStyle = '#D46A6A';
ctx.fillRect(150,150,100,75);

ctx.fillStyle = '#801515';
ctx.fillRect(250,150,100,75);


//prox a la fila base
ctx.fillStyle = '#07123A';
ctx.fillRect(100,75,100,75);

ctx.fillStyle = '#D46A6A';
ctx.fillRect(200,75,100,75);


//prox a la fila base
ctx.fillStyle = '#07123A';
ctx.fillRect(150,0,100,75);


