 
# INSTALACIONES NECESARIAS EN VISUALCODE
 https://gist.github.com/Klerith/384b707f9b08698655280a3d4cc4da12

# Palabras del profe
TypeScript y su sintaxis, pero nuevamente es básicamente JavaScript con tipado de variables, funciones, clases y nuevos tipos que no existen en JavaScript.

# instalar typescript, (manera global)
https://www.typescriptlang.org/download/

# convertir condigo(archivo) de typescript a javascript
tsc app.ts

# inicializamos typescript
crea el archivo tsconfig.js

tsc --init

# tsc
con tsc y el archivo tsconfig, typescript compila los multiples archivos

# watch mode, modo observador
tsc --watch
tsc -w

# sourceMap true en tsconfig.json
permite trackear los errores(lineas de error) en el archivo de typescript y no en el traspilado de javascript

# removeComments en tsconfig.json
remueve comentarios // o /***/ en el archivo traspilado de javascript

# exclude en tsconfig
al final del archivo podemos expresar que archivos o carpetas deseamos excluir del proceso del traspilado

 ,
  "exclude":[
    "objetos/*.ts"
  ]
exactamente lo mismo para incluir con la palabra include

 ,
  "include":[
    "objetos/*.ts"
  ]