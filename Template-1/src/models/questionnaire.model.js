const mongoose = require('mongoose')
var QuestionnaireSchema = new mongoose.Schema({
    name: { type: String, required:true },
    templateId: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "template"
      }
    ],
  },{ timestamps: true })

module.exports=mongoose.model('questionnaire',QuestionnaireSchema) 