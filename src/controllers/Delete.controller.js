const fcns = require("../fcns");

exports.deleteOneGet = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let pArr = {};

	const params = req.params.id.split("&");

	params.map(ele => {
		let pSplit = ele.split("=");
		let p1 = pSplit[0];
		let p2 = pSplit[1];
		pArr[p1] = p2;
	});
	collection.deleteOne(pArr, (err, result) => {
		console.log(result.insertedCount);
		if (err) {
			fcns.sendError(500, err, res);
		} else {
			fcns.sendSuccessData(result.deletedCount, res);
		}
	});
};

exports.deleteManyGet = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let pArr = {};

	const params = req.params.id.split("&");

	params.map(ele => {
		let pSplit = ele.split("=");
		let p1 = pSplit[0];
		let p2 = pSplit[1];
		pArr[p1] = p2;
	});
	collection.deleteMany(pArr, (err, result) => {
		console.log(result.insertedCount);
		if (err) {
			fcns.sendError(500, err, res);
		} else {
			fcns.sendSuccessData(result.deletedCount, res);
		}
	});
};

exports.deleteOne = (req, res) => {
	deletes(req, res, "deleteOne");
};

exports.deleteMany = (req, res) => {
	deletes(req, res, "deleteMany");
};

const deletes = (req, res, input) => {
	const collection = fcns.init(req.params.collection);
	let pArr = {};
	let options;
	if (req.body.urlDbOptions === undefined) {
		options = {};
		if (req.body.urlDbQuery === undefined) pArr = req.body;
		else pArr = req.body.urlDbQuery;
	} else {
		options = req.body.urlDbOptions;
		pArr = req.body.urlDbQuery;
	}

	if (input === "deleteOne") {
		collection.deleteOne(pArr, options, (err, result) => {
			sendResponse(err, result, res);
		});
	}
	if (input === "deleteMany") {
		collection.deleteMany(pArr, options, (err, result) => {
			sendResponse(err, result, res);
		});
	}
};

function sendResponse(err, result, res) {
	if (err) {
		fcns.sendError(500, err, res);
	} else {
		fcns.sendSuccessData(result.deletedCount, res);
	}
}
