var fs = require('fs');
var parse = require('csv-parse');
var coffeeShop = require('./dist/models/coffeeFinderModel'); //created model loading here
var bodyParser = require('body-parser');

var db = require('./db');

function end() { 
	console.log('added locations');
	process.exit(1);
}

var itemsProcessed = 0;

fs.readFile("locations.csv", function (err, fileData) {
  parse(fileData, {delimiter: ",", trim: true}, function(err, rows) {
    // Your CSV data is in an array of arrys passed to this callback as rows.
	rows.forEach(function(row, index, array){
		var new_shop = new coffeeShop();
		new_shop._id = row[0];
		new_shop.name = row[1];
		new_shop.address = row[2];
		new_shop.loc = [parseFloat(row[4]), parseFloat(row[3])];
		new_shop.save(function(err, shop) {
	    	if (err)
		    	console.log(err);
		    console.log(shop.name);
		    itemsProcessed++;
		    if(itemsProcessed === rows.length)
      			end();
		});
	}
	)
  })
})

