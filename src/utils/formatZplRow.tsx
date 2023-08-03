interface formatZplRowProps{
    zplRow:string;
    reemplazos:string[][] | any[];
}

const formatZplRow = ({zplRow,reemplazos}:formatZplRowProps) => {
    let formatedRow = zplRow;

    reemplazos.forEach(([busqueda, reemplazo]) => {
        const regex = new RegExp(busqueda, 'g');
        formatedRow = formatedRow.replace(regex, reemplazo);
    });

    return formatedRow;
}


export {formatZplRow};