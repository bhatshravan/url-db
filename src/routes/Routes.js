const express = require("express");

module.exports = app => {
    const Users = express.Router();

    app.all("/", (req, res) => {
        res.status(200).json({
            "Hello": "yes",
            "No": false,
            "Ne":true
        });
    });



    app.get("*", (req, res) => {
        res.status(400).json({
            "Invalid Url": true
        });
    });
}