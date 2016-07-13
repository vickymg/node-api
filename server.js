// BASE SETUP

// Call the packages we need
var express    = require('express');     // call express
var app        = express();              // define our app using express
var bodyParser = require('body-parser');

// Configure app the use bodyParser()
// (this will let us get the data from a POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;      // set our PORT

// Routes for our api

var router = express.Router();            // get an instance of the express router

// test route to make sure everythin is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR routes
// (all of the routes will be prefixed with /api)
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
