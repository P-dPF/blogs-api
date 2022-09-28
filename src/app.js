const express = require('express');
require('express-async-errors');

const { errorHandler } = require('./middlewares');
const { LoginRouter, UserRouter, CategoryRouter, PostRouter } = require('./routers');

// ...

const app = express();

app.use(express.json());

app.use('/login', LoginRouter);
app.use('/user', UserRouter);
app.use('/categories', CategoryRouter);
app.use('/post', PostRouter);

app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
