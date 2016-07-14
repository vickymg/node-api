// BASE SETUP

// Call the packages we need
var express    = require('express');     // call express
var app        = express();              // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./app/models/bear');

mongoose.connect('mongodb://localhost/node_api'); // connect to a database

// Configure app the use bodyParser()
// (this will let us get the data from a POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;      // set our PORT

// Routes for our api

var router = express.Router();            // get an instance of the express router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure to go to the next routes and don't stop here
});
// test route to make sure everythin is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!'});
});

// on routes that end in /bears

router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {

    var bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bear's name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Bear created!' });
    });
  })

  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

// on routes that end in /bears/:bear_id

router.route('/bears/:bear_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });

  })

  // update the bear with this id (accessed at PUT http://localhost:8080/bears/:bear_id)
    .put(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
          res.send(err);

        bear.name = req.body.name;    // update the bear's info

        // save the bear
        bear.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Bear updated!'});
        });
      });

    })

  // delete the bear with this id
  	.delete(function(req, res) {
  		Bear.remove({
  			_id: req.params.bear_id
  		}, function(err, bear) {
  			if (err)
  				res.send(err);

  			res.json({ message: 'Successfully deleted' });
  		});
  	});

// REGISTER OUR routes
// (all of the routes will be prefixed with /api)
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
