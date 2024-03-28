const Campaign = require("../../models/campaign.model");
const mongoose = require("mongoose");
const sendMessages = require("../../helpers/sendMessages");
const { debugHttpResponse } = require("../../utils/debug");
const conversationModel = require("../../models/conversation.model");
const Questionnaire = require("../../models/questionnaire.model");
const Template = require("../../models/template.model");
const { ObjectId } = mongoose.Types;

/**
 * Create a campaign
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.create = async (req, res, next) => {
  try {
    const {campaign,questionnaires} = req?.body;
    
    campaign.numbers = campaign.numbers.replace(/\s/g, "").replace(/\+/g, "");
    var newCampaign = await new Campaign(campaign);
    newCampaign.save();
    if(questionnaires?.length){
      questionnaires.forEach(async (element) => {
        const { templates, name, mainTemplateId } = element;
        const CreatedTemplate = await Template.insertMany(templates);
        const altQuistionnaire = await new Questionnaire({ name: name });
        altQuistionnaire.templateId = CreatedTemplate.map((item) => item._id);
        altQuistionnaire.save();
        const altCampaign = await new Campaign({name:`alternate ${newCampaign.name}`,numbers:newCampaign.numbers,questionnaire:altQuistionnaire._id,leads:newCampaign.leads,flow:0});
        altCampaign.save()
        await Template.findByIdAndUpdate(mainTemplateId,{alternateCampaign:altCampaign._id})
      });
      
    }
    res.status(200).send({
      message: "campaign created",
      created: newCampaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve a list of campaigns from the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.list = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    limit = limit ?? 10;
    page = page ?? 1;
    const total = await Campaign.find({status:0});
    const AllCampaigns = await Campaign.find({status:0,flow:1})
      .populate("questionnaire")
      .populate("leads")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: "descending" });
  
    debugHttpResponse(`res`, AllCampaigns);
    if(!AllCampaigns.length){
      return  res.status(200).send({
        message: "no inactive campaigns"
      });
    }
    res.status(200).send({
      AllCampaigns,
      message: "got all campaigns",
      pagination: {
        page,
        limit,
        total: total.length,
        pages:
          Math.ceil(total.length / limit) <= 0
            ? 1
            : Math.ceil(total.length / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Launch Compaign
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.launch = async (req, res, next) => {
  try {
    let { id } = req.params;
    var data = await Campaign.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: "questionnaires",
          localField: "questionnaire",
          foreignField: "_id",
          as: "questionnaires",
        },
      },
      { $unwind: "$questionnaires" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { campaign:"$name",
                template:"$questionnaires.templateId" ,
                number:"$numbers",
                csvId:"$leads",
                _id:"$_id",
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "templates",
          localField: "template",
          foreignField: "_id",
          as: "template",
        },
      },
    ]);
    if (!data || !data.length) {
      throw new Error("campaign not found");
    }
    
      const leadsModel = mongoose.connection.model(
       `${data[0].csvId.toString()}s`,
       new mongoose.Schema({}, { strict: false }),
       `${data[0].csvId.toString()}s`
     );
      const leads = await leadsModel.find({})
      debugHttpResponse(`res`, leads);
      for(item of leads){
        if(item?.phone1){
          let payload={"messaging_product":"whatsapp","to":`${item?.phone1?.replace(/\./g, '')}`,"type":"template","template":{"name":`${data[0]?.template[0]?.text}`,"language":{"code":"en_GB"},"components":[{"type":"header","parameters":[{"type":"text","text":`${item?.firstname}`}]},{"type":"body","parameters":[{"type":"text","text":`${item?.firstname}`}]}]}}
           const messageId =await sendMessages(data[0]?.template[0]?.text,data[0]?.number,item?.firstname,item?.lastname,payload)
           const conversation = new conversationModel({campaignId:data[0]._id,leadId:item._id,templateId:data[0].template[0]._id,sender:data[0].number,reciever:item.phone1.replace(/\./g, ''),messageId:messageId,type:"template",state:''})
           await conversation.save()
           await Campaign.findByIdAndUpdate(id,{status:1})
        }
      }

    res.status(200).send({
      data,
      message: "campaign launched successfully",
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Retrieve a list of Active campaigns from the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.listActive = async (req, res, next) => {
  try {
    const activeCompaigns = await Campaign.find({status:1});
   
    debugHttpResponse(`res`, activeCompaigns);

    res.status(200).send({
      activeCompaigns,
      message: "got all campaigns",
    });
  } catch (error) {
    next(error);
  }
};