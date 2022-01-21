var listingsDb = require("../models/foodListing");
const { Op } = require("sequelize");
const sequelize = require("../sequelize");
const FoodListing = require("../models/foodListing");

module.exports.findAll = async (req, res) => {
  try {
    const foodListings = await listingsDb.findAll();
    res.header("Access-Control-Allow-Origin", "*"); //TO PREVENT CORS
    console.log(req.body);
    return res.status(200).json(foodListings);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.create = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.foodName);
    const newListing = await listingsDb.create(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json(newListing);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.updateOrInsert = async (req, res) => {
  try {
    var id = req.body.id;
    var listing;
    if (id !== "undefined") {
      listing = await listingsDb.findByPk(req.body.id);
    }
    console.log(req.body);
    if (listing) {
      await listingsDb.update({claimedBy: req.body.userName},{ where: {id: req.body.id}}) 
    }
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json(listing);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.updateAvailability = async (req, res) => {
  try {
    var id = req.body.id;
    var listing;
    if (id !== "undefined") {
      listing = await listingsDb.findByPk(req.body.id);
    }
    console.log(req.body);
    if (listing) {
      await listingsDb.update({isAvailable : req.body.isAvailable},{ where: {id: req.body.id}})
    }
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json(listing);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await listingsDb.destroy({
      where: {
        id: { [Op.eq]: `${req.body.id}` },
      },
    });
    return res.status(200).json({ status: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.findForUser = async (req, res) => {
  try {
    console.log(req);
    const foodListings = await listingsDb.findAll({
      where: {
        userName: {
          [Op.eq]: req.body.userName,
        },
      },
    });

    res.header("Access-Control-Allow-Origin", "*"); //TO PREVENT CORS
    console.log(req.body);
    console.log(foodListings);
    return res.status(200).json(foodListings);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.getNotifications = async (req, res) => {
  try {
    var today = new Date();
    const userName = req.body.userName;
    //console.log(userName)
    const listings = await listingsDb.findAll({
      where: {
        userName: userName
      },
      raw: true,
    })


    return res.status(200).json(listings);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
