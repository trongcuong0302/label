const Model = require('../model/baseModel');
const APIException = require('../libs/APIException');

class CRUD {
    constructor() {
        this.model = new Model();
    }

    getAllItem = async(req) => {
        let filter = JSON.parse(req.query.filter);
        // let filter = {};
        const items = await this.model.findAll(filter);
        if (!items.data) {
            throw new APIException(400, "Can not find any items in the database")
        }
        return items;
    }

    getAnItem = async(request) => {
        let queryDb = { key: "_id", value: request.params.id };
        const item = await this.model.findAnItem(queryDb);
        if (!item.data) {
            throw new APIException(404, "Not Found");
        }
        return item;
    }

    postAnItem = async(request) => {
        let checkedData = await this.dataValidation(request.body);
        if (checkedData) {
            await this.model.insertAnItem(checkedData);
            let response = { data: checkedData };
            return response;
        } else {
            throw new APIException(400, "Invalid data");
        }
    }

    updateItemById = async(request) => {
        let checkedData = await this.dataValidation(request.body);

        if (checkedData) {
            const item = await this.model.updateById(request.params.id, checkedData);
            if (item.matchedCount) {
                let response = { data: checkedData };
                return response;
            } else {
                throw new APIException(404, "Not Found");
            }
        } else {
            throw new APIException(400, "Invalid data");
        }
    }

    deleteItemById = async(request) => {
        const item = await this.model.deleteById(request.params.id);
        if (item.deletedCount) {
            let message = { message: `Document with id ${request.params.id} has been deleted` };
            return message;
        } else {
            throw new APIException(404, "Not Found");
        }
    }

}

module.exports = CRUD;