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
    reemplazos:string[][];
    format:string;
}

const formatZpl = ({zpl,reemplazos,format}:FormatZplProps)=>{
    const formatedZpl = zpl.split('^XA').map((row,index)=>{
        return index>0?format+formatRow({zplRow:row,reemplazos:reemplazos}):""            
    })

    return formatedZpl.join("");
}

export {formatZpl};