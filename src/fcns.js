const db = require("../connect");

//All resused functions
exports.init = collection => {
	const dbs = db.get();
	const coll = dbs.collection(collection);
	return coll;
};

exports.constOutputArr = (result, res) => {
	result.toArray(function(err, docs) {
		sendData(docs, res);
	});
};

const sendData = (data, res) => {
	res.status(200).send(data);
};

exports.sendData = sendData;

exports.sendDataJSON = (data, res) => {
	res.status(200).json(data);
};

exports.sendSuccessData = (data, res) => {
	res.status(200).json({
		success: true,
		data: data
	});
};

exports.sendError = (status, err, res) => {
	res.status(status).json({
		success: false,
		error: err
	});
};

exports.sendSuccess = res => {
	res.status(200).json({
		success: true
	});
};

exports.sendFail = res => {
	res.status(500).json({
		success: false
	});
};

exports.logs = data => {
	console.log("[]" + data);
};
