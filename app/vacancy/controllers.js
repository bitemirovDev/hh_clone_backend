
const Experience = require('./models/Experience')
const Vacancy = require('./models/Vacancy')
const City = require('../region/City')
const EmploymentType = require('../employment-type/EmploymentType')
const Company = require('../auth/Company')
const Specialization = require('../specializations/models/Specialization')
const { Op } = require('sequelize')

const getExperiences = async(req, res) =>{
    try {
        const experiences = await Experience.findAll()

        res.status(200).send(experiences)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createVacancy = async(req, res) =>{
    try {
        const vacancy = await Vacancy.create({
            name: req.body.name,
            specialization_id: req.body.specialization_id,
            city_id: req.body.city_id,
            employmentType_id: req.body.employmentType_id,
            description: req.body.description,
            salary_from: req.body.salary_from,
            salary_to: req.body.salary_to,
            salary_type: req.body.salary_type,
            address: req.body.address,
            experience_id: req.body.experience_id,
            skills: req.body.skills,
            about_company: req.body.about_company,
            user_id: req.user.id,
            company_id: req.user.companyId
        })
        res.status(200).send(vacancy)
    } catch (error) {
        res.status(500).send(error)
    }   
}

const getMyVacancies = async(req, res) =>{
    try {
        const vacancies = await Vacancy.findAll({
            where: {
                company_id: req.user.companyId
            }
        })
    
        res.status(200).send(vacancies)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const getVacancy = async(req, res) =>{
    try {
        const vacancy = await Vacancy.findByPk(req.params.id, {
            include: [
                {
                    model: City,
                    as: 'city'
                },
                {
                    model: EmploymentType,
                    as: 'employmentType'
                },
                {
                    model: Company,
                    as: 'company'
                },
                {
                    model: Experience,
                    as: 'experience'
                },
                {
                    model: Specialization,
                    as: 'specialization'
                }
            ]
        })
    
        if(vacancy){
            res.status(200).send(vacancy)
        } else {
            res.status(404).send({message: "Vacancy with that id not found"})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteVacancy = async(req, res) =>{
    try {
        await Vacancy.destroy({
            where:{
                id: req.params.id
            }
        })
        
        res.status(200).end()
        
    } catch (error) {
        res.status(500).send(error)
    } 
}

const editVacancy = async(req, res) =>{
    try {
        await Vacancy.update({
            name: req.body.name,
            specialization_id: req.body.specialization_id,
            city_id: req.body.city_id,
            employmentType_id: req.body.employmentType_id,
            description: req.body.description,
            salary_from: req.body.salary_from,
            salary_to: req.body.salary_to,
            salary_type: req.body.salary_type,
            address: req.body.address,
            experience_id: req.body.experience_id,
            skills: req.body.skills,
            about_company: req.body.about_company,
            user_id: req.user.id,
            company_id: req.user.companyId
        }, {
            where: {
                id: req.body.id
            }
        })
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const searchVacancy = async(req, res) =>{
    try {
        const {q, specialization_id, city_id, employmentType_id, salary, salary_type, experience_id} = req.query
        const options = {}

        if(q){
            options[Op.or] = [
                { name: { [Op.iLike]: `%${q}%` } },
                { description: { [Op.iLike]: `%${q}%` } },
                { about_company: { [Op.iLike]: `%${q}%` } },
                { skills: { [Op.iLike]: `%${q}%` } }
            ]
        }

        if(specialization_id){
            options.specialization_id = specialization_id          
        }

        if(city_id){
            options.city_id = city_id
        }

        if(employmentType_id){
            options.employmentType_id = employmentType_id
        }

        if(experience_id){
            options.experience_id = experience_id
        }

        if(salary_type){
            options.salary_type = salary_type
        }

        if(salary){
            options.salary_from = { [Op.lte]: salary }
            options.salary_to = { [Op.gte]: salary }
        }

        const vacancies = await Vacancy.findAll({
            where: options
        })

        if(vacancies.length > 0){
            res.status(200).send(vacancies)
        } else {
            res.status(403).send({message: 'Access forbiden'})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getExperiences,
    createVacancy,
    getMyVacancies,
    getVacancy,
    deleteVacancy,
    editVacancy, 
    searchVacancy
}