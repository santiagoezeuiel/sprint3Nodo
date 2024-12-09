import express from 'express';
import path from 'path';
import { connectDB } from './config/dbConfig.mjs';
import superheroesRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import expressEjsLayouts from 'express-ejs-layouts';
import expressLayouts from 'express-ejs-layouts';



const app = express();

app.use(expressLayouts);
app.use(expressEjsLayouts);
app.set('layout', 'layout');

app.use(express.static(path.resolve('./public')));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); // Permite usar ?_method=PUT en formularios

const PORT = 3000;
connectDB();

app.use('/api', superheroesRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    title : 'pagina principal',
    navbarLinks : [
      { text : 'inicio', href:'/', icon:'/icon/home.svg'},
      { text: 'Acerca de', href: '/about', icon: '/icons/info.svg'},
      {text: 'Contacto', href: '/contact', icon: '/icon/contact.svg'}
    ]
  })
})

// Ruta para la página Acerca de 

 app.get('/about', (req, res) => {
  res.render('about', {title:'Acerca de Nosotros'});
 });

 //Ruta para la página de Contacto

 app.get('/contact', (req, res) => {
  res.render ('contact', {title:'Contáctanos'});
 });




app.use((req, res) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(`Servidor Carriendo en http://localhost:${PORT}`);
  console.log(`Ctrl+C para bajar servidor`);
});


// instalar 