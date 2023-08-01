// import { formatZpl } from "./formatZpl";
interface formatRowProps{
    zplRow:string;
    reemplazos:string[][] | any[];
}

const formatRow = ({zplRow,reemplazos}:formatRowProps) => {
    let formatedRow = zplRow;

    reemplazos.forEach(([busqueda, reemplazo]) => {
        const regex = new RegExp(busqueda, 'g');
        formatedRow = formatedRow.replace(regex, reemplazo);
    });

    return formatedRow;
}

interface FormatZplProps{
    zpl:string;
    reemplazos:{
        columnaA:string[][];
        columnaB:string[][];
    };
    format:string;
}

const formatZpl = ({zpl,reemplazos,format}:FormatZplProps)=>{
    const formatedZpl = zpl.split('^XA').map((row,index,array)=>{
        const lastIndex = array.length-1;
        const reemplazosForColumn = (index%2)?reemplazos.columnaA:reemplazos.columnaB;
        const formatForColumn = index%2?format:"";
        const endfix = index==lastIndex&&index%2?'^XZ':'';
        return index?formatForColumn+formatRow({zplRow:row,reemplazos:reemplazosForColumn})+endfix:"";         
    })

    return formatedZpl.join("");
}


const createZplFull = (zpl:string)=>{
    // Full viene para etiquetas de una sola columna. Usaremos formatZpl para formatear cada columna y luego las uniremos
    const thermalMethod = '';
    // const formatFullColumnA = "^XA\n^MD10\n^PR4\n"+thermalMethod+"\n^LH0,0\n^PW799\n^LL240\n";

    // const desplazamiento = 76;

    // const reemplazosColumnA = [
    //     ['FO346', `FO${346 + desplazamiento}`],
    //     ['FO345', `FO${345 + desplazamiento}`],
    //     ['FO360', `FO${360 + desplazamiento}`],
    //     ['FT439', `FT${439 + desplazamiento}`],
    //     ['FT438', `FT${438 + desplazamiento}`]
    // ];

    const formatFullColumnA = "^XA\n^MD10\n"+thermalMethod+"\n^PW799\n^LL240\n";

    const ambasColumnas = [
        ['BY0,0,0','BY2'],
        ['BQN,4,4','BQN,2,3'],

    ]
    
    const columnaA = [
        ['FO150,20', `FO140,20`],
        ['FO40,200','FO10,140'],
        ['FO50,250','FO20,180'],
        [`\\^XZ`,''],
        ...ambasColumnas
    ];

    const desplazamiento = 400;
    const columnaB = [
        ['FO150,20', `FO${140+desplazamiento},20`],
        ['FO40,200',`FO${10+desplazamiento},140`],
        ['FO50,250',`FO${20+desplazamiento},180`],
        ['^MCY',''],
        ['^CI28',''],
        ['^LH5,10',''],
        ...ambasColumnas
    ];

    const reemplazos = {columnaA,columnaB}
    
    
    
    return formatZpl({zpl:zpl,reemplazos:reemplazos,format:formatFullColumnA});
}

export {createZplFull};