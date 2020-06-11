const router = require('express').Router();
const mainScrapeController = require("../../controllers/mainScrapeController")

router.route("/scrapeAll")
    .get(mainScrapeController.masterScrapeMethod)
router.route("/scrapeOne")
    .get(mainScrapeController.scrapeSingleItem)
    
module.exports = router