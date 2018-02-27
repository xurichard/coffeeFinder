'use strict';
var mongoose = require('mongoose');

var coffeeShopSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },

  name: {
    type: String,
    required: 'Please enter the name of the coffee shop'
  },

  address: {
    type: String,
    required: 'Kindly enter the address of coffee shop'
  },
  
  loc: {
    type: [Number], 
    index: '2d',
  }
});

mongoose.model('coffeeShop', coffeeShopSchema);

module.exports = mongoose.model('coffeeShop', coffeeShopSchema);