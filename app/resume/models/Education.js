const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')

const Resume = require('../../resume/models/Resume')

const Education = sequelize.define('Education', {
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  major: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
  timestamps: false,
});

Education.belongsTo(Resume, {foreignKey: 'resume_id'})
Resume.hasMany(Education, {foreignKey: 'resume_id', as: "education"})

module.exports = Education