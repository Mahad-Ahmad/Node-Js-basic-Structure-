const axios = require('axios')

const webhookApi = axios.create({
    baseURL: 'https://api.genius.co.uk/api/',
    timeout: 15000,
  })

  webhookApi.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = `${process.env.ACCESS_TOKEN_WEBHOOK}`;
    config.headers.post['Content-Type'] = 'multipart/form-data';
    return config;
  }, function (error) {
    // Do something with request error
    console.log('error in instance request interceptor',error)
    return Promise.reject(error);
  })
  module.exports= webhookApi