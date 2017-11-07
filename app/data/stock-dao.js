/* The StockDAO must be constructed with a connected database object */
function StockDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof StockDAO)) {
        console.log("Warning: StockDAO constructor called without 'new' operator");
        return new StockDAO(db);
    }

    var usersCol = db.collection("users");
    var stockCol = db.collection("stock");

    this.getAllNonAdminUsers = function(callback) {
        usersCol.find({
            "isAdmin": {
                $ne: true
            }
        }).toArray(function(err, users) {
            callback(null, users);
        });
    };

    this.updateStocks = function(itemId, price, callback) {
        stockCol.update({
                _id: parseInt(itemId)
            }, {
                $set: {
                    price: price
                }
            },
            function(err, result) {
                if (!err) {
                    console.log("Updated stock");
                    return callback(null, result);
                }

                return callback(err, null);
            }
        );
    };
}

module.exports.StockDAO = StockDAO;
