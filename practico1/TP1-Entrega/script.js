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
    HSLParams(saturationRange.value, "saturation")
});

let brightnessRange = document.querySelector("#rangeBright");
brightnessRange.addEventListener("input", () => {
    HSLParams(brightnessRange.value, "brightness")
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

document.querySelector("#clearCanvas").addEventListener("click", () => {
    refresh();
});

document.querySelector("#blur").addEventListener("click", () => {
    blur();
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

//Genera el opuesto al color actual.
//Esto se logra restando a 255 el color del pixel y colocando el resultado en su lugar
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

//Se pasa el lienzo de color a escala de grises.
//Esto se logra sacando el promedio entre r,g y b, y dandoles ese promedio como valor
function grayScale() {
    restaurarOriginal();

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {

            let r = getRed(imageData, x, y);
            let g = getGreen(imageData, x, y);
            let b = getBlue(imageData, x, y);
            let valueGray = (r + g + b) / 3;

            setPixel(imageData, x, y, valueGray, valueGray, valueGray, 255);
        }
    }
    context.putImageData(imageData, 0, 0);
}


//Se pasa el lienzo de de color a un tono sepia.
//Esto se logra agarrando los valores del pixel, y a cada uno se le asigna un valor en base a una cuenta
//Estas cuentas trataran de equilibrar el R con el G, y disminuir el B para darle el tinte Sepia.
function sepia() {
    restaurarOriginal();
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let r = getRed(imageData, x, y);
            let g = getGreen(imageData, x, y);
            let b = getBlue(imageData, x, y);
            r = (r * 0.393) + (g * 0.769) + (b * 0.189)
            g = (r * 0.349) + (g * 0.686) + (b * 0.168)
            b = (r * 0.272) + (g * 0.534) + (b * 0.131)
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    context.putImageData(imageData, 0, 0);
}

//Se pasa el lienzo de color a blanco y negro.
//Esto se logra sacando el promedio de color del pixel (promedio entre r,g y b) y considerando si pasa o no el límite
// (El límite siendo 255/2) si lo sobrepasa, ese pixel se volverá blanco, si no lo pasa se volverá negro.
function binarizacion() {
    restaurarOriginal();

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let r = getRed(imageData, x, y);
            let g = getGreen(imageData, x, y);
            let b = getBlue(imageData, x, y);
            let a = getAlpha(imageData, x, y);

            let gray = Math.floor((r + g + b) / 3);
            if (gray > 255 / 2) {
                r = 255
                g = 255
                b = 255
                a = 255;
                setPixel(imageData, x, y, r, g, b, a);
            } else {
                r = 0
                g = 0
                b = 0
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
        context.putImageData(imageData, 0, 0);
    }
}

//Se aumenta la saturación del lienzo.
//Esto se logra convirtiendo los valores del pixel de RGB a HSL y subiendo la saturación,
//luego, restauran los valores a RGB  y se aplican al pixel
function HSLParams(filter_ammount, type) {
    restaurarOriginal();

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {

            //Get pixel info
            let index = (x + y * imageData.width) * 4;
            let r = imageData.data[index];
            let g = imageData.data[index + 1];
            let b = imageData.data[index + 2];

            //convert
            let hsl_pixel = RGBToHSL(r, g, b);

            //multiply
            if (type == "saturation") {
                hsl_pixel.s = hsl_pixel.s * filter_ammount;
            } else if (type == "brightness") {
                hsl_pixel.l = hsl_pixel.l * filter_ammount;
            }



            let new_rgb = HSLToRGB(hsl_pixel.h, hsl_pixel.s, hsl_pixel.l);
            r = new_rgb.r;
            g = new_rgb.g;
            b = new_rgb.b;
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    context.putImageData(imageData, 0, 0);
}


function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        "h": h,
        "s": s,
        "l": l
    };
}

function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {
        "r": r,
        "g": g,
        "b": b
    };
}

//Se difumina el lienzo.
//Esto se logra tomando los valores del pixel (r, g y b) y sus vecinos, y calculando el promedio entre todos ellos.
//Luego, se le aplica al pixel los valores de estos promedios.
function blur() {

    function getPixelInfo(x, y) {
        let r = data[((width * y) + x) * 4 + 0];
        let g = data[((width * y) + x) * 4 + 1];
        let b = data[((width * y) + x) * 4 + 2];

        //bug? devuelve blanco cuando deberia ser solo rojo
        if (x == -1 && y == 1) {
            return null;
        }


        let retorno;
        if (r == null || g == null || b == null) {
            retorno = null;
        } else {
            retorno = {
                "r": r,
                "g": g,
                "b": b
            }
        }

        return retorno;
    }

    let height = canvas.height;
    let width = canvas.width;

    let originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = originalImageData.data;
    let newImageData = context.createImageData(canvas.width, canvas.height);

    let x, y;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {

            let counter = 0;
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;

            let positions = [];

            let topLeft = getPixelInfo(x - 1, y - 1);
            if (topLeft != null) {
                positions.push(topLeft);

            }

            let top = getPixelInfo(x, y - 1);
            if (top != null) {
                positions.push(top);

            }

            let topRight = getPixelInfo(x + 1, y - 1);
            if (topRight != null) {
                positions.push(topRight);

            }

            let left = getPixelInfo(x - 1, y);
            if (left != null) {
                positions.push(left);

            }

            let main = getPixelInfo(x, y);
            if (main != null) {
                positions.push(main);

            }

            let right = getPixelInfo(x + 1, y);
            if (right != null) {
                positions.push(right);

            }

            let bottomLeft = getPixelInfo(x - 1, y + 1);
            if (bottomLeft != null) {
                positions.push(bottomLeft);

            }

            let bottom = getPixelInfo(x, y + 1);
            if (bottom != null) {
                positions.push(bottom);

            }

            let bottomRight = getPixelInfo(x + 1, y + 1);
            if (bottomRight != null) {
                positions.push(bottomRight);

            }

            positions.forEach((pixel) => {
                counter++;
                totalR += pixel.r;
                totalG += pixel.g;
                totalB += pixel.b;
            });

            totalR /= counter;
            totalG /= counter;
            totalB /= counter;

            setPixel(newImageData, x, y, totalR, totalG, totalB, 255);



        }
    }
    context.putImageData(newImageData, 0, 0);
}

//Operador Sobel:
//Para detectar bordes, se fija que tan brusco es el cambio de tonalidad de un color a otro.

//Para sacar los bordes dentro del canvas, primero pasamos este mismo a escala de grises (Sobel no usa colores)
//Y luego multiplicamos las máscaras X e Y por cada pixel y sus vecinos adyacentes, y sumamos los resultados de éstas.
//Con el teorema de Pitágoras sacamos la magnitud del gradiente, combinando los resultados
// de las gradientes X e Y, (y de paso pasamos el signo a positivo).
//Le removemos el ruido que la imagen pueda tener y le damos ese valor al pixel.
function deteccionBordes() {
    restaurarOriginal();

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let maskX =
        [[-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]];
    let maskY =
        [[-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]];

    let sobel_data = imageData;
    let gray_scale = [];

    let width = imageData.width;
    let height = imageData.height;

    let data = imageData.data;

    function pixelAt(x, y, i = 0) {
        return data[((width * y) + x) * 4 + i];
    }
    let x, y;

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            let r = pixelAt(x, y, 0);
            let g = pixelAt(x, y, 1);
            let b = pixelAt(x, y, 2);
            let avg = (r + g + b) / 3;
            gray_scale.push(avg, avg, avg, 255);
        }
    }

    data = gray_scale;

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {

            let pixelX = (
                (maskX[0][0] * pixelAt(x - 1, y - 1)) +
                (maskX[0][1] * pixelAt(x, y - 1)) +
                (maskX[0][2] * pixelAt(x + 1, y - 1)) +
                (maskX[1][0] * pixelAt(x - 1, y)) +
                (maskX[1][1] * pixelAt(x, y)) +
                (maskX[1][2] * pixelAt(x + 1, y)) +
                (maskX[2][0] * pixelAt(x - 1, y + 1)) +
                (maskX[2][1] * pixelAt(x, y + 1)) +
                (maskX[2][2] * pixelAt(x + 1, y + 1))
            );
            let pixelY = (
                (maskY[0][0] * pixelAt(x - 1, y - 1)) +
                (maskY[0][1] * pixelAt(x, y - 1)) +
                (maskY[0][2] * pixelAt(x + 1, y - 1)) +
                (maskY[1][0] * pixelAt(x - 1, y)) +
                (maskY[1][1] * pixelAt(x, y)) +
                (maskY[1][2] * pixelAt(x + 1, y)) +
                (maskY[2][0] * pixelAt(x - 1, y + 1)) +
                (maskY[2][1] * pixelAt(x, y + 1)) +
                (maskY[2][2] * pixelAt(x + 1, y + 1))
            );

            //remove sign and get magnitude
            let measure = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY));

            //remove noise
            measure = (measure / 1000) * 255;

            setPixel(sobel_data, x, y, measure, measure, measure, 255);
        }
    }
    context.putImageData(sobel_data, 0, 0);

}

function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
    return (Math.min((maxW / imgW), (maxH / imgH)));
}

input.onchange = e => {
    let file = e.target.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = readerEvent => {

        let content = readerEvent.target.result;

        let image = new Image();

        image.src = content;

        image.onload = function () {

            let aspectRatio = scalePreserveAspectRatio(image.width, image.height, canvas.width, canvas.height);
            context.drawImage(this, 0, 0, image.width * aspectRatio, image.height * aspectRatio);


            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            context.putImageData(imageData, 0, 0);

            imagenOriginal = imageData;
            imagenCargada = true;
            descartarImg = false;
        }
    }
}

function download() {
    var filename = prompt("Guardar como...", "Nombre del archivo");
    if (canvas.msToBlob) { //para internet explorer
        var blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, filename + ".png");
    } else {
        link = document.getElementById("download");
        //Otrs navegadores: Google chrome, Firefox etc...
        link.href = canvas.toDataURL("image/png");// Extensión .png ("image/png") --- Extension .jpg ("image/jpeg")
        link.download = filename;
    }
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function pintar(selectedColor) {
    let x = 0, y = 0;

    if (selectedColor != "white") {
        if (customColor == null) {
            color = "black";
        } else {
            color = customColor;
        }
    } else {
        color = selectedColor;
    }


    canvas.addEventListener('mousedown', function (e) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        dibujando = true;
    });
    canvas.addEventListener('mousemove', function (e) {
        if (dibujando) {
            drawCircle(e.clientX - rect.left, e.clientY - rect.top);
            dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top);
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
    });
    canvas.addEventListener('mouseup', function (e) {
        if (dibujando) {
            dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top);
            x = 0;
            y = 0;
            dibujando = false;
        }
    });
}

function dibujar(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = size * 2 + 2;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.fill();
    context.stroke();

}

function drawCircle(x, y) {
    context.lineWidth = 1;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.strokeStyle = color;
    context.fill();
    context.stroke();
}
