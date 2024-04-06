const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')

const Resume = require('../../resume/models/Resume')

const WorkingHistory = sequelize.define('WorkingHistory', {
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsibilities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
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

WorkingHistory.belongsTo(Resume, {foreignKey: 'resume_id'})
Resume.hasMany(WorkingHistory, {foreignKey: 'resume_id', as: "workingHistories"})

module.exports = WorkingHistory