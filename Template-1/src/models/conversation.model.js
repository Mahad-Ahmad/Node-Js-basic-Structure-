const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup schema
var conversationSchema = new Schema({
    campaignId:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "campaign"
    },
    leadId:{type:String,required:true},
    templateId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "template"
      },
    sender:{type:String},
    reciever:{type:String},
    reply:{type:String},
    status:{type:Number, default:1},
    messageId:{type:String,default:''},
    state:{type:String},
    type:{type:String,default:''}
},{
        timestamps: true,
    });


module.exports = mongoose.model('conversation', conversationSchema);