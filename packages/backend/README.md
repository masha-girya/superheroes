# Backend

## Technologies
Typescript
Nest.js
TypeORM
PostgreSQL
Nest.js Test Library

## Run the project
1. clone repository and open it in a program
5. run `npm install`
3. run `npm run start:dev`
4. enjoy!

## Run tests
1. in the root folder run `npm run test src/modules/superheroes/superhero.spec.ts`

## Usage
### base link
method: GET
link: http://localhost:3333/superheroes

### get all superheroes
method: GET
link: http://localhost:3333/superheroes

### get all with pagination
method: GET
link: http://localhost:3333/superheroes/pagination?page=1

### get one superhero
method: GET
link: http://localhost:3333/superheroes/NICKNAME
where NICKNAME is param and is superhero.nickname

### add superhero
method: POST
link: http://localhost:3333/superheroes
body: requires all Superhero Model fields
contains {SuperheroDto, Files}: object, where Files field is for images and SuperheroDto is Superhero Model

### update superhero
method: PATCH
link: http://localhost:3333/superheroes/NICKNAME
where NICKNAME is param and is superhero.nickname
body: contains {SuperheroDto, Files}: object, where Files field is for images and SuperheroDto is Superhero Model, all fields are optional

### delete superhero
method: DELETE
link: http://localhost:3333/superheroes/NICKNAME
where NICKNAME is param and is superhero.nickname
