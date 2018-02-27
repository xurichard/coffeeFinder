'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let coffeeShop = mongoose.model('coffeeShop');
const request = require("request");
exports.list_all_shops = (req, res) => {
    coffeeShop.find({}, function (err, shop) {
        if (err)
            res.send(err);
        res.json(shop);
    });
};
exports.create_a_shop = function (req, res) {
    var new_shop = new coffeeShop();
    new_shop.name = req.body.name;
    new_shop.address = req.body.address;
    new_shop.loc = [req.body.longitude, req.body.latitude];
    // Have to find next open _id
    coffeeShop.findOne().sort('-_id').exec(function (err, shop) {
        new_shop._id = shop._id + 1;
        new_shop.save(function (err, shop) {
            if (err)
                res.send(err);
            res.json(shop._id);
        });
    });
};
exports.read_a_shop = function (req, res) {
    coffeeShop.findById(req.params.coffeeShopId, function (err, shop) {
        if (err)
            res.send(err);
        res.json(shop);
    });
};
exports.update_a_shop = function (req, res) {
    // Change the body of request to fit the loc format
    var update = req.body;
    console.log(update);
    if (req.body.longitude)
        update["loc.0"] = req.body.longitude;
    if (req.body.latitude)
        update["loc.1"] = req.body.latitude;
    delete update["latitude"];
    delete update["longitude"];
    coffeeShop.findOneAndUpdate({ _id: req.params.coffeeShopId }, update, { new: true }, function (err, shop) {
        if (err)
            res.send(err);
        res.json(shop);
    });
};
exports.delete_a_shop = function (req, res) {
    coffeeShop.remove({
        _id: req.params.coffeeShopId
    }, function (err, shop) {
        if (err)
            res.send(err);
        res.json({ message: 'Shop successfully deleted' });
    });
};
exports.find_nearest_shop = function (req, res) {
    var API_KEY = "AIzaSyCawyHgdHUG8d3PKug5ypnGXXmGjKe6kBY";
    var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var address = req.body.address;
    var url = BASE_URL + address + "&components=country:US|locality:San Francisco" + "&key=" + API_KEY;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var loc = JSON.parse(body).results[0].geometry.location;
            coffeeShop.findOne({ 'loc': { $near: [loc.lng, loc.lat], $maxDistance: 10000 } }, function (err, shop) {
                if (err)
                    res.send(err);
                console.log(shop.loc);
                res.json(shop);
            });
        }
        else {
            res.send(error);
        }
    });
};
//# sourceMappingURL=coffeeFinderController.js.map