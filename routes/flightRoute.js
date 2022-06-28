const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)
//endpoint to add a new flight
router.post('/', controller.add)
//endpoint obtains all the flight
router.get('/allFlights', controller.allflights);
//endpoint to get a single flight
router.get('/:id', controller.findOne);
//endpoint to edit a flight
router.put('/edit', controller.update);
//endpoint to delete a flight
router.delete('/:id', controller.delete);
module.exports = router;