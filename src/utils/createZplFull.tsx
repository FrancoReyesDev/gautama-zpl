
// En principio mercadolibre enviaba una sola columna, ya da opciones para elegir dos columnas y distintas medidas.
// interface FormatZplInTwoColumnsProps{
//     zpl:string;
//     reemplazos:{
//         columnaA:string[][];
//         columnaB:string[][];
//     };
//     format:string;
// }

// const formatZplInTwoColumns = ({zpl,reemplazos,format}:FormatZplInTwoColumnsProps)=>{
//     const formatedZpl = zpl.split('^XA').map((row,index,array)=>{
//         const lastIndex = array.length-1;
//         const reemplazosForColumn = index%2?reemplazos.columnaA:reemplazos.columnaB;
//         const formatForColumn = index%2?format:"";
//         const endfix = index==lastIndex&&index%2?'^XZ':'';
//         return index?formatForColumn+formatZplRow({zplRow:row,reemplazos:reemplazosForColumn})+endfix:"";         
//     })
//     const clearBitmap = '^XA^MCY^XZ';
//     return clearBitmap+formatedZpl.join("");
// }


// const createZplFull = (zpl:string)=>{
//     // Full viene para etiquetas de una sola columna. Usaremos formatZplInTwoColumns para formatear cada columna y luego las uniremos
//     const thermalMethod = '';

//     const formatFullColumnA = "^XA\n^MD10\n"+thermalMethod+"\n^PW799\n^LL240\n";

//     const ambasColumnas = [
//         ['BY0,0,0','BY2'],
//         ['BQN,4,4','BQN,2,3'],

//     ]
    
//     const columnaA = [
//         ['FO150,20', `FO140,20`],
//         ['FO40,200','FO10,140'],
//         ['FO50,250','FO20,180'],
//         [`\\^XZ`,''],
//         ...ambasColumnas
//     ];

//     const desplazamiento = 400;
//     const columnaB = [
//         ['FO150,20', `FO${140+desplazamiento},20`],
//         ['FO40,200',`FO${10+desplazamiento},140`],
//         ['FO50,250',`FO${20+desplazamiento},180`],
//         ['^MCY',''],
//         ['^CI28',''],
//         ['^LH5,10',''],
//         ...ambasColumnas
//     ];

//     const reemplazos = {columnaA,columnaB}
    
    
    
//     return formatZplInTwoColumns({zpl:zpl,reemplazos:reemplazos,format:formatFullColumnA});
// }

// El nuevo format full es una copia de format flex solo que adaptando el tama;o de las etiquetas y reemplazando algunos valores.
// Estamos en los 203 dpi, 
// 1 inch = 2.54 cm => 203 dots/ 2.54cm => 79.9212598425 dots/cm, 
// 5cm = 799,2, 3cm = 240

import { formatZpl } from "./formatZpl";

const createZplFull = (zpl:string)=>{
    const thermalMethod = '';
    const formatFlex = "^XA\n^MD10\n^PR4\n"+thermalMethod+"\n^PW799\n^LL240\n";

    const reemplazos = [
        ['FB400','FB350']
    ]
    return formatZpl({zpl:zpl,reemplazos:reemplazos,format:formatFlex});
}


export {createZplFull};