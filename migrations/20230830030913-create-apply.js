'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resume_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Resumes', // Имя связанной таблицы
          key: 'id' // Поле, на которое ссылается внешний ключ
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      vacancy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vacancies', // Имя связанной таблицы
          key: 'id' // Поле, на которое ссылается внешний ключ
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applies');
  }
};
