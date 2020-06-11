const axios = require("axios");
const cheerio = require("cheerio");
const scrape_db = require("../Models");
const date = new Date()
setTimeout ( function (){
  module.exports.autoScrapeMethod()
  console.log("start")
}, 100)
setInterval(()=> {module.exports.autoScrapeMethod(); console.log("scrape")}, 36000000)
module.exports = {
  autoScrapeMethod: async () => {
    const query = "SELECT * from ??"
    try {
      let data;
      await scrape_db.Data.query(
        query, 
        ["cscart_micro_prices_links"],
        (err, response) => {
          if (err) console.log(err)
          else{
            data = response
            data.forEach((item) => {
              if (item.url.split(".")[1] === "amazon") {
                setTimeout(() => {
                  module.exports.getAmazon(
                    item.url,
                    item.product_id,
                    item.link_id
                  );
                }, 100);
              } else if (item.url.split(".")[1] === "ebay") {
                setTimeout(() => {
                  module.exports.getEbay(
                    item.url,
                    item.product_id,
                    item.link_id
                  );
                }, 100);
              } else if (item.url.split(".")[1] === "walmart") {
                setTimeout(() => {
                  module.exports.getWalmart(
                    item.url,
                    item.product_id,
                    item.link_id
                  );
                }, 100);
              }
            });
          }
        }
      )
    } catch (err) {
      console.log(err);
    }
  },
  masterScrapeMethod: async (req, res) => {
    const query = "SELECT * from ??"
    try {
      let data;
      await scrape_db.Data.query(
        query, 
        ["cscart_micro_prices_links"],
        (err, response) => {
          if (err) console.log(err)
          else{
            data = response
            data.forEach((item) => {
              if (item.url.split(".")[1] === "amazon") {
                setTimeout(() => {
                  module.exports.getAmazon(
                    item.url,
                    item.product_id,
                    item.link_id
                  );
                }, 100);
              } else if (item.url.split(".")[1] === "ebay") {
                setTimeout(() => {
                  module.exports.getEbay(
                    item.url,
                    item.product_id,
                    item.link_id
                  );
                }, 100);
              } else if (item.url.split(".")[1] === "walmart") {
                setTimeout(() => {
                  module.exports.getWalmart(
                    item.url,
                    item.product_id,
                    item.link_id
                  );
                }, 100);
              }
            });
          }
        }
      )
    } catch (err) {
      console.log(err);
    }
    res.json({ status: 200 });
  },
  scrapeSingleItem: async (req, res) => {
    if (req.data.url.split(".")[1] === "amazon") {
      module.exports.getAmazon(
        req.data.url,
        req.data.product_id,
        req.data.link_id
      );
    } else if (req.data.url.split(".")[1] === "ebay") {
      module.exports.getEbay(
        req.data.url,
        req.data.product_id,
        req.data.link_id
      );
    } else if (req.data.url.split(".")[1] === "walmart") {
      module.exports.getWalmart(
        req.data.url,
        req.data.product_id,
        req.data.link_id
      );
    }
  },
  getAmazon: async (link, id, link_id) => {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    };
    
    await axios
      .get(link, headers)
      .then(function (response) {
        let $amazon = cheerio.load(response.data);
        let price = parseFloat($amazon("#priceblock_ourprice").text().split(" ")[0].split("$")[1]);
        if (!price) {
          price = parseFloat($amazon("#priceblock_saleprice").text().split(" ")[0].split("$")[1]);
        }
        const product = $amazon("#productTitle").text().trim();
        module.exports.saveData(id, link_id, price, product);
      })
      .catch((err) => {
        setTimeout(()=>{module.exports.getAmazon(link, id, link_id)}, 100);
      });
  },
  getWalmart: async (link, id, link_id) => {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    };
    await axios
      .get(link, headers)
      .then(function (response) {
        let $walmart = cheerio.load(response.data);
        let price = parseFloat($walmart("#price").text().split("$")[1])
        const product = $walmart("h1[itemprop|='name']").text().trim();
        module.exports.saveData(id, link_id, price, product);
      })
      .catch((err) => {
          setTimeout(function () {module.exports.getWalmart(link, id, link_id)}, 100);
      })

  },
  getEbay: async (link, id, link_id) => {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    };
    await axios
      .get(link, headers)
      .then(function (response) {
        let $ebay = cheerio.load(response.data);
        let price = parseFloat($ebay("#prcIsum").text().trim().split(" ")[1].split("$")[1].split("/")[0]);
        if (!price) {
          price = parseFloat($ebay("#mm-saleDscPrc").text().trim().split(" ")[1].split("$")[1].split("/")[0]);
        }
        const product = $ebay("#itemTitle").text().trim();
        module.exports.saveData(id, link_id, price, product);
      })
      .catch((err) => {
    
          setTimeout(function () {module.exports.getEbay(link, id, link_id)}, 100);
  
      });
  },
  saveData: async (id, link_id, price, product) => {
    const query = "INSERT INTO cscart_micro_prices SET ?";
    scrape_db.Data.query(
      query,
      {
        product_id: id,
        link_id: link_id,
        product_name: product,
        price: price,
        timestamp: date.getTime()
      },
      (err, result) => {
        if (err) console.log(err);

      }
    );
  }
};
