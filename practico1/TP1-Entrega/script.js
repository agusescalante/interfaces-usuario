document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.querySelector("#canvas");

    let mouseDown = 0;
    let lastX = null;
    let lastY = null;
    let img = new Image();
    let ctx = canvas.getContext("2d");

    let brushCurrentColor = "#000000";
    // let brushCurrentColor = "#FF5511";
    let brushSize = 3;

    let borrador = "#ffffff";

    loadImage();

    function loadImage() {
        img.src = 'prueba3.png';
        // img.src = "prueba3.png";

        img.onload = function () {
            let canvasWidth = canvas.clientWidth;
            let canvasHeight = canvas.clientHeight;

            // let aspectRatio = scalePreserveAspectRatio(img.width, img.height, canvasWidth, canvasHeight);
            ctx.drawImage(img, 0, 0);
            // , img.width * aspectRatio, img.height * aspectRatio);
        };
    }

    document.querySelector("#filtroBw").addEventListener("click", () => {
        filterBlackAndWhite();
    });

    document.querySelector("#filtroSepia").addEventListener("click", () => {
        sepia();
    });

    document.querySelector("#filtroBlur").addEventListener("click", () => {
        blur();
    });

    function filterBlackAndWhite() {
        width = canvas.width;
        height = canvas.height;

        let imageData = ctx.getImageData(0, 0, width, height);

        let x = 0;
        let y = 0;


        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {

                let pixelData = getPixel(imageData, y, x);
                let r = pixelData["r"];
                let g = pixelData["g"];
                let b = pixelData["b"];

                let promedio = r + g + b;
                promedio = promedio / 3;
                if (promedio != 0) {
                    setPixel(imageData, y, x, promedio, promedio, promedio, 255);
                }
                // console.log(getPixel(imageData, y, x));
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function sepia() {
        width = canvas.width;
        height = canvas.height;

        let imageData = ctx.getImageData(0, 0, width, height);

        let x = 0;
        let y = 0;


        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {

                let pixelData = getPixel(imageData, y, x);
                let r = pixelData["r"];
                let g = pixelData["g"];
                let b = pixelData["b"];

                let luminosidad = .3 * r + .6 * g + .1 * b;

                if (luminosidad != 0) {
                    setPixel(imageData, y, x, Math.min(luminosidad + 40, 255), Math.min(luminosidad + 15, 255), luminosidad, 255);
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function blur() {

        width = canvas.width;
        height = canvas.height;

        let imageData = ctx.getImageData(0, 0, width, height);

        let copiedImageData = ctx.createImageData(width, height);


        let i;
        let j;
        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
            //i = x
            //j = y

                let top = false;
                let bottom = false;
                let right = false;
                let left = false;

                let contador = 1;
                let pixel_info;

                let rgb = getPixel(imageData, j, i);

                let container_r = rgb["r"];
                let container_g = rgb["g"];
                let container_b = rgb["b"];

                if (j != 0) {
                    //revisa el techo
                    top = true;
                    // container += matriz[i - 1][j];
                    pixel_info = getPixel(imageData, j - 1, i);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }
                if (i != 0) {
                    //reviso izq
                    left = true;
                    pixel_info = getPixel(imageData, j, i - 1);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }
                if (j != height - 1) {
                    //Reviso abajo
                    bottom = true;
                    // container += matriz[i + 1][j];
                    pixel_info = getPixel(imageData, j + 1, i);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }
                if (i != width - 1) {
                    //Reviso der
                    right = true;
                    // container += matriz[i][j + 1];
                    pixel_info = getPixel(imageData, j, i + 1);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }

                //puedo revisar arriba a la izq
                if (top == true && left == true) {
                    // container += matriz[i - 1][j - 1];
                    pixel_info = getPixel(imageData, j - 1, i - 1);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }

                //puedo revisar arriba a la der
                if (top == true && right == true) {
                    // container += matriz[i - 1][j + 1];
                    pixel_info = getPixel(imageData, j - 1, i + 1);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }

                //puedo revisar abajo a la izq
                if (bottom == true && left == true) {
                    // container += matriz[i + 1][j - 1];
                    pixel_info = getPixel(imageData, j + 1, i - 1);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }

                //puedo revisar abajo a la der
                if (bottom == true && right == true) {
                    // container += matriz[i + 1][j + 1];
                    pixel_info = getPixel(imageData, j + 1, i + 1);
                    container_r += pixel_info["r"];
                    container_g += pixel_info["g"];
                    container_b += pixel_info["b"];
                    contador++;
                }

                let resultado_r = container_r / contador;
                let resultado_g = container_g / contador;
                let resultado_b = container_b / contador;

                setPixel(copiedImageData, j, i, resultado_r, resultado_g, resultado_b, 255);
            }
        }
        ctx.putImageData(copiedImageData, 0, 0);
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
