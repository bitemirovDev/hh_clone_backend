
const Apply = require('./Apply')
const Resume = require('../resume/models/Resume')

const validateApply = (req, res, next) =>{
    try {
        let errors = {}
        if(!req.body.resume_id || req.body.resume_id.length === 0){
            errors.resume_id = 'Поле Резюме обязательное'
        }
        if(!req.body.vacancy_id || req.body.vacancy_id.length === 0){
            errors.vacancy_id = 'Поле Вакансия обязательное'
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

const isAuthorOfApply = async(req, res, next) =>{
    try {
        const id = req.params.id
        const apply = await Apply.findByPk(id)
        if(!apply) res.status(400).send({message: "Apply with that id not found"})
        else{
            const resumes = await Resume.findAll({
                where: {
                    user_id: req.user.id
                }
            })

            const ids = resumes.map(item => item.id)

            if(ids.includes(id * 1)){
                next()
            }else{
                res.status(403).send({message: "Access forbiden"})
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const isApplyExists = async(req, res, next) =>{
    try {
        const apply = await Apply.findByPk(req.body.apply_id)

        if(!apply) res.status(400).send({message: "Apply with that id not found"})

        req.body.id = apply.vacancy_id

        next()
    } catch (error) {
        res.status(500).send(error)
    }
    
}

module.exports = {
    validateApply,
    isAuthorOfApply,
    isApplyExists
}