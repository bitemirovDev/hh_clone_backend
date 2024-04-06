const Resume = require("./models/Resume");
const WorkingHistory = require("./models/WorkingHistory");
const Education = require("./models/Education");
const ForeignLanguage = require("./models/ForeignLanguage");
const ResumeEmploymentType = require("./models/ResumeEmploymentType");
const EmploymentType = require("../employment-type/EmploymentType");
const Country = require("../region/Country");
const City = require("../region/City");
const { Op } = require("sequelize");

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.birthday,
      gender: req.body.gender,
      about: req.body.about,
      position: req.body.position,
      salary: req.body.salary,
      salary_type: req.body.salary_type,
      main_language: req.body.main_language,
      skills: req.body.skills,
      citizen_ship: req.body.citizen_ship,
      city_id: req.body.city_id,
      user_id: req.user.id,
      phone: req.body.phone,
    });

    // если пришла информация working histories

    if (req.body.working_histories && req.body.working_histories.length > 0) {
      req.body.working_histories.forEach(async (history) => {
        await WorkingHistory.create({
          resume_id: resume.id,
          company_name: history.company_name,
          company_description: history.company_description,
          responsibilities: history.responsibilities,
          start_date: history.start_date,
          end_date: history.end_date,
        });
      });
    }

    // если пришла информация education

    if (req.body.education && req.body.education.length > 0) {
      req.body.education.forEach(async (edu) => {
        await Education.create({
          resume_id: resume.id,
          level: edu.level,
          university_name: edu.university_name,
          faculty: edu.faculty,
          major: edu.major,
          end_date: edu.end_date,
        });
      });
    }

    // если пришла информация foreign languages

    if (req.body.foreign_languages && req.body.foreign_languages.length > 0) {
      req.body.foreign_languages.forEach(async (lang) => {
        await ForeignLanguage.create({
          resume_id: resume.id,
          level: lang.level,
          name: lang.name,
        });
      });
    }

    // если пришла информация empoylment type

    if (req.body.employment_types && req.body.employment_types.length > 0) {
      req.body.employment_types.forEach(async (emp) => {
        await ResumeEmploymentType.create({
          resume_id: resume.id,
          employmentType_id: emp,
        });
      });
    }

    res.status(200).send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      where: {
        user_id: req.user.id,
      },
    });

    res.status(200).send(resumes);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id, {
      include: [
        {
          model: WorkingHistory,
          as: "workingHistories",
        },
        {
          model: Education,
          as: "education",
        },
        {
          model: EmploymentType,
          as: "employmentTypes",
        },
        {
          model: City,
          as: "city",
        },
        {
          model: Country,
          as: "citizen_shipObject",
        },
        {
          model: ForeignLanguage,
          as: "foreignLanguages",
        },
      ],
    });

    res.status(200).send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteResume = async (req, res) => {
  try {
    await Resume.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

const editResume = async (req, res) => {
  try {
    await Resume.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        about: req.body.about,
        position: req.body.position,
        salary: req.body.salary,
        salary_type: req.body.salary_type,
        main_language: req.body.main_language,
        skills: req.body.skills,
        citizen_ship: req.body.citizen_ship,
        city_id: req.body.city_id,
        user_id: req.user.id,
        phone: req.body.phone,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    await WorkingHistory.destroy({
      where: {
        resume_id: req.body.id,
      },
    });

    await Education.destroy({
      where: {
        resume_id: req.body.id,
      },
    });

    await ForeignLanguage.destroy({
      where: {
        resume_id: req.body.id,
      },
    });

    await ResumeEmploymentType.destroy({
      where: {
        resume_id: req.body.id,
      },
    });

    const resume = {
      id: req.body.id,
    };

    // если пришла информация working histories

    if (req.body.working_histories && req.body.working_histories.length > 0) {
      req.body.working_histories.forEach(async (history) => {
        await WorkingHistory.create({
          resume_id: resume.id,
          company_name: history.company_name,
          company_description: history.company_description,
          responsibilities: history.responsibilities,
          start_date: history.start_date,
          end_date: history.end_date,
        });
      });
    }

    // если пришла информация education

    if (req.body.education && req.body.education.length > 0) {
      req.body.education.forEach(async (edu) => {
        await Education.create({
          resume_id: resume.id,
          level: edu.level,
          university_name: edu.university_name,
          faculty: edu.faculty,
          major: edu.major,
          end_date: edu.end_date,
        });
      });
    }

    // если пришла информация foreign languages

    if (req.body.foreign_languages && req.body.foreign_languages.length > 0) {
      req.body.foreign_languages.forEach(async (lang) => {
        await ForeignLanguage.create({
          resume_id: resume.id,
          level: lang.level,
          name: lang.name,
        });
      });
    }

    // если пришла информация empoylment type

    if (req.body.employment_types && req.body.employment_types.length > 0) {
      req.body.employment_types.forEach(async (emp) => {
        await ResumeEmploymentType.create({
          resume_id: resume.id,
          employmentType_id: emp,
        });
      });
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchResume = async (req, res) => {
  try {
    const { q, city_id, salary_from, salary_to, salary_type, citizenship } =
      req.query;
    const options = {};

    if (q) {
      options[Op.or] = [
        { first_name: { [Op.iLike]: `%${q}%` } },
        { last_name: { [Op.iLike]: `%${q}%` } },
        { about: { [Op.iLike]: `%${q}%` } },
        { position: { [Op.iLike]: `%${q}%` } },
        { skills: { [Op.iLike]: `%${q}%` } },
      ];
    }

    if (citizenship) {
      options.citizenship = citizenship;
    }

    if (city_id) {
      options.city_id = city_id;
    }

    if (salary_from && !salary_to) {
      options.salary = { [Op.gte]: salary_from };
    } else if (!salary_from && salary_to) {
      options.salary = { [Op.lte]: salary_to };
    } else if (salary_from && salary_to) {
      options.salary = { [Op.between]: [salary_from, salary_to] };
    }

    if (salary_type) {
      options.salary_type = salary_type;
    }

    const resumes = await Resume.findAll({
      where: options,
    });

    if (resumes.length > 0) {
      res.status(200).send(resumes);
    } else {
      res.status(403).send({ message: "Access forbiden" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createResume,
  getMyResumes,
  getResume,
  deleteResume,
  editResume,
  searchResume,
};
