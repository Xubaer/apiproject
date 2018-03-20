const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.route('/')
    .get(userController.index)
    .post();

module.exports = router;