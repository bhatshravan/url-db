exports.sendJSON = (data, req, res) => {
    res.status(200).json({
        "success": true,
        "data": data
    });
};

exports.sendError = (sta, err, req, res) => {
    res.status(sta).json({
        "success": false,
        "error": err
    });
};

exports.sendSuccess = (req, res) => {
    res.status(200).json({
        "success": true
    });
};

exports.sendFail = (req, res) => {
    res.status(500).json({
        "success": false
    });
};

exports.logs = (data) => {
    console.log('[]' + data);
};