const express = require("express");
const router = express.Router();
const Template = require('../controller/templateController');
const handleResponse = require('../libs/handleResponse');

router.get("/", function(req, res) {
    const template = new Template();
    handleResponse(req, res, template.getAllItem);
});

router.get("/:id", function(req, res) {
    const template = new Template();
    handleResponse(req, res, template.getAnItem);
});

router.post("/", function(req, res) {
    const template = new Template();
    handleResponse(req, res, template.postAnItem);
});

router.post("/generate", function(req, res) {
    const template = new Template();
    handleResponse(req, res, template.generateZPLCode);
});

router.put("/:id", function(req, res) {
    const template = new Template();
    handleResponse(req, res, template.updateItemById);
});

router.delete("/:id", function(req, res) {
    const template = new Template();
    handleResponse(req, res, template.deleteItemById);
});

module.exports = router;