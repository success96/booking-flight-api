const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)
//endpoint to add a new flight
router.post('/add', controller.add)
//endpoint obtains all the flight
router.get('/allFlights', controller.allflights);
//endpoint to get a single flight
router.get('/findOne/:id', controller.findone);
//endpoint to edit a flight
router.put('/update', controller.update);
//endpoint to delete a flight
router.delete('/delete', controller.delete);
module.exports = router;