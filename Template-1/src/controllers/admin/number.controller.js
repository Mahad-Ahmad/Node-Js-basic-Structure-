const axiosGraph = require('../../config/axiosGraph')
const { debugHttpRequestBody, debugHttpResponse,debugHttpError } = require("../../utils/debug");

/**
 * Get All Templates
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.getAllNumbers = async (req,res,next)=>{
    try {
     const response = await axiosGraph.get(`v14.0/${process.env.WABA_ID}/phone_numbers`)
     debugHttpResponse('res',response?.data)
      res.status(200).send({
         message:"request successful",
         data:response?.data
      })
    } catch (error) {
      next(error?.response?.data?.error ?? error)
    }
 }

/**
 * Get Single Templates
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
 exports.getNumber = async (req,res,next)=>{
    try {
     const {id}= req.params
     const response = await axiosGraph.get(`v14.0/${id}`)
     debugHttpResponse('res',response?.data)
      res.status(200).send({
         message:"request successful",
         data:response.data
      })
    } catch (error) {
     next(error?.response?.data?.error ?? error)
    }
 }