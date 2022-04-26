const express = require('express')
const cors = require('cors')
const db = require('./database')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/api/family/fetch', (req, res) => {
  const query = 'SELECT * FROM members ORDER BY id ASC'

  db.query(query, function(err, results) {
    if (err) {
      res.status(400).send({S: 1, M: err.sqlMessage})
    } else {
      res.status(200).send({S: 1, D: results})
    }
  })
})

app.post('/api/family/add', (req, res) => {
  const {
    firstname, 
    middlename,
    lastname,
    age,
    gender,
    email,
    contact_number
  } = req.body

  if (firstname && middlename && lastname && age && gender && email && contact_number) {
    const query = `INSERT INTO members (first_name, middle_name, last_name, age, gender, email, contact_number) VALUES ('${firstname}', '${middlename}', '${lastname}', '${age}', '${gender}', '${email}', '${contact_number}')`

    db.query(query, function(err, results) {
      if (err) {
        res.status(400).send({S: 0, M: err.sqlMessage})
      } else {
        res.status(200).send({S: 1, M: 'Family member successfully added.'})
      }
    })
  } else {
    res.status(400).send({S: 0, M: 'Incorrect body parameters'})
  }
})

app.post('/api/family/update', (req, res) => {
  const {
    id,
    firstname, 
    middlename,
    lastname,
    age,
    gender,
    email,
    contact_number
  } = req.body

  if (id && firstname && middlename && lastname && age && gender && email && contact_number) {
    const query = `UPDATE members SET first_name='${firstname}', middle_name='${middlename}', last_name='${lastname}', age='${age}', gender='${gender}', email='${email}', contact_number='${contact_number}' WHERE id='${id}'`

    db.query(query, function(err, results) {
      if (err) {
        res.status(400).send({S: 0, M: err.sqlMessage})
      } else {
        res.status(200).send({S: 1, M: 'Family member successfully updated.'})
      }
    })
  } else {
    res.status(400).send({S: 0, M: 'Incorrect body parameters'})
  }
})

app.post('/api/family/delete', (req, res) => {
  const {
    id,
  } = req.body

  if (id) {
    const query = `DELETE FROM members WHERE id='${id}'`

    db.query(query, function(err, results) {
      if (err) {
        res.status(400).send({S: 0, M: err.sqlMessage})
      } else {
        res.status(200).send({S: 1, M: 'Family member was deleted.'})
      }
    })
  } else {
    res.status(400).send({S: 0, M: 'Incorrect body parameters'})
  }
})

var server = {
  port: 5000
}

app.listen(server.port, () => {
  console.log(`App listening on port ${server.port}...`)

  db.connect((err) => {
    if (err) throw err
    console.log('DATABASE CONNECTED!')
  })
})