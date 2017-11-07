/* The StockDAO must be constructed with a connected database object */
function StockDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof StockDAO)) {
        console.log("Warning: StockDAO constructor called without 'new' operator");
        return new StockDAO(db);
    }

    var stockCol = db.collection("stock");

    this.getAllStocks = function(callback) {
        stockCol.find().toArray(function(err, items) {
            callback(null, items);
        });
    };
}

module.exports.StockDAO = StockDAO;
