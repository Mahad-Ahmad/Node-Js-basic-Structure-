const CSV = require('../../models/cvs.model')
const csvtojson=require('csvtojson');
var path = require('path');
const { leadsObject } = require('../../../interface/leadsSchemaObject');
const APIError = require("../../utils/APIError");
const { debugHttpRequestBody, debugHttpResponse,debugHttpError } = require("../../utils/debug");


/**
 * To Upload the csv file
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
exports.upload = async (req, res, next) => {
    try {
       
        debugHttpRequestBody(`req.body`, req.body);
        const csv = new CSV({
            name: req?.body?.name,
            file: req?.file?.filename,
            isHeader: req?.body?.isHeader,
        });
        const data = await csv.save();
        
        debugHttpResponse(`res`, data);
        return res.send({
            code: 200,
            message: 'CSV has been uploaded successfully.',
            data
        });
    } catch (error) {
        debugHttpError(error)
        next(error);
    }
}


/**
 * Retrieve a list Headers from the csv file
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
exports.csvHeaders = async (req, res, next) => {
    try {

        debugHttpRequestBody(`req.body`, req.body);
        const csvId = req.body.csvId;
        const csv = await CSV.findOne({ _id: csvId }).exec();
    
        if(!csv)
            new APIError({ message: "No csv found!", status: 400})

        const isHeader = csv.isHeader;
        const csvFilePath = path.join(__dirname,'../../uploads/'+csv.file);
        
        const headers = [];
        if (isHeader) {
            await csvtojson({
                trim: true,
                ignoreEmpty: true
            }).fromFile(csvFilePath)
                .on('header', header => headers.push(header));
            headers.push(Object.keys(leadsObject))

        }
        if (!isHeader) {
            const jsonArray = await csvtojson({
                noheader: true,
                ignoreEmpty: true
            }).fromFile(csvFilePath);
            let headerFields = {};
            headerFields = jsonArray[0];
            headers.push(Object.keys(headerFields));
        }
        debugHttpResponse(`res`, headers);
        return res.send({
            code: 200,
            message: 'have been retrieved successfully.',
            data: headers
        })
    } catch (error) {
        next(error);
    }
}


/**
 * Retrieve a list CSV's from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
exports.list = async (req, res, next) => {
    try {

        debugHttpRequestBody(`req.body`, req.body);
        const data = await CSV.aggregate([
            {
                $sort: { createdAt: -1}
            }
        ])

        if(!data)
            new APIError({ message: "Records not found!", status: 400})

        debugHttpResponse(`res`, data);
        return res.send({
            code: 200,
            message: 'Csv list retrieved successfully.',
            data
        })
    } catch (error) {
        next(error);
    }
}




