var StockDAO = require("../data/stock-dao").StockDAO;

function StockHandler(db) {
    "use strict";

    var stockDAO = new StockDAO(db);

    this.displayStock = function(req, res, next) {

    	stockDAO.getAllNonAdminUsers(function(error, users) {

    		if (error) return next(error);

    		return res.render("stock", {
    			users: users,
    			user: {
    				isAdmin: true
    			}
    		});
    	});
    };

    this.updateStock = function(req, res, next) {
    	var itemId = req.body.itemId;
    	//var description = req.body.description;
    	var price = req.body.price;

    	stockDAO.updateStock(itemId, price, function(error) {
    	    if (error) return next(error);

            stockDAO.getAllNonAdminUsers(function(error, users) {
				var data;

	    		if (error) return next(error);

	    		data = {
	    			users: users,
	    			user: {
	    				isAdmin: true
	    			},
	    			updateSuccess: true
	    		};

	    		return res.render("stock", data);
	    	});
        });
    };
}

module.exports = StockHandler;