const FindCtl = require("../controllers/Find.controller");
const InsertCtl = require("../controllers/Insert.controller");
const UpdateCtl = require("../controllers/Update.controller");
const DeleteCtl = require("../controllers/Delete.controller");

module.exports = app => {
	app.get("/:collection/findAll", FindCtl.findAll);
	app.get("/:collection/find/:id", FindCtl.findGet);
	app.post("/:collection/find/", FindCtl.findPost);

	app.get("/:collection/insertOne/:id", InsertCtl.insertOneGet);
	app.post("/:collection/insertOne", InsertCtl.insertOnePost);
	app.post("/:collection/insert", InsertCtl.insertPost);
	app.post("/:collection/save", InsertCtl.save);

	app.post("/:collection/update", UpdateCtl.update);
	app.post("/:collection/updateOne", UpdateCtl.updateOne);
	app.post("/:collection/updateMany", UpdateCtl.updateMany);
	app.post("/:collection/findOneAndDelete", UpdateCtl.findOneAndDelete);
	app.post("/:collection/findOneAndUpdate", UpdateCtl.findOneAndUpdate);
	app.post("/:collection/findOneAndReplace", UpdateCtl.findOneAndReplace);

	app.get("/:collection/deleteOne/:id", DeleteCtl.deleteOneGet);
	app.get("/:collection/deleteMany/:id", DeleteCtl.deleteManyGet);
	app.post("/:collection/deleteOne", DeleteCtl.deleteOne);
	app.post("/:collection/deleteMany", DeleteCtl.deleteMany);

	//Default test route
	app.all("/test", (req, res) => {
		res.status(200).json({
			success: true
		});
	});

	app.get("*", (req, res) => {
		res.status(400).json({
			success: false,
			error: "InvalidURL"
		});
	});
};
