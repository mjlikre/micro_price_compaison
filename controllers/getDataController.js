const scrape_db = require("../models");

module.exports = {
    getAllList : async (req, res) => {
        const query = "SELECT * FROM ?? WHERE ?? = ? "
        scrape_db.Data.query(
            query,
            ["price_comparison", "price_status", "C"],
            (err, result) => {
                if (err) console.log(err)
                else{
                    res.json({result})
                }
            }
        )
    }
}