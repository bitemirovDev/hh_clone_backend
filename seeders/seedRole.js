const { QueryInterface, Sequelize } = require('sequelize')
const Role = require('../app/auth/Role')

module.exports = {
    up: async (QueryInterface, Sequelize) =>{
        await Role.bulkCreate([
            {name: 'employee'},
            {name: 'manager'}
        ]);
    },
    down: async (QueryInterface, Sequelize) =>{
        await QueryInterface.bulkDelete('Roles', null, {})
    }
}