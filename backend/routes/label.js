const express = require("express");
const router = express.Router();
const Label = require('../controller/labelController');
const handleResponse = require('../libs/handleResponse');

router.get("/", function(req, res) {
    const label = new Label();
    handleResponse(req, res, label.getAllItem);
});

router.get("/:id", function(req, res) {
    const label = new Label();
    handleResponse(req, res, label.getAnItem);
});

router.post("/", function(req, res) {
    const label = new Label();
    handleResponse(req, res, label.postAnItem);
});

router.post("/generate", function(req, res) {
    const label = new Label();
    handleResponse(req, res, label.generateAnItem);
});

router.put("/:id", function(req, res) {
    const label = new Label();
    handleResponse(req, res, label.updateItemById);
});

router.delete("/:id", function(req, res) {
    const label = new Label();
    handleResponse(req, res, label.deleteItemById);
});

module.exports = router;