const ObjectId = require("mongodb").ObjectId;
const fcns = require("../fcns");
const db = require("../../connect");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

exports.findAll = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let result = collection.find({});
	fcns.constOutputArr(result, res);
};

exports.findGet = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let pArr = {};

	const params = entities.decode(req.params.id).split("&");

	params.map(ele => {
		let pSplit = ele.split("=");
		let p1 = pSplit[0];
		let p2 = pSplit[1];
		pArr[p1] = p2;
	});
	pArr = changeVal(pArr);
	checkLimitSkip(collection, pArr, res);
};

exports.findPost = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let pArr = {};
	if (req.body.urlDbData === undefined) {
		pArr = req.body;
	} else {
		pArr = req.body.urlDbData;
	}

	pArr = changeVal(pArr);

	if (req.body.urlDbN != undefined) {
		pArr.urlDbN = req.body.urlDbN;
	}
	if (req.body.urlDbSkip != undefined) {
		pArr.urlDbSkip = req.body.urlDbSkip;
	}
	console.log(pArr);
	checkLimitSkip(collection, pArr, res);
};

const checkLimitSkip = (collection, pArr, res) => {
	if (pArr.urlDbN === undefined) {
		if (pArr.urlDbSkip === undefined) {
			fcns.constOutputArr(collection.find(pArr), res);
		} else {
			const skip = Number(pArr.urlDbSkip);
			delete pArr.urlDbSkip;
			fcns.constOutputArr(collection.find(pArr).skip(skip), res);
		}
	} else {
		const limit = Number(pArr.urlDbN);
		delete pArr.urlDbN;
		if (pArr.urlDbSkip === undefined) {
			fcns.constOutputArr(collection.find(pArr).limit(limit), res);
		} else {
			const skip = Number(pArr.urlDbSkip);
			delete pArr.urlDbSkip;
			fcns.constOutputArr(
				collection
					.find(pArr)
					.limit(limit)
					.skip(skip),
				res
			);
		}
	}
};

function changeVal(data) {
	for (var i in data) {
		if (typeof data[i] == "object") changeVal(data[i]);
		if (i === "_id") {
			let o_id = new ObjectId(data[i]);
			data[i] = o_id;
		}
	}
	return data;
}
