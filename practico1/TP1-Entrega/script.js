let canvas = document.querySelector('.canvas1');
let input = document.querySelector('.input1');

var context = canvas.getContext('2d');
context.fillStyle = "#ffffff";
// context.fillStyle = "#545994";
context.fillRect(0, 0, canvas.width, canvas.height);

let rect = canvas.getBoundingClientRect();

let borrando = false;
let dibujando = false;
let color = null;
let customColor = null;
let size = 1;
var goma = "#FFFFFF";
let lastSelected = null;

var imagenCargada = false;
var descartarImg = false;

activateButtonSelection();

//EventListeners para los botones
document.querySelector("#brush").addEventListener("click", () => {
    pintar("black");
});

document.querySelector("#eraser").addEventListener("click", () => {
    pintar("white");
});

let saturationRange = document.querySelector("#rangeSat");
saturationRange.addEventListener("input", () => {
    saturation(saturationRange.value)
});

//Guardar color seleccionado
let inputColor = document.querySelector("#color");
inputColor.addEventListener("input", () => {
    customColor = inputColor.value;
    pintar();
});


let brushRange = document.querySelector("#brushRange");
brushRange.addEventListener("input", () => {
    size = brushRange.value;
});

//Para descargar el canvas hay que hacer una cadena de clicks con el input.

document.querySelector("#saveImage").addEventListener("click", () => {
    document.querySelector(".download").click();
});
document.querySelector(".download").addEventListener("click", () => {
    download();
});
//------------------------------------------------------------------------



//Filters____________________________________________________________
document.querySelector("#addImage").addEventListener("click", () => {
    document.querySelector('.input1').click();
});

document.querySelector("#negative").addEventListener("click", () => {
    negative();
});

document.querySelector("#sepia").addEventListener("click", () => {
    sepia();
});

document.querySelector("#grayScale").addEventListener("click", () => {
    grayScale();
});

document.querySelector("#binary").addEventListener("click", () => {
    binarizacion();
});

document.querySelector("#borderDetection").addEventListener("click", () => {
    deteccionBordes();
});

document.querySelector("#saturation").addEventListener("click", () => {
    saturation();
});

document.querySelector("#clearCanvas").addEventListener("click", () => {
    refresh();
});

//_________________________________

function activateButtonSelection() {
    let buttons = document.querySelector(".brush_column").childNodes;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleSelectedBtn(btn);
        });
    });

}

function toggleSelectedBtn(btn) {
    btn.classList.add("selected");
    btn.classList.remove("deselected");

    if (lastSelected != null) {
        lastSelected.classList.remove("selected");
        lastSelected.classList.add("deselected");
    }
    lastSelected = btn;
}


function getRed(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}
function getAlpha(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 3];
}

function refresh() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    let imageData2 = context.getImageData(0, 0, canvas.width, canvas.height);

    context.putImageData(imageData2, 0, 0);

    borrando = false;
    dibujando = false;
}

function restaurarOriginal() {
    if ((imagenCargada === true) && (descartarImg === false))
        context.putImageData(imagenOriginal, 0, 0);
    lapiz = false;
    goma = false;
}

function negative() {
    restaurarOriginal();
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let r = 255 - getRed(imageData, x, y);
            let g = 255 - getGreen(imageData, x, y);
            let b = 255 - getBlue(imageData, x, y);
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    context.putImageData(imageData, 0, 0);
}





    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.height) * 4;

        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function getPixel(imageData, x, y) {
        let index = (x + y * imageData.height) * 4;

        let data = [];
        data["r"] = imageData.data[index + 0];
        data["g"] = imageData.data[index + 1];
        data["b"] = imageData.data[index + 2];
        data["a"] = imageData.data[index + 3];
        return data;
    }

    function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
        return (Math.min((maxW / imgW), (maxH / imgH)));
    }

    canvas.addEventListener("mousemove", (e) => {

        //Si el mouse esta actualmente activo
        if (mouseDown == 1) {

            let canvasPos = canvas.getBoundingClientRect();

            actualX = e.clientX - canvasPos.left;
            actualY = e.clientY - canvasPos.top;

            if (lastX != null) {
                drawLine(lastX, lastY, actualX, actualY);
            }

            drawCircle(actualX, actualY);

            lastX = actualX;
            lastY = actualY;
        } else {
            lastX = null;
            lastY = null;
        }
    });

    //Arranco a clickear
    canvas.onmousedown = function (e) {

        let canvasPos = canvas.getBoundingClientRect();

        actualX = e.clientX - canvasPos.left;
        actualY = e.clientY - canvasPos.top;

        drawCircle(actualX, actualY);
    };

    canvas.onmouseup = function () {
        mouseDown = 0;
    }

    function drawCircle(x, y) {
        mouseDown = 1;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
        ctx.fillStyle = brushCurrentColor;
        ctx.strokeStyle = brushCurrentColor;
        ctx.fill();
        ctx.stroke();
    }

    function drawLine(Bx, By, x, y) {
        ctx.beginPath();
        ctx.moveTo(Bx, By);
        ctx.lineTo(x, y);

        //Si del radio del circulo = brushSize, entonces total del círculo = brushSize * 2
        //y +2 para un lienzo mas refinado.
        ctx.lineWidth = brushSize * 2 + 2;
        ctx.strokeStyle = brushCurrentColor;
        ctx.fill();
        ctx.stroke();
    }

    function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
        return (Math.min((maxW / imgW), (maxH / imgH)));
    }
});
