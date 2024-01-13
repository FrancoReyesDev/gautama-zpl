import { LL, MD, PR, PW, THERMAL_METHOD } from "@/constants";

const createZplFromEtiquetas = (etiquetas:{id:number;codigo:string;titulo:string;cantidad:number}[])=>{
    const format = `^XA\n${MD}\n${PR}\n${THERMAL_METHOD}\n^LH0,0\n${PW}\n${LL.product}`;
    
    const formatLabelList = etiquetas.reduce((acc:Array<{codigo:string;titulo:string}>[],{cantidad,titulo,codigo})=>{
        if(cantidad && codigo){
            if(!titulo)
            titulo = codigo; 
            acc.push(...Array(cantidad).fill([codigo,titulo]))
        }
        return acc;
    },[])  
    let n = 0;
    let zplCode = "";
    for(const [codigo,titulo] of formatLabelList){
        if(!n){
            zplCode+=format+
            `^FO10,20
            ^BY2
            ^BCN,30,Y,N,N
            ^FD${codigo}
            ^FS\n`+
            `^FO10,80
            ^FB380,2,2,C
            ^A0N,70,60
            ^FD${titulo}
            ^FS\n`;
            n++;
        }else{
            zplCode+=
            `^FO440,20
            ^BY2
            ^BCN,30,Y,N,N
            ^FD${codigo}
            ^FS\n`+
            `^FO440,80
            ^FB380,2,2,C^A0N,70,60^FD${titulo}^FS\n`
            
            +"^XZ\n"
            n--;
        }
    }
    if(n){
        zplCode +="^XZ"
    }

    return zplCode;
}

export {createZplFromEtiquetas};

