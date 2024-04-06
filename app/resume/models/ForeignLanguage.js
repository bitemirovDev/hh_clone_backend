const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')

const Resume = require('../../resume/models/Resume')

const ForeignLanguage = sequelize.define('ForeignLanguage', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  timestamps: false,
});

ForeignLanguage.belongsTo(Resume, {foreignKey: 'resume_id'})
Resume.hasMany(ForeignLanguage, {foreignKey: 'resume_id', as: "foreignLanguages"})

module.exports = ForeignLanguage