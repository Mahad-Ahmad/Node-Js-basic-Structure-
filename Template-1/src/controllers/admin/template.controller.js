const axiosGraph =require("../../config/axiosGraph")



// Get All Templates
exports.getAllTemplates = async (req,res,next)=>{
   try {
    const response = await axiosGraph.get(`v14.0/${process.env.WABA_ID}/message_templates`)
     res.status(200).send({
        message:"request successful",
        data:response.data
     })
   } catch (error) {
      next(error.response?.data?.error ?? error)
      // res.status(500).send(error.response?.data?.error ?? "Internal Server Error")

   }
}
//Get Single Template
exports.getTemplate = async (req,res,next)=>{
   const {id} = req.params
   try {
    const response = await axiosGraph.get(`v14.0/${id}`)
     res.status(200).send({
        message:"request successful",
        data:response.data
     })
   } catch (error) {
    next(error)
   }
}

//Create a Template
exports.createTemplate = async (req,res,next)=>{
  const {body}=req
   try {
    const response = await axiosGraph.post(`v14.0/${process.env.WABA_ID}/message_templates`,body)
     res.status(200).send({
        message:"request successful",
        response:response?.data
     })
   } catch (error) {
    next(error?.response?.data?.error ?? error)
   }
}

//Delete A template from fb graph api
exports.deleteTemplate = async (req,res,next)=>{
   try {
     const {id}= req.params
     await axiosGraph.delete(`v14.0/${process.env.WABA_ID}/message_templates?name=${id}`)
      res.status(200).send({
         message:"request successful",
      })
    } catch (error) {
     next(error)
    }
 }