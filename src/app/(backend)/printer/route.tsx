import {spawn} from 'child_process';
import { NextResponse } from 'next/server';
// get printers
const GET = async()=>{
    try {
      const subprocess = spawn('lpstat', ['-e']);
      const printers: string[] = [];
  
      await new Promise<void>((resolve, reject) => {
        subprocess.stdout.on('data', (data) => {
          const printersData = data.toString().split('\n').slice(0, -1);
          printers.push(...printersData);
        });
  
        subprocess.on('close', () => {
          resolve();
        });
  
        subprocess.on('error', (error) => {
          reject(error);
        });
      });
  
      return NextResponse.json({ printers });
    } catch (error) {
      console.log('error: ', error);
      return NextResponse.json({ error: 'An error occurred' });
    }
  }
  
 

  const POST = async(request:Request)=>{
    try {
        const {printer,zpl} = await request.json();
        const zplEncoded = Buffer.from(zpl,'utf-8');
        const subprocess = spawn('lpr',['-P',printer,'-o','raw']);
  
        await new Promise<void>((resolve, reject) => {
            
            subprocess.stdin.write(zplEncoded);
            subprocess.stdin.end();

            subprocess.on('close', () => {
                resolve();
            });
            
            subprocess.on('error', (error) => {
                reject(error);

            });
        });
        
        return new Response(JSON.stringify({zpl:zpl,printer:printer}), {
            status: 200,
           
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              },
            });
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json({ error: 'An error occurred' });
    }
  }
  
export {GET,POST}