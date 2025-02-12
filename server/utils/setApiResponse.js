// const { response } = require("express");

setApiResponse = (status, responseFlag, errorFlag, details, res) => {
    let response = {
        result: responseFlag,
    };

    if (errorFlag) {
        response.msg = details;
    } else {
        response.data = details;
    }

    return res.status(status).json(response);
};

module.exports = setApiResponse;
