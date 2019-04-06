const express = require("express");
const uuidv4 = require("uuid/v4");
const uuidv1 = require("uuid/v1");
const Users_router = require('./Users.routes');
const path = require('path');


module.exports = app => {
    const Users = express.Router();

    app.all("/", (req, res) => {
        res.status(200).json({
            "Hello": "yes",
        });
    });

    app.all("/test", (req, res) => {
        const NAMESPACE = "bf3e6603-4851-45d6-a7ef-b01cbb8c16b7";
        var uuid = (uuidv4());
        var uuid2 = (uuidv1());
        console.log(uuid);
        res.status(200).json({
            "uuidv4": uuid,
            "uuidv1": uuid2
        });

    });

    app.use('/users', Users_router);

    app.get("*", (req, res) => {
        res.status(400).json({
            "Invalid Url": true
        });
    });
};