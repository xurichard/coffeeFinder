var mongoose = require('mongoose');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password@ds247648.mlab.com:47648/kinsacoffee');