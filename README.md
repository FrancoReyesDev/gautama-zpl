## Generador de etiquetas ZPL

Actualmente funciona en linux con Cups pero en la proxima version usaremos POSIX para que sea compatible en mas plataformas.

Gautama ZPL es un generador hecho con NextJS y utiliza cups para enviar comandos ZPL directamente a la impresora.
Genera etiquetas de tamaño fijo (proximamente sera para cualquier tamaño) con un codigo de barras y un titulo , ademas permite imprimir etiquetas ZPL de mercadolibre para Full, Flex y Colecta.

### Start
```
git clone ... ;
cd ... ;
npm install;
npm run build;
npm run start;
```
