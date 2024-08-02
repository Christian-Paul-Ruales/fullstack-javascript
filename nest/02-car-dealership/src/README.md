# src codigo
## Modulos
Agrupan y desacoplan un conjunto de funcionalidad especifica por dominio

ejemplo: modulo de autenticacion, maneje lo relacionado a autenticacion

**generar modulo**
```bash
nest g mo nombre
```

## Controladores
Controlan rutas, son encargados de escuchar la solicitud y emitir una respuesta

**generar controlador**
```bash
nest g co nombre
```

### Desactivar prettier
```bash
yarn remove prettier
```

Ver>paleta de comandos> Developer: reload windows

### decorador get
```bash
@Get(':id')
getCarById(@Param('id') id: string) {
```

* @Get para realizar peticion get
* @Param para recoger el parametro de la url

## Servicios
Alojan la logica del negocio

Todos los servicios son providers

**generar servicios**
```bash
nest g s nombre
```
* se puede agregar la bandera --no-spec para no generar los archivos de pruebas

## Pipes
Transforma la data recibida en requests, para asegurar un tipo, valor o instancia de un objeto

metodos de parametros reciben pipes
```bash
@Get(':id')
getCarById(@Param('id', ParseIntPipe) id: number ...
```
**documentacion de statuscode en peticiones http:**
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Exception Filters
Maneja los errores de codigo en mensajes de respuesta http

throw new etc etc

