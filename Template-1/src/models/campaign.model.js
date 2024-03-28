const mongoose = require('mongoose')
var CampaignSchema = new mongoose.Schema({
    name:{ type: String,required:true},
    numbers: { type: String, required:true },
    questionnaire: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "questionnaire"
    },
    leads: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Csv"
    },
    status:{type:Number,default:0},
    flow:{type:Number,default:1}
  },{ timestamps: true })

  module.exports=mongoose.model('campaign',CampaignSchema)