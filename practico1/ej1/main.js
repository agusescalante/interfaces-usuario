let matriz = Array();
let size_matriz = 10;

for(let i=0; i < size_matriz; i++){
    matriz[i] = [];
    for(let j=0; j < size_matriz; j++){
        matriz[i][j]= Math.floor(Math.random()*100);
    }
}
console.table(matriz);

function maxMatriz(matriz){
    let max='';
    let size = matriz.length;
    for(let i=0; i < size; i++){
        for(let j=0; j < size; j++){
        if(matriz[i][j] > max ){
            max = matriz[i][j];
        }
        }
    }
    return max;
}
console.log(maxMatriz(matriz)); 

function filasMaxMin(matriz){
    let max='';
    let result = Array();
    result['minImpar'] = Infinity;
    let size = matriz.length;

    for(let i=0; i < size; i++){
        if(i%2 == 0){
            for(let j=0; j < size; j++){
            if(matriz[i][j] > max ){
                max = matriz[i][j];
                result['MaxPar']=max;
                result['IndicePar']=i;
                }
            }
        }else{
            for(let j=0; j < size; j++){
            if(matriz[i][j] < result['minImpar']){
                result['minImpar']=matriz[i][j];
                result['IndiceImpar']=i;
            }    
        }
    }
    }
    return result;
}
console.log(filasMaxMin(matriz));

function avgForRow(matriz){
    let AVG;
    let sizeMatriz = matriz.length;
    let arregloAVG=Array(sizeMatriz).fill(0)    ;
    for(let i=0;i < sizeMatriz; i++){
        for(let j=0; j < sizeMatriz;j++){
            arregloAVG[i] += matriz[i][j]/sizeMatriz;
        }
    }
    return arregloAVG;
}


console.log(avgForRow(matriz));
