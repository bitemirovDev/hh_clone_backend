'use strict';

const { Sequelize } = require("sequelize");
const Country = require('../app/region/Country')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = await Country.findAll()

    const countryMap = {};
    for (const country of countries) {
      countryMap[country.name] = country.id;
    }

    await queryInterface.bulkInsert('Cities', [
    // города России
        { name: 'Москва', countryId: countryMap['Россия'] },
        { name: 'Санкт-Петербург', countryId: countryMap['Россия'] },
        { name: 'Екатеринбург', countryId: countryMap['Россия'] },
        { name: 'Нижний Новгород', countryId: countryMap['Россия'] },
        { name: 'Казань', countryId: countryMap['Россия'] },
        { name: 'Сочи', countryId: countryMap['Россия'] },
    // города Украины
        { name: 'Киев', countryId: countryMap['Украина'] },
        { name: 'Харьков', countryId: countryMap['Украина'] },
        { name: 'Одесса', countryId: countryMap['Украина'] },
        { name: 'Львов', countryId: countryMap['Украина'] },
        { name: 'Днепр', countryId: countryMap['Украина'] },
        { name: 'Запорожье', countryId: countryMap['Украина'] },
    // города Беларуси
        { name: 'Минск', countryId: countryMap['Беларусь'] },
        { name: 'Гомель', countryId: countryMap['Беларусь'] },
        { name: 'Могилев', countryId: countryMap['Беларусь'] },
        { name: 'Брест', countryId: countryMap['Беларусь'] },
        { name: 'Гродно', countryId: countryMap['Беларусь'] },
        { name: 'Витебск', countryId: countryMap['Беларусь'] },
    // города Казахстана
        { name: 'Алматы', countryId: countryMap['Казахстан'] },
        { name: 'Нур-Султан', countryId: countryMap['Казахстан'] },
        { name: 'Шымкент', countryId: countryMap['Казахстан'] },
        { name: 'Актау', countryId: countryMap['Казахстан'] },
        { name: 'Караганда', countryId: countryMap['Казахстан'] },
        { name: 'Усть-Каменогорск', countryId: countryMap['Казахстан'] },
    // города Армении
        { name: 'Ереван', countryId: countryMap['Армения'] },
        { name: 'Гюмри', countryId: countryMap['Армения'] },
        { name: 'Ванадзор', countryId: countryMap['Армения'] },
        { name: 'Ечмиадзин', countryId: countryMap['Армения'] },
        { name: 'Дилижан', countryId: countryMap['Армения'] },
        { name: 'Севан', countryId: countryMap['Армения'] },
    //   города Азербайджана
        { name: 'Баку', countryId: countryMap['Азербайджан'] },
        { name: 'Гянджа', countryId: countryMap['Азербайджан'] },
        { name: 'Ленкорань', countryId: countryMap['Азербайджан'] },
        { name: 'Нахичевань', countryId: countryMap['Азербайджан'] },
        { name: 'Шеки', countryId: countryMap['Азербайджан'] },
        { name: 'Габала', countryId: countryMap['Азербайджан'] },
    // города Грузии
        { name: 'Тбилиси', countryId: countryMap['Грузия'] },
        { name: 'Кутаиси', countryId: countryMap['Грузия'] },
        { name: 'Батуми', countryId: countryMap['Грузия'] },
        { name: 'Рустави', countryId: countryMap['Грузия'] },
        { name: 'Гори', countryId: countryMap['Грузия'] },
        { name: 'Сухуми', countryId: countryMap['Грузия'] },
    // города Молдовы
        { name: 'Кишинев', countryId: countryMap['Молдавия'] },
        { name: 'Тирасполь', countryId: countryMap['Молдавия'] },
        { name: 'Бельцы', countryId: countryMap['Молдавия'] },
        { name: 'Бендеры', countryId: countryMap['Молдавия'] },
        { name: 'Кагул', countryId: countryMap['Молдавия'] },
    // города Таджикистана
        { name: 'Душанбе', countryId: countryMap['Таджикистан'] },
        { name: 'Худжанд', countryId: countryMap['Таджикистан'] },
        { name: 'Куляб', countryId: countryMap['Таджикистан'] },
        { name: 'Истаравшан', countryId: countryMap['Таджикистан'] },
        { name: 'Пенджикент', countryId: countryMap['Таджикистан'] },
    // города Туркменистана
        { name: 'Ашхабад', countryId: countryMap['Туркменистан'] },
        { name: 'Туркменабад', countryId: countryMap['Туркменистан'] },
        { name: 'Дашогуз', countryId: countryMap['Туркменистан'] },
        { name: 'Мары', countryId: countryMap['Туркменистан'] },
    // города Узбекистана
        { name: 'Ташкент', countryId: countryMap['Узбекистан'] },
        { name: 'Самарканд', countryId: countryMap['Узбекистан'] },
        { name: 'Бухара', countryId: countryMap['Узбекистан'] },
        { name: 'Нукус', countryId: countryMap['Узбекистан'] },
        { name: 'Андижан', countryId: countryMap['Узбекистан'] },
    // города Кыргызстана
        { name: 'Бишкек', countryId: countryMap['Кыргызстан'] },
        { name: 'Ош', countryId: countryMap['Кыргызстан'] },
        { name: 'Джалал-Абад', countryId: countryMap['Кыргызстан'] },
        { name: 'Каракол', countryId: countryMap['Кыргызстан'] },
        { name: 'Талас', countryId: countryMap['Кыргызстан'] },
        { name: 'Баткен', countryId: countryMap['Кыргызстан'] },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};