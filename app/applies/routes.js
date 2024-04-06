const express = require('express')
const router = express.Router()
const {createApply, getEmployeeApplies, deleteApply, acceptEmployee, declineEmployee, getAppliesByVacancy} = require('./controllers')
const {isEmployee, isManager} = require('../auth/middlewear')
const {validateApply, isAuthorOfApply, isApplyExists} = require('./middlewear')
const {isAuthorOfVacancy} = require('../vacancy/middlewear')
const passport = require('passport')

router.post('/api/apply', passport.authenticate('jwt', {session: false}) , isEmployee, validateApply, createApply)
router.get('/api/apply/employee', passport.authenticate('jwt', {session: false}) , isEmployee, getEmployeeApplies)
router.delete('/api/apply/:id', passport.authenticate('jwt', {session: false}) , isEmployee, isAuthorOfApply, deleteApply)
router.put('/api/apply/accept/employee', passport.authenticate('jwt', {session: false}) , isManager, isApplyExists, isAuthorOfVacancy, acceptEmployee)
router.put('/api/apply/decline/employee', passport.authenticate('jwt', {session: false}) , isManager, isApplyExists, isAuthorOfVacancy, declineEmployee)
router.get('/api/apply/vacancy/:id', passport.authenticate('jwt', {session: false}) , isManager, isAuthorOfVacancy, getAppliesByVacancy)

module.exports = router