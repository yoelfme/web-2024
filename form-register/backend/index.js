const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const cors = require('cors')
const port = 3000;

// Connect to database
const knex = require('knex')({
  client: 'pg',
  connection: {
    // connectionString: config.DATABASE_URL,
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'password123',
    database: 'form_register',
    ssl: false,
  },
});

app.use(express.json());
app.use(cors());

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
    await knex('users').insert({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
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

    return res.status(500).json({
      msg: 'Internal Server Error. Please contact "al inge".'
    })
  }
});

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
          table.string('email');
          table.string('password');
          table.string('country');
          table.string('genre');
          table.boolean('accept_terms');
        })
    }
  })

  console.log('Tables were created/verified successfully');
}

app.listen(port, async () => {
  await createTables();
  console.log(`Form Register API listening on port ${port}`)
})