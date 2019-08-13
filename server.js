const express = require('express')

const db = require('./data/dbConfig.js')

const server = express()

server.use(express.json())

server.get('/', async (req, res) => {
  try {
    const acc = await db.select('*').from('accounts')
    res.status(200).json(acc)
  } catch (err) {
    res.status(500).json({
      message: 'Error getting posts ☠️', error: err
    })
  }
})

server.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [acc] = await db.select('*').from('accounts').where({ id })
    if (acc) {
      res.status(200).json(acc)
    } else {
      res.status(404).json({
        message: 'Could not find account id 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error getting account ☠️', error: err
    })
  }
})

server.post('/', async (req, res) => {
  const accData = req.body
  try {
    const acc = await db('accounts').insert(accData)
    if (acc) {
      res.status(201).json(acc)
    }
  } catch (err) {
      res.status(500).json({
        message: 'Could not add your account to the data base 💩',
        error: err
      })
  }
})

server.put('/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const count = await db('accounts').where('id', '=', id).update(changes)
    if (count) {
      res.status(200).json(count)
    } else {
      res.status(400).json({
        message: 'Could not update the account 💩'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Could not update the account 💩',
      error: err
    })
  }
})

server.delete('/:id', async (req, res) => {
  const { id } = req.params
  const post = req.body
  try {
    const count = await db('accounts').where('id', '=', id).delete(post)
    if (count > 0) {
      res.status(200).json({
        message: 'The account has been destroyed ☠️'
      })
    } else {
      res.status(404).json({
        message: 'The account you are looking to delete could not be found 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Destruction of account was unsuccessful 💩'
    })
  }
})

module.exports = server