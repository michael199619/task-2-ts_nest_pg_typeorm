# [Article](https://vk.com/@-202627164-the-technical-task-3)

## [Schema of database](https://miro.com/app/board/o9J_lL9MLhc=/)

## build
```bash
$ git https://github.com/michael199619/task-2-ts_nest_pg_typeorm.git
$ cd task-2-ts_nest_pg_typeorm
$ cp .env.example .env # Update database 
$ yarn install
```

## start

```bash
$ yarn build
$ yarn start 
```
Server started at http://localhost:3000/

## start docker

```bash
$ cp .env.example .env
$ docker-compose up 
```
Server started at http://localhost:3000/
Apidoc started at http://localhost:5000/

## apidoc

```bash
$ npm run apidoc
$ npm run apidoc:serve
```
Apidoc started at http://localhost:5000/

## seeds
```bash
$ yarn start
```

## tests
```bash
$ yarn test
```

## debug

```bash
$ npm run debug
```

After connect to 9229
