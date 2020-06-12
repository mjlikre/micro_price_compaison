const router        = require('express').Router();
const mainRoutes = require("./mainRoutes");
const dataRoutes = require("./dataRoutes")


router.use('/app', mainRoutes);
router.use('/data', dataRoutes);

module.exports = router;