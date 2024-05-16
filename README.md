## Generador de etiquetas ZPL para MercadoLibre
Este proyecto esta pensado para imprimir las etiquetas de Full, Flex y colecta de Mercado Libre, ademas de labels.
Puedes usarlo para imprimir cualquier ZPL y formatear los codigos para que sean compatibles con un size de etiqueta especifico (En desarrollo para que sea configurable a distintas medidas) reemplazando ciertos comandos por otros ([Procesamiento de ZPL's](/src/utils/.). estos reemplazos si son configurables. Ej:[reemplazos Flex](/src/utils/createZplFlex.tsx)).

Por el momento solo funciona en sistemas con Cups (Linux y Ios) pero pronto lo modificare para que funcione en todas las plataformas.
Por lo pronto queda pendiente modificar la forma en la cual se crean las etiquetas ZPL pasando de una forma manual a usar la biblioteca nodeZPL.

requerimientos:
nodeJs y Cups

Iniciar el programa:
npm install; npm run build; npm run start

