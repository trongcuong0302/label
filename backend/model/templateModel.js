const baseModel = require('./baseModel');
const { Label, PrintDensity, PrintDensityName, Spacing, Text, FontFamily, FontFamilyName, Barcode, BarcodeType, BarcodeTypeName } = require('jszpl');


class templateModel extends baseModel {
    constructor() {
        super();
        this.collection = this.db.collection('template');
    }

    generateTemplate(data) {
        const label = new Label();
        label.printDensity = new PrintDensity(PrintDensityName[`${data.dpmm}dpmm`]);
        label.width = data.width * 25.4;
        label.height = data.height * 25.4;

        data.textTemplates.forEach(textField => {
            const text = new Text();
            label.content.push(text);
            if (textField.textSize == 11) text.fontFamily = new FontFamily(FontFamilyName.A);
            else text.fontFamily = new FontFamily(FontFamilyName.D);
            text.text = textField.textContent;
            text.left = textField.positionX;
            text.top = textField.positionY;
            text.characterHeight = textField.textSize - 11;
        });

        data.barcodeTemplates.forEach(barcodeField => {
            const barcode = new Barcode();
            label.content.push(barcode);
            barcode.type = new BarcodeType(barcodeField.bcType);
            barcode.subset = "B";
            barcode.data = barcodeField.bcValue;
            barcode.left = barcodeField.positionX;
            barcode.top = barcodeField.positionY;
            barcode.width = barcodeField.bcWidth;
            barcode.height = barcodeField.bcHeight;
        });

        let zpl = label.generateZPL();

        zpl = zpl.replace(/\n/g, "");
        return zpl;
    }
}

module.exports = templateModel;