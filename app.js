const express = require("express");
const app = express();
// require https native nodejs 
const https = require("https")

// install require for request for HTTP
const request = require('request');

const bodyparser = require("body-parser");
// added by default from express to response and from http we send to status code
const { url } = require("inspector");
const { response } = require("express");
const { STATUS_CODES } = require("http");
var port = 3000;

// parse the data from form 
app.use(bodyparser.urlencoded({ extended: true }));

// express for reading style 
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile("/index.html")
})

// parse data from form after using app use and installing body parser
app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;


    app.post("/failture", function (req, res) {
        const button = req.body.submit;
        res.sendFile(__dirname + "/index.html");

    })

    // clarify the required data in object from API
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    // stringify the data to be sent to mailchimp
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/bb0e45e829"


    // creating variable to post the data for external resouce and authenticate it using the authentication code node.js
    // it's HTTPS here to post the date to external resouce
    const options = {
        method: "POST",
        auth: "ayan1:bf656524b6f93202d5db0f5b71ba93ef-us17"
    }

    // this is to send data https native node.js module for sending data 
    const request = https.request(url, options, function (response) {

        response.on("data", function (data) {

            console.log(JSON.parse(data));
            // depending here on status code response to apply which page 
            if (response.statusCode == 200) {
                res.sendFile(__dirname + "/success.html")
            } else
                res.sendFile(__dirname + "/failture.html")
        })
    })

    request.write(jsonData)
    request.end();

    // console.log(firstName, lastName, Email);

})

app.listen(process.env.PORT || port, function () {
    console.log(`we are listenng for data ${port}`);
})


