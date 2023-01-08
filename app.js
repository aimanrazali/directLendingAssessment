
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

// Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/directLendingDB", { useNewUrlParser: true });

// Create schema

const postcodeSchema = new mongoose.Schema({
    // id: Number,
    state: String,
    postcode: Number
});

const customerSchema = new mongoose.Schema({
    // id: Number,
    name: String,
    dob: Date,
    address: String,
    postcodeid: postcodeSchema
});

// Create models
const Postcode = mongoose.model("Postcode", postcodeSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Create documents
const postcode1 = new Postcode({
    state: "Kuala Lumpur",
    postcode: 53300
});
// postcode1.save();

const cust1 = new Customer({
    // id: 
    name: "Andy",
    dob: "1990-09-10",
    address: "Jalan 1, 2 and 3",
    postcodeid: postcode1
});
// cust1.save();

customerSchema.methods.getAge = function () {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthdayYear = this.birthday.getFullYear();
    return currentYear - birthdayYear;
};

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    console.log("Post request received!");

    const nameInput = req.body.name;
    const dobInput = req.body.dob;
    const addressInput = req.body.address;
    const postcodeInput = req.body.postcode;
    const stateInput = req.body.state;

    console.log(nameInput);
    console.log(dobInput);
    console.log(addressInput);
    console.log(postcodeInput);
    console.log(stateInput);

    const postcode = new Postcode({
        state: stateInput,
        postcode: postcodeInput
    });
    // postcode.save();    

    const customer = new Customer({
        name: nameInput,
        dob: new Date(dobInput),
        address: addressInput,
        postcodeid: postcode
    });
    // customer.save();

    res.send("Form submitted!");

});

// Read from database 
Customer.find(function (err, customers) {
    if (!err) {
        mongoose.connection.close();

        customers.forEach(function (customer) {
            const age = new Date().getFullYear() - customer.dob.getFullYear();

            console.log("Name: " + customer.name);
            // console.log(new Date().getFullYear() - customer.dob.getFullYear());
            console.log("Age: " + age);
            console.log("Address: " + customer.address);
            console.log("Postcode: " + customer.postcodeid.postcode);
            console.log("State: " + customer.postcodeid.state);
            console.log("");
        });
    }
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});