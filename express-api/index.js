const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const { sort, field, value } =  req.query;

    // Consulta SQL que filtra por el field y value, y ordena
    // basado en sort


  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})