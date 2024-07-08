# Library API

This is a RESTful API for library management, developed with TypeScript and NestJS.

## Installation

To install the project dependencies, run:

```bash
$ npm install
```

## Running the Application

You can run the application in different modes:

### Development

```bash
$ npm run start
```

### Watch Mode

```bash
$ npm run start:dev
```

### Production

```bash
$ npm run start:prod
```

## Testing

You can run unit tests, end-to-end (e2e) tests, and check code coverage with the following commands:

### Unit Testing

To run unit tests:

```bash
$ npm run test
```

You can also use the command:

```bash
$ npm test -- --config=jest.config.js
```

### End-to-End (e2e) Testing

To run e2e tests:

```bash
$ npm run test:e2e
```

### Code Coverage

To check code coverage:

```bash
$ npm run test:cov
```

You can also use the command:

```bash
$ npm test -- --config=jest.config.js --coverage
```

## Code Validations

To ensure that your code complies with clean code rules using ESLint and Prettier, run:

```bash
$ npm run lint
```

To automatically fix problems detected by ESLint, run:

```bash
$ npm run lint:fix
```

## Login to local host

To log in to the local host, you can enter using the following link:
[local holst](http://localhost:3000/api)
Here you will see the following page:
![swagger](https://raw.githubusercontent.com/Natyushk/CRUD/main/assets/local%20host.png)

## Endpoints
It will be used as follows:

| | Method/http | Type | Validations
| ------ | ------ | ------ | ------ |
| Create a book | POST /books | String | El título no puede estar vacío, El autor no puede estar vacío, Formato invalido de fecha, utilice: 'dd/mm/aaaa'
| Get all books | GET /books | String |
| Update a book by ID | PUT /books/:id | String| El libro no existe
|Delete a book by ID | DELETE /books/:id | String | Eliminado correctamente / El libro no existe

## API URL demo
To Access use the following url https://library-api-red.vercel.app