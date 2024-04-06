
const Apply = require('./Apply')
const {NEW, INVITATION, DECLINED} = require('./utils')
const sendMail = require('../utils/sendMail')
const Vacancy = require('../vacancy/models/Vacancy')
const Resume = require('../resume/models/Resume')
const User = require('../auth/User')
const Company = require('../auth/Company')
const { Op } = require('sequelize')

const createApply = async (req, res) =>{
    try {
        const apply = await Apply.create({
            resume_id: req.body.resume_id,
            vacancy_id: req.body.vacancy_id,
            status: NEW
        })

        const resume = await Resume.findByPk(req.body.resume_id)
        const vacancy = await Vacancy.findByPk(req.body.vacancy_id)
        const user = await User.findByPk(vacancy.user_id)
    
        sendMail(user.email, 
            `Новый отклик на вакансию: ${vacancy.name}`, `
            Имя соискателя: ${resume.first_name}
            Фамилия соискателя: ${resume.last_name}
            Номер соискателя: ${resume.phone}`
        )
        res.status(200).send(apply)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getEmployeeApplies = async(req, res) =>{
    try {
        const resumes = await Resume.findAll({
            where: {
                user_id: req.user.id
            }
        })
    
        const ids = resumes.map(item => item.id)
    
        const applies = await Apply.findAll({
            where: {
                resume_id: {
                    [Op.in]: ids
                }
            },
            include: {
                model: Vacancy,
                as: 'vacancy'
            }
        })
    
        res.status(200).send(applies)
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}


const deleteApply = async(req, res) =>{
    try {
        await Apply.destroy({
            where: {
                id: req.params.id
            }
        })
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const acceptEmployee = async(req, res) =>{
    try {
        await Apply.update(
            {
                status: INVITATION
            },
            {
                where: {
                    id: req.body.apply_id
                }
            }
        )
    
        const apply = await Apply.findByPk(req.body.apply_id)
        const resume = await Resume.findByPk(apply.resume_id)
        const vacancy = await Vacancy.findByPk(apply.vacancy_id)
        const user = await User.findByPk(resume.user_id)
        const company = await Company.findByPk(req.user.companyId)
        
        sendMail(user.email, 
            `Вы приглашены на собеседование по вакансии: ${vacancy.name}`, `
            Компания: ${company.name}
            Адрес: ${company.address}
            Менеджер: ${req.user.full_name}
            Email: ${req.user.email}
            Телефон: ${req.user.phone}`
        )
    
        res.status(200).end()
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const declineEmployee = async(req, res) =>{
    try {
        await Apply.update(
            {
                status: DECLINED
            },
            {
                where: {
                    id: req.body.apply_id
                }
            }
        )
    
        const apply = await Apply.findByPk(req.body.apply_id)
        const resume = await Resume.findByPk(apply.resume_id)
        const vacancy = await Vacancy.findByPk(apply.vacancy_id)
        const user = await User.findByPk(resume.user_id)
        const company = await Company.findByPk(req.user.companyId)
        
        sendMail(user.email, 
            `Отказ на отклик по вакансии: ${vacancy.name}`, `
            Компания: ${company.name}
            Адрес: ${company.address}`
        )
    
        res.status(200).end()
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const getAppliesByVacancy = async(req, res) =>{
    try {
        const options = {
            vacancy_id: req.params.id
        }
    
        if(req.query.status && req.query.status == NEW || req.query.status == INVITATION || req.query.status == DECLINED){
            options.status = req.query.status 
        }
    
        const applies = await Apply.findAll({
            where: options,
            include:{
                model: Resume,
                as: 'resume'
            }
        })
    
        res.status(200).send(applies)
    } catch (error) {
        res.status(500).send(error)
    }
    
}

module.exports = {
    createApply,
    getEmployeeApplies, 
    deleteApply,
    acceptEmployee,
    declineEmployee,
    getAppliesByVacancy
}