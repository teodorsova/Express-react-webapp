var userList = require("../models/user");
const { Op } = require("sequelize");
const sequelize = require("../sequelize");
const express = require("express");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt')
const { createTokens, validateToken } = require('../auth/JWT')

var app = express();
app.use(cookieParser)

module.exports.findAll = async (req, res) => {
  try {
    const users = await userList.findAll({
      attributes: ["userName"],
    });
    res.header("Access-Control-Allow-Origin", "*"); //TO PREVENT CORS
    // console.log(req.body);
    // console.log(Object.keys(users[0].dataValues.userName[1]));
    // console.log(users[1].dataValues.userName);
    //console.log(users)
    usrArr = [];
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].dataValues.userName);
      usrArr.push(users[i].dataValues.userName);
    }
    //users.forEach(user => usrArr.push(user.dataValues.userName))
    return res.status(200).json(usrArr);
  } catch (err) {
    return res.status(500).json(err);
  }
};


module.exports.register = async (req, res) => {
  const { userName, passWord } = req.body;
  bcrypt.hash(passWord, 10).then(hash => {
    userList.create({
      userName: userName,
      passWord: hash,
    }).then(() => {
      return res.status(200).json({ message: "success" });
    }).catch((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    })
  })
}

module.exports.login = async (req, res, next) => {
    const { userName, passWord } = req.body;
    const user = await userList.findOne({where: { userName: userName} });
    res.header("Access-Control-Allow-Credentials", true);
    if(!user) { 
      return res.status(404).json({ message: "The user does not exist." });
    } 

    const dbPassword = user.passWord;
    bcrypt.compare(passWord, dbPassword).then((match) => {
      if(!match) {
        console.log("Nono")
        return res.status(400).json({error: "Wrong user/ pass!"})
      } else {
        const accessToken = createTokens(user)
        res.cookie("access-token", accessToken, {
          maxAge: 600*1000 //10 minutes
        });
        res.json({message: "Logged in.", userName: user.userName})       
        console.log(res)  
      }
    });
};

module.exports.dashboard = async (req, res, next) => {
 return validateToken(req, res, next);
};

module.exports.updateOrInsert = async (req, res) => {
  try {
    var id = req.body.id;
    var user;
    if (id !== "undefined") {
      user = await userList.findByPk(req.body.id);
    }
    console.log(req.body);
    if (user) {
      await userList.update(req.body, {
        where: {
          id: { [Op.eq]: `${req.body.id}` },
        },
      });
    } else {
      if (id) {
        delete req.body.id;
      }
      user = await userList.create(req.body);
    }
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await userList.destroy({
      where: {
        userName: { [Op.eq]: `${req.body.userName}` },
      },
    });
    return res.status(200).json({ status: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};



