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


function saturation(filter_ammount) {
    restaurarOriginal();

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    //let filter_ammount = 4;
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let index = (x + y * imageData.width) * 4;
            let r = imageData.data[index];
            let g = imageData.data[index + 1];
            let b = imageData.data[index + 2];
            let hsl_pixel = RGBToHSL(r, g, b);
            if (filter_ammount <= 1) {
                hsl_pixel.s = hsl_pixel.s * filter_ammount;
            }
            if (filter_ammount > 1) {
                hsl_pixel.s = hsl_pixel.s + ((100 - hsl_pixel.s) * (filter_ammount - 1));
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
});
