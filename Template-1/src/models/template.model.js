const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup schema
var templateSchema = new Schema({ 
    priorityBit:{type:Number,required:true},
    text:{type:String,required:true},
    validations:{type:Object,default:{}},
    alternateCampaign:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaign"
  }
  }, {timestamps: true});


module.exports = mongoose.model('template', templateSchema);