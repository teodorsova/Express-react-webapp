const FoodListing = require("../models/foodListing");
const { Op } = require("sequelize");
const FoodlistingController = require("../controllers/FoodlistingController");
const userController = require("../controllers/userController");
const friendshipController = require("../controllers/friendshipController");
var express = require("express");
const { application } = require("express");
var router = express.Router();

var users = ["Teo", "RTJ", "Andreea"];

router.get("/", function (req, res) {
  res.json(users);
});

router
  .route("/listing")
  .get(FoodlistingController.findAll)
  .post(FoodlistingController.create)
  .put(FoodlistingController.updateOrInsert)
  .delete(FoodlistingController.delete);

router.route("/listing/update").put(FoodlistingController.updateAvailability)

router.route("/listingUser").get(FoodlistingController.findForUser);

router
  .route("/user")
  .get(userController.findAll)
  .put(userController.updateOrInsert)
  .delete(userController.delete);

router.route("/login").post(userController.login);

router.route("/register").post(userController.register);

router.route("/dashboard").get(userController.dashboard);

router.route("/notifications").post(FoodlistingController.getNotifications);

router.route("/friendship")
  .get(friendshipController.findAll)
  .post(friendshipController.create)
router.route("/friendship/find")
  .post(friendshipController.findOneFriendship)

router.route("/friendship/remove")
  .post(friendshipController.removeFriendship)

router.route("/friendship/accept")
  .post(friendshipController.acceptFriendship)

module.exports = router;
