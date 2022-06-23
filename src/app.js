/* import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { engine } from 'express-handlebars';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import mth from 'method-override';
//Rutas
import signroutes from './routes/login-routes.js';
import mainroutes from './routes/link-routes.js';
import perfilroutes from './routes/perfil-routes'; */

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(mth('_method'));

//Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'pass',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(cookieParser());

//Variables globales
app.use((req, res, next) => {
  res.locals.mensaje = req.flash('mensaje');
  next();
});

//Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

//Rutas
app.use(signroutes);
app.use(mainroutes);
app.use(perfilroutes);

export default app;
