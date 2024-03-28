const CSV = require("../.././models/cvs.model");
const path = require("path");
const csvtojson = require("csvtojson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { leadsObject } = require('../../../interface/leadsSchemaObject');
const { debugHttpRequestBody, debugHttpResponse,debugHttpError } = require("../../utils/debug");

/**
 * CSV Extractor
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

exports.extractLeads = async (req, res, next) => {
 
  try {
    debugHttpRequestBody(`req.body`, req.body);
    var { headers, csvId } = req.body;
    const csv = await CSV.findOne({ _id: mongoose.Types.ObjectId(csvId) }).exec();
    // const unsubscribers = await Unsubscribe.find({ user: req.user }).exec();
    const csvName = csv._id;
    const isHeader = csv.isHeader;
    const csvFilePath = "./src/uploads/" + csv.file;
    var jsonArray = [];
    // If CSV contains the headers, replace CSV header row with mapped headers row
    var array = [];
    if (isHeader) {
      jsonArray = await csvtojson({
        noheader: false,
      }).fromFile(csvFilePath);

      jsonArray.map((item, i) => {
        var newObj = {};
        headers.map((keymap, index) => {
          newObj[keymap.key] = item[keymap.value];
        });
        array.push(newObj);
      });
    }
    // If CSV doesn't contain headers, add the mapped headers row to the CSV headers
    if (!isHeader) {
      jsonArray = await csvtojson({
        noheader: true,
      }).fromFile(csvFilePath);
      jsonArray.map((item, i) => {
        var newObj = {};
        headers.map((keymap, index) => {
          newObj[keymap.key] = item[keymap.value];
        });
        array.push(newObj);
      });
    }

    var establishedModels = {};
    function createModelForLeads(name) {
      if (!(name in establishedModels)) {
        var Leads = new Schema(leadsObject, { timestamps: true });
        establishedModels[name] = mongoose.model(name, Leads);
      }
      return establishedModels[name];
    }
    if (array[0].phone1 == null && array[0].email == null) {
      return res.send({
        code: 404,
        message: "Please select either phone or email.",
      });
    }
    const LeadsModel = createModelForLeads(`${csvName.toString()}s`);
    const data = await LeadsModel.insertMany(array);
    await csv.save()
    debugHttpResponse(`res`,data);

    return res.send({
      code: 200,
      message: "CSV has been created successfully.",
      leads: data,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Retrieve a list leads from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
exports.list = async (req, res, next) => {
  
  try {
    debugHttpRequestBody(`req.body`, req.body);
    const filters={}  
    const id = req.params.id;
    let {page,limit,withEmail,withSignature,withPhone,withoutSignature} = req.query;


    if(withPhone=="true") {
      filters.phone1={ $nin: [ null, ""," " ] }
    } 
    if(withEmail=="true") {
      filters.email={ $nin: [ null, ""," " ] }
    } 
    if(withSignature=="true") {
      filters.is_signed=1
    } 
    if(withoutSignature=="true" ){
      filters.is_signed=0
    }  

    const mongoose = require("mongoose");

    const MyModel = mongoose.connection.model(
      `${id}`,
      new mongoose.Schema({}, { strict: false }),
      `${id}`
    );
  limit = limit ?? 20
  page = page ?? 1 

  const total = await MyModel.aggregate([
      {$match:filters},
   ])   
   const docs = await MyModel.aggregate([
      {$match:filters},
      {$skip:limit*(page-1)},
      {$limit:limit},
   ])
   debugHttpResponse(`res`,docs);
    return res.send({
      code: 200,
      message: "retrieved successfully.",
      data: docs,
      pagination: {
          page,
          limit,
          total: total.length,
          pages: Math.ceil(total.length / limit) <= 0
              ? 1
              : Math.ceil(total.length / limit),
        },
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Update a record of leads in database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {JSON}
 */
exports.update = async (req, res, next) => {

  
  try {
    debugHttpRequestBody(`req.body`, req.body);
    const {csvId,leadId,update}=req.body

    const mongoose = require("mongoose");

    const MyModel = mongoose.connection.model(
      `${csvId}`,
      new mongoose.Schema({}, { strict: false }),
      `${csvId}`
    );

  const updated = await MyModel.findByIdAndUpdate(leadId,update)   
    if(!updated){
    throw new Error('something went wrong please try again later')
    }
    debugHttpResponse(`res`,updated);

    return res.send({
      code: 200,
      message: "updated successfully.",
      updated
    });
  } catch (error) {
    next(error);
  }
};
/**
 * delete a record of leads in database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

exports.delete = async (req, res, next) => {
  try {
    debugHttpRequestBody(`req.body`, req.body);
    const {csvId,leadId}=req?.body

    const mongoose = require("mongoose");

    const MyModel = mongoose.connection.model(
      `${csvId}`,
      new mongoose.Schema({}, { strict: false }),
      `${csvId}`
    );

   await MyModel.findByIdAndDelete(leadId)   
    return res.send({
      code: 200,
      message: "deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};