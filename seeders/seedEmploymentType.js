module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Заполните данными о странах в СНГ
      const EmploymentTypesData = [
        { name: 'Полная занятость' },
        { name: 'Частичная занятость' },
        { name: 'Проектная работа' },
        { name: 'Волонтерство' },
        { name: 'Стажировка' }
      ];
  
      // Вставка данных в таблицу "EmploymentTypes"
      await queryInterface.bulkInsert('EmploymentTypes', EmploymentTypesData, {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Удаление вставленных данных о странах
      await queryInterface.bulkDelete('EmploymentTypes', null, {});
    },
  };
  