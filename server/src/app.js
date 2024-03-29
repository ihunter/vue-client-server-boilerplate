const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('./routes')(app)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
  })
