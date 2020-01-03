const fcns = require("../fcns");

exports.findOneAndDelete = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let pArr = req.body;

	if (pArr.urlDbQuery === undefined) {
		pArr.urlDbQuery = {};
	}
	if (pArr.urlDbOptions === undefined) {
		pArr.urlDbOptions = {};
	}
	collection.findOneAndDelete(pArr.urlDbQuery, pArr.urlDbOptions, (err, result) => {
		sendResponse(err, result, res);
	});
};

exports.findOneAndReplace = (req, res) => {
	findOnes(req, res, "findOneAndReplace");
};

exports.findOneAndUpdate = (req, res) => {
	findOnes(req, res, "findOneAndUpdate");
};

exports.update = (req, res) => {
	updates(req, res, "update");
};

exports.updateOne = (req, res) => {
	updates(req, res, "updateOne");
};

exports.updateMany = (req, res) => {
	updates(req, res, "updateMany");
};

const updates = (req, res, input) => {
	let pArr = req.body;

	const collection = fcns.init(req.params.collection);
	if (pArr.urlDbUpdate === undefined) {
		fcns.sendError(500, "Missing urlDbUpdate value", res);
	} else {
		if (pArr.urlDbQuery === undefined) {
			pArr.urlDbQuery = {};
		}
		if (pArr.urlDbOptions === undefined) {
			pArr.urlDbOptions = { returnOriginal: false };
		}

		if (input == "update") {
			collection.update(
				pArr.urlDbQuery,
				pArr.urlDbUpdate,
				pArr.urlDbOptions,
				(err, result) => {
					sendResponse(err, result, res);
				}
			);
		}

		if (input == "updateOne") {
			collection.update(
				pArr.urlDbQuery,
				pArr.urlDbUpdate,
				pArr.urlDbOptions,
				(err, result) => {
					sendResponse(err, result, res);
				}
			);
		}

		if (input == "updateMany") {
			collection.update(
				pArr.urlDbQuery,
				pArr.urlDbUpdate,
				pArr.urlDbOptions,
				(err, result) => {
					sendResponse(err, result, res);
				}
			);
		}
	}
};

const findOnes = (req, res, input) => {
	const collection = fcns.init(req.params.collection);
	let pArr = req.body;

	if (pArr.urlDbUpdate === undefined) fcns.sendError(500, "Missing urlDbUpdate value", res);
	else {
		if (pArr.urlDbQuery === undefined) {
			pArr.urlDbQuery = "{}";
		}

		if (pArr.urlDbOptions === undefined) pArr.urlDbOptions = { returnOriginal: false };

		if (input == "findOneAndReplace") {
			collection.findOneAndReplace(
				pArr.urlDbQuery,
				pArr.urlDbUpdate,
				pArr.urlDbOptions,
				(err, result) => {
					sendResponse(err, result, res);
				}
			);
		}
		if (input == "findOneAndUpdate") {
			console.log("====================================");
			console.log(input);
			console.log("====================================");
			collection.findOneAndUpdate({}, pArr.urlDbUpdate, pArr.urlDbOptions, (err, result) => {
				sendResponse(err, result, res);
			});
		}
	}
};

const sendResponse = (err, result, res) => {
	if (err) {
		fcns.sendError(500, err, res);
	} else {
		fcns.sendSuccessData(result, res);
	}
};
