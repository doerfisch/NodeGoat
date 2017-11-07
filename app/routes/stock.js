var StockDAO = require("../data/stock-dao").StockDAO;

function StockHandler(db) {
    "use strict";

    var stockDAO = new StockDAO(db);


    this.displayStock = function(req, res, next) {

    	stockDAO.getAllStocks(function(error, items) {

    		if (error) return next(error);

    		return res.render("stock", {
    			items: items
    		});
    	});
    };

    this.updateStock = function(req, res, next) {
    	var itemId = req.body.itemId;
    	//var description = req.body.description;
    	var price = parseInt(req.body.itemPrice);

    	stockDAO.updateStock(itemId, price, function(error) {
    	    if (error) return next(error);



            stockDAO.getAllStocks(function(error, items) {

                if (error) return next(error);

                return res.render("stock", {
                    items: items
                });
                return res.render("stock", data);
            });

		});
    };
}

module.exports = StockHandler;