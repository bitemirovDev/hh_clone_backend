module.exports = {
    up: async (queryInterface, Sequelize) => {
      const ExperiencesData = [
        { duration: 'Нет опыта' },
        { duration: 'От 1 года до 3 лет' },
        { duration: 'От 3 до 6 лет' },
        { duration: 'Более 6 лет' },
      ];
  
      await queryInterface.bulkInsert('Experiences', ExperiencesData, {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Experiences', null, {});
    },
  };