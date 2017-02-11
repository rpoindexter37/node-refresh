const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  PORT = 3000,
  mongoURL = process.env.MONGODB_URL || 'mongodb://localhost/locations-app'

  mongoose.connect(mongoURL)

  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(express.static(process.env.PWD + '/public'))

  var Trip = mongoose.model('Trip', {
    start: Date,
    end: Date,
    topMPH: Number,
  })

//this sendd the html file to the server
  app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
  })

  app.get('/trips', (req, res) => {
    Trip.find({}, function(err, trips) {
      res.json(trips)
    })
  })

  app.post('/trips', function(req, res) {
    Trip.create(req.body, function(err, trip) {
      res.send({message: "you done send me sumptin: ", trip: trip})
    })
  })

app.listen(PORT, (err) => {
  console.log(err || "server running on port " + PORT)
})
