import express, { urlencoded } from "express";
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
//import rooutes

import user from './api/routes/user.route';
import product from './api/routes/product.route';
import cart from './api/routes/cart.route';
import sale from './api/routes/sale.route';

const app = express();


app.use(express.static(path.join(__dirname, './public')));


//middlewares
app.use(morgan('dev'))


app.use(express.json({limit: '50mb'}));

app.use(cors());


//routes
app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/cart', cart);
app.use('/api/sale', sale);
app.use(function (req, res, next) {
  res.status(404).send("Lo sentimos no podemos encontrar lo que buscas!");
});


export default app;