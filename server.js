const express = require('express')
const app = express()
const logger = require('morgan')
const passport = require('passport')
const cors = require('cors')

const PORT = 8002;

app.use(logger('dev')) // считывание и вывод запроса в консоль
app.use(express.urlencoded())  // считывание данных запроса формата urlencoded
app.use(express.json()) // считывание данных запроса формата json
app.use(passport.initialize())
app.use(express.static(__dirname + '/public'))
app.use(cors())

require('./config/passport-config') 

app.use(require('./app/auth/routes'))
app.use(require('./app/region/routes'))
app.use(require('./app/skills/routes'))
app.use(require('./app/employment-type/routes'))
app.use(require('./app/languages/routes'))
app.use(require('./app/resume/routes'))
app.use(require('./app/specializations/routes'))
app.use(require('./app/vacancy/routes'))
app.use(require('./app/applies/routes'))

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})