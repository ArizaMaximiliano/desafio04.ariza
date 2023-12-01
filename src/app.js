import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import productRouter from './routes/ProductRouter.js';
import cartRouter from './routes/CartRouter.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use((error, req, res, next) => {
  const message = `Ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;