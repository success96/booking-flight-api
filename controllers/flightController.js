const { flights } = require("../models/Flight.js")
//const fs = require('fs');
//const { userInfo } = require("os");
const {v4: uuid} = require("uuid");

exports.example = (req, res) => {
    console.log("Server is up and running!")
    res.send("Flight server is running")
}

exports.add = async (req, res) => {
    //create a new flight from client request
    //save new flight to flight model
    //send back response to client
    //console.log(req.body.newFlight)
    try {
        const {title, Ptime, price, date } = await req.body;
        const flight = {
            id: uuid(),
            title,
            price, 
            date,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        }

        flights.push(flight);
         //save updated flight data to flight.json
        // let stringedData = JSON.stringify(flights, null, 2);
        // fs.writeFile("./models/Flight.js", stringedData, function(err) {
        // if (err){
        //     return res.status(500).json({messag(e: err})
        // }
        // })

        res.status(201).json({
            message: "New flight booked!",
            flight
        })

    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
    
}

exports.allflights = async (req, res) => {
    //fetch all existing flights
    //send flight array as response to the client
    try{
        const allFlights = flights;
        res.status(200).json({
            "Message": "These are all flights",
            "Flights": allFlights
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.findOne = (req, res) => {
    //fetch a particular user with the given id
    //search for the required flight from the flight model
    //send the flight details corresponding to given id as response to the client
    //return a 404 error if id isnt found
    try {
        let id = req.params.id;
        //console.log(id);
        const foundFlight = flights.find( (flight) => { return flight.id === id });
         //console.log(foundFlight)
        if (foundFlight) {
        return res.status(400).json({
            message: "Flight found",
            flight: foundFlight
        })
        } else {
          return res.status(404).json({message: "Flight not found" })
        };

    } catch (err){
        res.status(500).json({message: err})
    }
    
   
    
}

exports.update = (req, res) => {
    try {
        let id = req.params.id;
        //update an existing flight
        let foundFlight = flights.find( (flight) => flight.id === id  );
        const {title, price, date } = req.body;
        foundFlight.title = title;
        foundFlight.price = price;
        foundFlight.date = date;
        res.json({message: "Data updated successfully!"})
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

exports.delete = (req, res) => {
    //To delete an existing flight
    try {
        let id = req.params.id;
        //console.log(id);
        const foundFlight = flights.find( (flight) => { return flight.id === id });
        flights.splice(flights.indexOf(foundFlight), 1)
        res.status(200).json({
            message: "Flight deleted",
            foundFlight,
        })
    } catch(err){res.status(500).json({message: err.message})}

}
    
