const axios = require('axios')
const validToken = require('../utils/validToken')

const axiosGraph = axios.create({
    baseURL: 'https://graph.facebook.com/',
    timeout: 15000,
  })

  axiosGraph.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const accessToken = await validToken()
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  }, function (error) {
    // Do something with request error
    console.log('error in instance request interceptor',error)
    return Promise.reject(error);
  })
  module.exports= axiosGraph