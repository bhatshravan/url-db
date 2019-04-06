const db = require('../../db');
const bcrypt = require("bcrypt");
const Schema = require('mongoose').Schema;

// db.users.createIndex( { "email": 1 }, { unique: true } )
// db.dropDatabases
// db.users.find().pretty()
// db.users.remove({})

var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	projectList: [{
		projectID: {
			type: String,
		},
		role: {
			type: String,
			enum: ["DEV", "CUSTOMER", "READONLY"]
		},
		permission: {
			type: String
		}
	}]
}, {
	timestamps: true
});

UserSchema.statics.authenticate = (email, password, callback) => {
	User.findOne({
		email: email
	}).exec((err, user) => {
		if (err) {
			console.log("Error in auth");
			return callback(err);
		} else if (!user) {
			var err2 = new Error("User not found");
			err2.status = 401;
			return callback(err2);
		}
		bcrypt.compare(password, user.password, (err, result) => {
			if (result === true) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
};

UserSchema.pre("save", function (next) {
	var user = this;
	bcrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

var User = db.model("User", UserSchema);
module.exports = User;