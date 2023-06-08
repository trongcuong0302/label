const CRUD = require('./baseController');
const templateModel = require('../model/templateModel');
const APIException = require('../libs/APIException');

class templateController extends CRUD {
    constructor() {
        super();
        this.model = new templateModel;
    }

    dataValidation = (data) => {
        let checkedData = {};
        let requiredFields = ['templateName', 'labelName', 'height', 'width', 'dpmm'];
        let ignoredFields = ['_id', 'modifiedDate', 'createdDate'];
        for (const property in data) {
            if (requiredFields.includes(property) && !data[property]) {
                return false;
            }
            if (ignoredFields.includes(property)) continue;
            checkedData[property] = data[property];
        }
        return checkedData;
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