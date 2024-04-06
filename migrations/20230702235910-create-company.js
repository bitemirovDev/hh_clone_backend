'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{
    await queryInterface.createTable('Companies', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) =>{
    await queryInterface.dropTable('Companies')
  },
};
