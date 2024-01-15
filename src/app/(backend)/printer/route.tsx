import {spawn} from 'child_process';
// import { NextResponse } from 'next/server';
// get printers


const printZpl = async ({printer,zpl}:{printer:string,zpl:string})=>{
  try {
    const zplEncoded = Buffer.from(zpl,'utf-8');
    const subprocess = spawn('lpr',['-P',printer,'-o','raw']);

    await new Promise<void>((resolve, reject) => {
        
        subprocess.stdin.write(zplEncoded);
        subprocess.stdin.end();

        subprocess.on('close', (msg) => {
            console.log({msg})
            resolve();
        });
        
        subprocess.on('error', (error) => {
            console.log({error})
            reject(error);

        });
    });
    
    return true;

  } catch (error) {
      console.log('error: ', error);
      return false;
  }
}

// const GET = async()=>{
//   const printers = getPrinters();

//   if('error' in printers)
//   return NextResponse.json({printers:[]});

//   return NextResponse.json({ printers });
// }
  
const POST = async (request:Request)=>{
  const {printer,zpl} = await request.json();
  const print = await printZpl({printer,zpl});

  return new Response(JSON.stringify({zpl:zpl,printer:printer}), {status: print?200:500});
}
  
export {POST}