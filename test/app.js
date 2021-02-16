"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comparePdf = require('../functions/comparePdf');
const chai = require('chai');
const expect = chai.expect;

const app = express_1.default();
const port = 3002;

// async function CompareFiles() {
 
//     console.log("Compare Files start");
//    return( await Promise.resolve new comparePdf()
//         .actualPdfFile('NotSame.pdf')
//         .baselinePdfFile('baseline.pdf')
//         .compare('byImage'))
// }

async function CompareFiles(query){
    const comparisonResults = await new comparePdf()
    .actualPdfFile(query["actualPdfFile"])
    .baselinePdfFile(query["baselinePdfFile"])
    .compare(); 
return comparisonResults.status;   
 
}

function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;
  
    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
  
    return result;
  }

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
 }) 

app.get('/PDFCompare', async (req, res) => {
    try{
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        const result = await CompareFiles(query)
        
        res.send(result);
    }
    catch(err)
    {
        console.log(err)
    }
 
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map