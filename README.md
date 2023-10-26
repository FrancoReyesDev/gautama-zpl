## Generador de etiquetas ZPL para MercadoLibre
Este proyecto esta pensado para imprimir las etiquetas de Full, Flex y colecta de Mercado Libre.
Puedes usarlo para imprimir cualquier ZPL y formatear los codigos para que sean compatibles con un size de etiqueta especifico (En desarrollo para que sea configurable a distintas medidas) reemplazando ciertos comandos por otros ([Procesamiento de ZPL's](/src/utils/.). estos reemplazos si son configurables. Ej:[reemplazos Flex](/src/utils/createZplFlex.tsx)).

A grandes rasgos:
- [createZplFull](/src/utils/createZplFull.tsx): transforma el zpl de una columana en dos columnas con un ancho total de columna de 10cm y altura de 2.5cm por fila (Leyendo la documentacion de Zebra para ZPL puedes aprender a modificar facilmente las etiquetas);
- [createZplFlex](/src/utils/createZplFlex.tsx): utiliza [formatZpl](/src/utils/formatZpl.tsx) con un fitro para reemplazar algunos comandos ZPL.
- [createZplFromEtiquetas](/src/utils/createZplFromEtiquetas.tsx): A partir de un array crea varias etiquetas ZPL con codigo de barras y un titulo.

### Configuraciones previas:
Necesitaras un servidor de impresiones CUPS.
Agrega las variables de entorno para el host (la ip del servidor si vas a compartirlo en red local o localhost) en [next.config.js](/next.config.js)
```
/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        host_ip:'localhost',
        host_port:3000
    }
}

module.exports = nextConfig
```

### Crea un servicio:
/etc/systemd/system/{nombre}.service
donde:
```
[Unit]
Description=Gauatama Next.js to print ZPL
After=network.target

[Service]
ExecStart=npm run start
WorkingDirectory=/home/rpm/git/gautama-zpl // example project path
Restart=always
User=rpm // example user name
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Iniciar servidor:
```
npm install
npm run build
npm run start
```
