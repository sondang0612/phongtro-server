const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const registerService = ({ phone, password, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: v4(),
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is successfully"
          : "Phone number has been already used!",
        token: token || null,
        user: token
          ? {
              id: response[0].id,
              phone: response[0].phone,
              avatar: response[0].avatar,
              name: response[0].name,
            }
          : null,
      });
    } catch (error) {
      reject(error);
    }
  });

const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true, // false => Instance of sequelize
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);

      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token ? "Login is successfully" : "Phone or Password is wrong",
        token: token || null,
        user: token
          ? {
              id: response.id,
              phone: response.phone,
              avatar: response.avatar,
              name: response.name,
            }
          : null,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  hashPassword,
  registerService,
  loginService,
};
