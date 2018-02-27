'use strict';

module.exports = function(app) {
  var coffeeFinder = require('../controllers/coffeeFinderController');

  // coffeeFinder Routes
  app.route('/shops')
    .get(coffeeFinder.list_all_shops)
    .post(coffeeFinder.create_a_shop);

  app.route('/shops/:coffeeShopId')
    .get(coffeeFinder.read_a_shop)
    .put(coffeeFinder.update_a_shop)
    .delete(coffeeFinder.delete_a_shop);

  app.route('/shops/find')
  	.post(coffeeFinder.find_nearest_shop);
};