const mongo = require("mongodb").MongoClient;
let db = null;

const config = require("./config");

module.exports.connect = () => {
	mongo.connect(
		config.mongodb_url,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		(err, client) => {
			console.error.bind(err);
			if (err) {
				console.error(err);
				console.log("Not connected");
				process.exit(1);
				return err;
			}
			db = client.db(config.mongodb_db);
			console.log("MongoDB connected: " + config.mongodb_url + "/" + config.mongodb_db);
		}
	);
};

module.exports.get = () => {
	return db;
};
