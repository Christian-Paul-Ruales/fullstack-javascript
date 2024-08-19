<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# DESARROLLO
### unicamente en este caso he desidido desactivar prettier
```bash
yarn remove prettier
```

```bash
yarn remove eslint-config-prettier eslint-plugin-prettier
```

## Anotaciones del profe
# Ejecutar en desarrollo
1. clonar el repositorio
2. ejecutar
```
yarn install
```
3. tener nest cli instalado
```
npm -i g @nestjs/cli
```
4. Levantar la base de datos


```bash
docker compose -f docker-compose-dev.yaml up -d
```

## stack usado
* MongoDB
* NestJS

## -------
# Volviendo a mis anotaciones


# Ejecutar el app en produccion
DESPLEGAR EN LA NUVE...
1. CAMBIAR EL COMANDO DE START, POR EL DE START:PROD EN EL PACKAGE.JSON
2. configurar variables de entorno
3. redeployar
# start:prod

# DOCKERFILE
Extension
```
Better DockerFile Syntax
```
```
Docker
```

```
https://gist.github.com/Klerith/e7861738c93712840ab3a38674843490
```

## ejemplo Dockerfile y docker compose
Para correrlo es necesario ejecutar los siguientes comandos

1. Creamos el archivo de produccion .env.prod
2. Llenamos las variables de entorno
3. Creamos la imagen como se muestra a continuacion
__la primera ejecucion__
```bash
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

__para las siguientes__
```bash
docker compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

__Con docker in terminal podemos acceder al contenedor__
