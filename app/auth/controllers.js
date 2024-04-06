const sendMail = require("../utils/sendMail");
const AuthCodes = require("../auth/AuthCodes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./User");
const Role = require("./Role");
const Company = require("./Company");
const { jwtOptions } = require("../../config/passport-config");

const sendVerificationEmail = (req, res) => {
  try {
    const code = "HH" + Date.now();

    AuthCodes.create({
      email: req.body.email,
      code: code,
      validTill: Date.now() + 120000,
    });

    sendMail(req.body.email, "Код авторизации hh.kz", code);
    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

const verificationCode = async (req, res) => {
  try {
    const authCode = await AuthCodes.findOne({
      where: { email: req.body.email },
      order: [["validTill", "DESC"]],
    });

    if (!authCode) {
      res.status(401).send({ error: "Code is invalid" });
    } else if (new Date(authCode.validTill).getTime() < Date.now()) {
      res.status(401).send({ error: "Code is invalid" });
    } else if (authCode.code !== req.body.code) {
      res.status(401).send({ error: "Code is invalid" });
    } else {
      let user = await User.findOne({ where: { email: req.body.email } });
      const role = await Role.findOne({ where: { name: "employee" } });
      if (!user) {
        user = await User.create({
          roleId: role.id,
          email: req.body.email,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          role: {
            id: role.id,
            name: role.name,
          },
        },
        jwtOptions.secretOrKey,
        { expiresIn: "1y" }
      );
      res.status(200).send({ token: token });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const signUp = async (req, res) => {
  try {
    const role = await Role.findOne({
      where: {
        name: "manager",
      },
    });

    const company = await Company.create({
      name: req.body.company_name,
      description: req.body.company_description,
      address: req.body.company_address,
      logo: "/company/" + req.file.filename,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
      email: req.body.email,
      password: hashedPassword,
      full_name: req.body.full_name,
      companyId: company.id,
      roleId: role.id,
    });

    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

const logIn = async (req, res) => {
  try {
    if (
      !req.body.email ||
      req.body.email.length === 0 ||
      !req.body.password ||
      req.body.password.length === 0
    ) {
      res.status(401).send({ message: "Bad credentials" });
    } else {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res
          .status(401)
          .send({ message: "User with that email is not exists" });

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        const role = await Role.findByPk(user.roleId);

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            role: {
              id: role.id,
              name: role.name,
            },
          },
          jwtOptions.secretOrKey,
          { expiresIn: "1y" }
        );

        res.status(200).send(token);
      } else {
        res.status(401).send({ message: "Password is incorrect" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  sendVerificationEmail,
  verificationCode,
  signUp,
  logIn,
};
