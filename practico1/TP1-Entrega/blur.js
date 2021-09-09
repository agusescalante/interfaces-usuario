function prueba() {

    let height = canvas.height;
    let width = canvas.width;

    let originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = originalImageData.data;
    let newImageData = context.createImageData(canvas.width, canvas.height);


    function pixelAt(x, y) {
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

    function setPixel(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    let x, y;


    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {

            let counter = 0;
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;

            let positions = [];

            let topLeft = pixelAt(x - 1, y - 1);
            if (topLeft != null) {
                positions.push(topLeft);

            }

            let top = pixelAt(x, y - 1);
            if (top != null) {
                positions.push(top);

            }

            let topRight = pixelAt(x + 1, y - 1);
            if (topRight != null) {
                positions.push(topRight);

            }

            let left = pixelAt(x - 1, y);
            if (left != null) {
                positions.push(left);

            }

            let main = pixelAt(x, y);
            if (main != null) {
                positions.push(main);

            }

            let right = pixelAt(x + 1, y);
            if (right != null) {
                positions.push(right);

            }

            let bottomLeft = pixelAt(x - 1, y + 1);
            if (bottomLeft != null) {
                positions.push(bottomLeft);

            }

            let bottom = pixelAt(x, y + 1);
            if (bottom != null) {
                positions.push(bottom);

            }

            let bottomRight = pixelAt(x + 1, y + 1);
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