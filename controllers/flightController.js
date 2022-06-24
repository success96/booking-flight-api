const flights = require("../models/Flight.json")
const fs = require('fs');
const { userInfo } = require("os");

exports.example = (req, res) => {
    console.log("Server is up and running!")
    res.send("Flight server is running")
}

exports.add = (req, res) => {
    //create a new flight from client request
    //save new flight to flight model
    //send back response to client
    //console.log(req.body.newFlight)
    flights.push(req.body.newFlight);
    //save updated flight data to flight.json
    let stringedData = JSON.stringify(flights, null, 2);
    fs.writeFile("./models/Flight.json", stringedData, function(err) {
        if (err){
            return res.status(500).json({message: err})
        }
    })

    return res.status(200).json({message: "New flight created"})
    
}

exports.allflights = (req, res) => {
    //fetch all existing flights
    //send flight array as response to the client
    return res.json({flights})
    //return res.send(db)
}

exports.findOne = (req, res) => {
    //fetch a particular user with the given id
    //search for the required flight from the flight model
    //send the flight details corresponding to given id as response to the client
    //return a 404 error if id isnt found
    let id = req.params.id;
    //console.log(id);
    let foundFlight = flights.find( flight => {
        return flight.title === id       

        });
    //console.log(foundFlight)
    if (foundFlight) {
        return res.status(400).json({flight: foundFlight})
    } else {
        return res.status(404).json({message: "Flight not found" })
    }
    
}

exports.update = (req, res) => {
    let id = req.params.id;
    //update an existing flight
    let foundFlight = flights.find( flight => {
        return flight.title === id;       
        });
    flights[indexOf(foundFlight)] = req.params.body;
    res.json({message: "Data updated successfully!"})
}

exports.delete = (req, res) => {
    let id = req.params.id;
    res.json({message: `${id} has been deleted`})

}
    
