const Vacancy = require('./models/Vacancy')

const validateVacancy = (req, res, next) =>{
    try {
        let errors = {}
        if(!req.body.name || req.body.name.length === 0){
            errors.name = 'Поле Название вакансии обязательное'
        }
        if(!req.body.specialization_id || typeof req.body.specialization_id === 'number'){
            errors.specialization_id = 'Поле Специализация обязательное'
        }
        if(!req.body.city_id || typeof req.body.city_id === 'number'){
            errors.city_id = 'Поле Где искать сотрудников обязательное'
        }
        if(!req.body.description || req.body.description.length === 0){
            errors.description = 'Поле Описание вакансии обязательное'
        }
        if(!req.body.employmentType_id || typeof req.body.employmentType_id === 'number'){
            errors.employmentType_id = 'Поле Тип занятости обязательное'
        }

        if(JSON.stringify(errors) !== JSON.stringify({})){
            res.status(400).send(errors)
        }else{
            next()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const isAuthorOfVacancy = async(req, res, next) =>{
    try {
        const id = req.params.id || req.body.id
        const vacancy = await Vacancy.findByPk(id)
        if(!vacancy){
            res.status(400).send({message: "Vacancy with that id not found"})
        } else if (vacancy && vacancy.user_id === req.user.id){
            next()
        } else {
            res.status(403).send({message: 'Access forbiden'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    validateVacancy,
    isAuthorOfVacancy
}