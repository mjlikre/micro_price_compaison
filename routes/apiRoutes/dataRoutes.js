const router = require('express').Router();
const getDataController = require("../../controllers/getDataController")

router.route("/all")
    .get(getDataController.getAllList)
    
module.exports = router