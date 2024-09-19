const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const app = express();
const cors = require('cors')
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

const PORT = 8000;
const SECRET = 'MySuperSecretKey';

// Try...catch
// Promesas
// Async/await
// Hasheo de contraseñas
// JWT
// Middlewares

// Connect to database
const knex = require('knex')({
  client: 'pg',
  connection: {
    // connectionString: process.env.DATABASE_URL,
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'form_register',
    ssl: false,
  },
});

app.use(express.json());
app.use(cors());

app.post('/login', [
  [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await knex('users').where('email', req.body.email).first();
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario o contraseña incorrectos'
      });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        msg: 'Usuario o contraseña incorrectos'
      });
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      msg: 'Inicio de sesión exitoso',
      token
    });
  } catch (e) {
    console.error('Something went wrong trying to login')
    console.error(e)

    return res.status(500).json({
      msg: 'Ha ocurrido un error inesperado'
    })
  }

})

/*
 * name, last_name, email, password, country, genre, accept_terms
 *
 */
app.post('/register', [
  [
    body('name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('country').notEmpty().isIn(['Guatemala', 'USA']),
    body('genre').notEmpty().isIn(['Masculino', 'Femenino', 'L*']),
    body('accept_terms').notEmpty().isBoolean()
  ]
], async (req, res) => {
  // Validar la información recibida
  // Si es invalida responder 400
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // Guardarla en una base de datos
  try {
    console.log('Storing new form info in the database');
    // Error personalizados
    if (req.body.password.length < 8) {
      throw new Error('Contraseña debe ser mayor a 8 caracteres')
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await knex('users').insert({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      country: req.body.country,
      genre: req.body.genre,
      accept_terms: req.body.accept_terms
    });
    console.log('Info stored successfully');

    return res.status(201).json({
      msg: 'Info stored successfully'
    })
  } catch (e) {
    console.error('Something went wrong trying to store the info')
    console.error(e)

    if (e.message.includes('duplicate key value')) {
      return res.status(409).json({
        msg: 'El email ya está registrado'
      })
    }

    return res.status(500).json({
      msg: 'Ha ocurrido un error inesperado'
    })
  }
});


app.get('/profile', expressjwt({ secret: SECRET, algorithms: ['HS256'] }), async (req, res) => {
  try {
    const user = await knex('users').where('id', req.auth.id).first();
    delete user.password;
    return res.status(200).json({
      msg: 'Profile',
      user
    })
  } catch (e) {
    console.error('Something went wrong trying to get the profile')
    console.error(e)

    return res.status(500).json({
      msg: 'Ha ocurrido un error inesperado'
    })
  }
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      msg: 'Usuario no autorizado'
    })
  }
})

const createTables = async () => {
  console.log('Verifying tables at the database');
  knex.schema.hasTable('users').then(async function (exists) {
    if (!exists) {
      console.log('Creating tables at the database')
      return await knex.schema
        .createTable('users', (table) => {
          // name, last_name, email, password, country, genre, accept_terms
          table.increments('id');
          table.string('name');
          table.string('last_name');
          table.string('email').unique();
          table.string('password');
          table.string('country');
          table.string('genre');
          table.boolean('accept_terms');
        })
    }
  })

  console.log('Tables were created/verified successfully');
}

app.listen(PORT, async () => {
  await createTables();
  console.log(`Form Register API listening on port ${PORT}`)
})