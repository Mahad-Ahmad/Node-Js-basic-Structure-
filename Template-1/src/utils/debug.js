const debug = require('debug');
module.exports.debugHttpRequestBody = debug('chatbot:http:request:body');
module.exports.debugHttpResponse = debug('chatbot:http:response');
module.exports.debugHttpError = debug('chatbot:http:error');
