import { spawn } from "child_process";

export const getPrinters = async ()=>{
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
  
      return printers;
  
    } catch (error) {
      console.log('error: ', error);
      return [];
    }
  }