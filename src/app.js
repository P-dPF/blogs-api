const express = require('express');
require('express-async-errors');

const { errorHandler, validateToken } = require('./middlewares');
const { LoginRouter, UserRouter } = require('./routers');

// ...

const app = express();

app.use(express.json());

app.use('/login', LoginRouter);
app.use('/user', UserRouter);

app.use(validateToken);

app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
