const db = require("../models/Flight")
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
    db.flight.push(req.body.newFlight);
    //save updated flight data to flight.json
    let stringedData = JSON.stringify(db.flight, null, 2);
    fs.writeFile("../models/Flight", stringedData, (err) => {
        if (err){
            return res.status(500).json({message: err})
        }
    })

    return res.status(200).json({message: "New flight created"})
}

exports.allflights = (req, res) => {
    //fetch all existing flights
    //send flight array as response to the client
    return res.json({flight: db.flight})
    //return res.send(db)
}

exports.findone = (req, res) => {
    //fetch a particular user with the given id
    //search for the required flight from the flight model
    //send the flight details corresponding to given id as response to the client
    //return a 404 error if id isnt found
    let id = req.params.id;
    let foundFlight = db.flight.forEach((element) => {
        return String(element.title) === id
    });
    if (foundFlight) {
        return res.status(400).json({flight: foundFlight})
    } else {
        return res.status(404).json({message: "Flight not found" })
    }
    
}

exports.update = (req, res) => {
    //update an existing flight
}

exports.delete = (req, res) => {
    //this is to delete a particular flight
}
    
