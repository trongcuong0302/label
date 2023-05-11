const CRUD = require('./baseController');
const labelModel = require('../model/labelModel');
const APIException = require('../libs/APIException');

class labelController extends CRUD {
    constructor() {
        super();
        this.model = new labelModel;
    }

    dataValidation = (data) => {
        return data;
    }

    generateAnItem = async(req) => {
        let response = await this.model.generateLabel(req.body);
        if (response) {
            return { data: response };
        } else {
            throw new APIException(400, "Invalid data");
        }
    }
}

module.exports = labelController;