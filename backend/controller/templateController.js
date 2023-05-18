const CRUD = require('./baseController');
const templateModel = require('../model/templateModel');
const APIException = require('../libs/APIException');

class templateController extends CRUD {
    constructor() {
        super();
        this.model = new templateModel;
    }

    dataValidation = (data) => {
        return data;
    }

    generateZPLCode = (req) => {
        let response = this.model.generateZPLCode(req.body);
        if (response) {
            return { data: response };
        } else {
            throw new APIException(400, "Invalid data");
        }
    }
}

module.exports = templateController;