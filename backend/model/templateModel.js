const baseModel = require('./baseModel');
const mongo = require('mongodb');
const { Label, PrintDensity, PrintDensityName, Text, FontFamily, FontFamilyName, Barcode, BarcodeType, Spacing } = require('jszpl');


class templateModel extends baseModel {
    constructor() {
        super();
        this.collection = this.db.collection('template');
    }

    generateZPLCode(data) {
        const label = new Label();
        label.printDensity = new PrintDensity(PrintDensityName[`${data.dpmm}dpmm`]);
        label.width = data.width * 25.4;
        label.height = data.height * 25.4;

        data.textTemplate.forEach(textField => {
            const text = new Text();
            label.content.push(text);
            if (textField.textSize == 11) text.fontFamily = new FontFamily(FontFamilyName.A);
            else text.fontFamily = new FontFamily(FontFamilyName.D);
            text.text = textField.textContent;
            text.left = textField.positionX;
            text.top = textField.positionY + 10;
            text.characterHeight = textField.textSize - 11;
        });

        data.barcodeTemplate.forEach(barcodeField => {
            const barcode = new Barcode();
            label.content.push(barcode);
            barcode.type = new BarcodeType(barcodeField.bcType);
            barcode.subset = "B";
            barcode.data = barcodeField.bcValue;
            barcode.left = barcodeField.positionX;
            barcode.top = barcodeField.positionY + 10;
            barcode.width = barcodeField.bcWidth;
            barcode.height = barcodeField.bcHeight;
        });

        let zpl = label.generateZPL();

        zpl = zpl.replace(/\n/g, "");
        return zpl;
    }

    insertAnItem(data) {
        let input = {
            dpmm: data.dpmm,
            height: data.height,
            width: data.width,
            barcodeTemplate: data.barcode,
            textTemplate: data.text
        }
        data.zplCode = this.generateZPLCode(input);
        let date = new Date();
        data.createdDate = date;
        data.modifiedDate = date;
        return this.collection.insertOne(data);
    }

    updateById(id, data) {
        let input = {
            dpmm: data.dpmm,
            height: data.height,
            width: data.width,
            barcodeTemplate: data.barcode,
            textTemplate: data.text
        }
        data.zplCode = this.generateZPLCode(input);
        let date = new Date();
        data.modifiedDate = date;
        const updateDoc = { $set: data };
        return this.collection.updateOne({ _id: mongo.ObjectId(id) }, updateDoc);
    }
}

module.exports = templateModel;