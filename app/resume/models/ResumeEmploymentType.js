const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')

const EmploymentType = require('../../employment-type/EmploymentType')
const Resume = require('../models/Resume')

const ResumeEmploymentType = sequelize.define('ResumeEmploymentType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
},
{
    timestamps: false,
});

Resume.belongsToMany(EmploymentType, { through: ResumeEmploymentType, foreignKey: "resume_id", otherKey: "employmentType_id", as: "employmentTypes"})
EmploymentType.belongsToMany(Resume, { through: ResumeEmploymentType, foreignKey: "employmentType_id", otherKey: "resume_id"})

module.exports = ResumeEmploymentType
