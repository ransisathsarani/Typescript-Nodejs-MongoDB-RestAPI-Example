import express from "express";
import morgan from "morgan";

const app = express();

import indexRoutes from './routes/index'

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));

// routes
app.use('/api')

export default app;
