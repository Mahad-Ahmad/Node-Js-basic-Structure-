// __ __  Controller has  __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

const APIError = require("../../utils/APIError");
const {
  debugHttpRequestBody,
  debugHttpResponse,
} = require("../../utils/debug");
const Conversation = require("../../models/conversation.model");
const validateReply = require("../../validations/validateReply");
const mongoose = require("mongoose");
const templateModel = require("../../models/template.model");
const sendMessages = require("../../helpers/sendMessages");
const campaignModel = require("../../models/campaign.model");
const questionnaireModel = require("../../models/questionnaire.model");
const { ObjectId } = mongoose.Types;

/**
 * Display  list cpnversations in a campaign.
 * @param {JSON} req
 * @param {JSON} res
 * @param {Callback} next
 * @returns {JSON}
 */
exports.campaignConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    debugHttpRequestBody(`req.body`, req.params);
    let conversations = await Conversation.aggregate([
      { $match: { campaignId: ObjectId(id) } },
    ]);
    debugHttpResponse(`res`, conversations);
    if (!conversations.length) {
      return res.status(500).send({
        message: "cnoversation does not exist",
      });
    }
    return res.status(200).send({
      message: "request successful",
      conversations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Store a newly created resource in storage.
 * @param {JSON} req
 * @param {JSON} res
 * @param {callback} next
 * @returns {JSON}
 */
exports.store = async (req, res, next) => {
  try {
    debugHttpRequestBody(`req.body`, req.body);
    // destructuring payload recieved
    let payload = req?.body?.input;
    if (payload?.entry[0]?.changes[0]?.value?.statuses?.length) {
      const { id, status } = payload?.entry[0].changes[0].value.statuses[0];
      await Conversation.findOneAndUpdate({ messageId: id }, { state: status });
    }
    var { value } = payload.entry[0].changes[0];
    var filter = {
      sender: value?.metadata?.display_phone_number,
      reciever: value?.messages[0]?.from,
    };
    // check if this conversation is from our campaign
    var allConversation = await Conversation.find(filter);
    var lastConversation = allConversation[allConversation.length - 1];
    if (allConversation?.length && lastConversation?.status) {
      // getting all of the needed information for next step (dont remove var THESE OBJECTS ARE NEEDED IN FUNCTIONAL SCOPE)
      var lastTemplateUsed = await templateModel.findById(
        lastConversation.templateId
      );
      var campaign = await campaignModel.findById(lastConversation.campaignId);
      var questionnaire = await questionnaireModel.findById(
        campaign.questionnaire
      );
      const leadsModel = mongoose.connection.model(
        `${campaign.leads.toString()}s`,
        new mongoose.Schema({}, { strict: false }),
        `${campaign.leads.toString()}s`
      );
      var lead = await leadsModel.findById(lastConversation?.campaignId);
      // saving the conversation if the reply is for chatbot
      let reply =
          value?.messages[0]?.type  === "text"
          ? value.messages[0]?.text?.body?.toLowerCase()
          : req?.body?.filePath;
      const newConversation = {
        campaignId: lastConversation?.campaignId,
        leadId: lastConversation?.leadId,
        templateId: lastConversation?.templateId,
        sender: filter.reciever,
        reciever: filter.sender,
        reply: reply,
        type:value?.messages[0]?.type,
        messageId:value?.messages[0]?.id
      };
      var conversation = new Conversation(newConversation);
      await conversation.save();
      // validating the reply according to the last template sent from us
      const valid =
      value?.messages[0]?.type === "text"
          ? validateReply(conversation.reply, lastTemplateUsed.validations)
          : false;
      // if the reply is not valid
      if (!valid) {
        // re-send payload with template configuration if last template was facebook's template
        if (lastTemplateUsed.priorityBit === 1) {
          let payload = {
            messaging_product: "whatsapp",
            to: conversation?.sender,
            type: "template",
            template: {
              name: lastTemplateUsed.text,
              language: { code: "en_GB" },
              components: [
                { type: "header", parameters: [{ type: "text", text: ` ` }] },
                { type: "body", parameters: [{ type: "text", text: ` ` }] },
              ],
            },
          };
          const messageId = await sendMessages(
            lastTemplateUsed?.text,
            conversation?.reciever,
            lead?.firstname,
            lead?.lastname,
            payload
          );
          const newConversation = {
            campaignId: lastConversation.campaignId,
            leadId: lastConversation.leadId,
            templateId: lastConversation.templateId,
            sender: lastConversation.sender,
            reciever: lastConversation.reciever,
            messageId: messageId,
            type:"template",
            state:''
          };
          const resend = new Conversation(newConversation);
          await resend.save();
        } else {
          // if last template was not from facebook resend payload with text configuration
          let payload = {
            messaging_product: "whatsapp",
            to: conversation.sender,
            type: "text",
            text: {
              preview_url: false,
              body: lastTemplateUsed.text,
            },
          };
          const messageId = await sendMessages(
            lastTemplateUsed.text,
            conversation.reciever,
            lead?.firstname,
            lead?.lastname,
            payload
          );
          const newConversation = new Conversation({
            campaignId: lastConversation.campaignId,
            leadId: lastConversation.leadId,
            templateId: lastConversation.templateId,
            sender: lastConversation.sender,
            reciever: lastConversation.reciever,
            messageId: messageId,
            type:"text",
            state:''
          });
          await newConversation.save();
        }
      } else {
        // if reply is valid get the next template in line and send that to the lead
        if (
          lastTemplateUsed.validations.YesOrNo &&
          conversation.reply === "no"
        ) {
          const altCampaign = await campaignModel.findById(
            lastTemplateUsed.alternateCampaign
          );
          const altQuestionnaire = await questionnaireModel.findById(
            altCampaign.questionnaire
          );
          const altTemplate = await templateModel.findById(
            altQuestionnaire.templateId[0]
          );
          let payload = {
            messaging_product: "whatsapp",
            to: conversation.sender,
            type: "text",
            text: {
              preview_url: false,
              body: altTemplate.text,
            },
          };

          const messageId = await sendMessages(
            altTemplate.text,
            conversation.reciever,
            lead?.firstname,
            lead?.lastname,
            payload
          );
          const altConversation = new Conversation({
            campaignId: altCampaign._id,
            leadId: lastConversation.leadId,
            templateId: altTemplate._id,
            sender: lastConversation.sender,
            reciever: lastConversation.reciever,
            messageId: messageId,
            type:"text",
            state:''
          });
          await altConversation.save();
          return res.status(200).send({
            message: "request successful",
          });
        }
        if (
          lastTemplateUsed?.validations?.options?.active &&
          !lastTemplateUsed?.validations?.options[conversation.reply]
        ) {
          const text = "sorry the option you selected isnt eligible";
          let payload = {
            messaging_product: "whatsapp",
            to: conversation.sender,
            type: "text",
            text: {
              preview_url: false,
              body: text,
            },
          };
          const messageId = await sendMessages(
            text,
            conversation.reciever,
            lead?.firstname,
            lead?.lastname,
            payload
          );
          const newConversation = new Conversation({
            campaignId: lastConversation.campaignId,
            leadId: lastConversation.leadId,
            templateId: lastConversation.templateId,
            sender: lastConversation.sender,
            reciever: lastConversation.reciever,
            messageId: messageId,
            status: 0,
            type:"text",
            state:''
          });
          await newConversation.save();
          return res.status(200).send({
            message: "request successful",
          });
        }

        const nextTemplate = await templateModel.findById(
          questionnaire.templateId[lastTemplateUsed.priorityBit]
        );
        if (nextTemplate == null) {
          lastConversation.status = 0;
          lastConversation.save();
          return res.status(200).send({
            message: "questionnaire ended",
          }); // stop when the questionnaire is complete
        }
        let payload = {
          messaging_product: "whatsapp",
          to: conversation.sender,
          type: "text",
          text: {
            preview_url: false,
            body: nextTemplate.text,
          },
        };
        const messageId = await sendMessages(
          nextTemplate.text,
          conversation.reciever,
          lead?.firstname,
          lead?.lastname,
          payload
        );
        const nextConversation = new Conversation({
          campaignId: lastConversation.campaignId,
          leadId: lastConversation.leadId,
          templateId: nextTemplate._id,
          sender: lastConversation.sender,
          reciever: lastConversation.reciever,
          messageId: messageId,
          type:"text",
          state:'',
        });
        await nextConversation.save();
      }
    }

    debugHttpResponse(`res`, conversation);
    res.status(200).send({
      message: "request successful",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Display cpnversations with a specific lead.
 * @param {JSON} req
 * @param {JSON} res
 * @param {Callback} next
 * @returns {JSON}
 */
exports.leadConversation = async (req, res, next) => {
  try {
    const { leadId } = req.query;
    debugHttpRequestBody(`req.body`, req.query);
    let conversations = await Conversation.aggregate([
      { $match: { leadId: leadId } },
      { $sort: { createdAt: 1 } },
      {
        $lookup: {
          from: "templates",
          localField: "templateId",
          foreignField: "_id",
          as: "template",
        },
      },
      { $unwind: "$template" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                message: "$reply",
                status: "$state",
                sender: "$sender",
                reciever: "$reciever",
                type: "$type",
              },
              "$template",
            ],
          },
        },
      },
      {
        $project: {
          sender: 1,
          reciever: 1,
          status: 1,
          type: 1,
          message: { $ifNull: ["$message", "$text"] },
          createdAt: 1,
          validations: 1,
        },
      },
    ]);
    debugHttpResponse(`res`, conversations);
    if (!conversations.length) {
      return res.status(500).send({
        message: "cnoversation does not exist",
      });
    }
    return res.status(200).send({
      message: "request successful",
      conversations,
    });
  } catch (error) {
    next(error);
  }
};
