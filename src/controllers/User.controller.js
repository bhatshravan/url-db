const User = require('../models/User.model');
const Fcn = require('../fcns');

exports.register = (req, res) => {
	if (req.body.email && req.body.password) {
		var UserData = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name
		};
		Fcn.logs(UserData + " registered");

		User.create(UserData, function (err, user) {
			if (err) {
				Fcn.sendError("500", "Insertion error" + err, req, res);
			} else {
				Fcn.sendJSON("No error,successfully inserted", req, res);
			}
		});
	} else {
		var error = "Missing login data";
		Fcn.logs(req.body.email);
		Fcn.sendError(403, error, req, res);
	}
};

exports.authenticate = (req, res) => {
	if (req.body.email && req.body.password) {
		var user = req.body.email;
		var passwd = req.body.password;

		Fcn.logs(user + " tried to log in");


		User.authenticate(user, passwd, (err, user) => {
			if (err || !user) {
				var error = new Error("Wrong email or password\n" + err);
				Fcn.sendError(500, "Wrong email or password", req, res);
			} else {
				Fcn.sendSuccess(req, res);
			}
		});
	} else {
		var error = "Please enter username and password";
		Fcn.logs(req.body.email);
		Fcn.sendError(403, error, req, res);
	}
};