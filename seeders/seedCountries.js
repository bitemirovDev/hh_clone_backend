module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Заполните данными о странах в СНГ
      const countriesData = [
        { name: 'Азербайджан' },
        { name: 'Армения' },
        { name: 'Беларусь' },
        { name: 'Грузия' },
        { name: 'Казахстан' },
        { name: 'Кыргызстан' },
        { name: 'Молдавия' },
        { name: 'Россия' },
        { name: 'Таджикистан' },
        { name: 'Туркменистан' },
        { name: 'Узбекистан' },
        { name: 'Украина' },
      ];
  
      // Вставка данных в таблицу "Countries"
      await queryInterface.bulkInsert('Countries', countriesData, {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Удаление вставленных данных о странах
      await queryInterface.bulkDelete('Countries', null, {});
    },
  };
  