const ObjectId = require("mongodb").ObjectId;
const fcns = require("../fcns");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

exports.findAll = (req, res) => {
	const collection = fcns.init(req.params.collection);
	let result = collection.find({});
	fcns.constOutputArr(result, res);
};

exports.findGet = (req, res) => {
	let pArr = {},
		pArgs = {};

	const params = entities.decode(req.params.id).split("&");

	params.map(ele => {
		let pSplit = ele.split("=");
		pArr[pSplit[0]] = p2;
	});
	pArr = changeVal(pArr);

	pArgs.urlDbN = pArr.urlDbN === undefined ? 0 : Number(pArr.urlDbN);
	pArgs.urlDbSkip = pArr.urlDbSkip === undefined ? 0 : Number(pArr.urlDbSkip);
	pArgs.urlDbSort = {};

	if (pArr.urlDbSort != undefined) {
		let pSplit = pArr.urlDbSort;
		pSplit = pSplit.split(",");
		pSplit.map(ele => {
			let pSplit2 = ele.split(":");
			try {
				pArgs.urlDbSort[pSplit2[0]] = Number(pSplit2[1]);
			} catch (err) {
				pArgs.urlDbSort[pSplit2[0]] = pSplit2[1];
			}
		});
	}
	checkLimitSkip(pArr, pArgs, req, res);
};

exports.findPost = (req, res) => {
	let pArr = {},
		pArgs = {};

	pArr = changeVal(pArr);

	pArr = req.body.urlDbData === undefined ? req.body : req.body.urlDbData;

	pArgs.urlDbN = req.body.urlDbN === undefined ? 0 : Number(req.body.urlDbN);
	pArgs.urlDbSkip = req.body.urlDbSkip === undefined ? 0 : Number(req.body.urlDbSkip);
	pArgs.urlDbSort = req.body.urlDbSort === undefined ? {} : req.body.urlDbSort;

	checkLimitSkip(pArr, pArgs, req, res);
};

const checkLimitSkip = (pArr, pArgs, req, res) => {
	const collection = fcns.init(req.params.collection);
	delete pArr.urlDbSkip;
	delete pArr.urlDbN;
	delete pArr.urlDbSort;

	fcns.constOutputArr(
		collection
			.find(pArr)
			.limit(pArgs.urlDbN)
			.skip(pArgs.urlDbSkip)
			.sort(pArgs.urlDbSort),
		res
	);
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
