const axiosWebhook = require("../config/axiosWebhook");
var FormData = require("form-data");
const { default: axios } = require("axios");

const sendMessages = async (text, number,firstname,lastname,payload) => {
  try {
    payload = JSON.stringify(payload)
    const data = new FormData();
    data.append("senderNumber",`${number}`);
    data.append("payload",payload);
    data.append("message_content",`Hi ${text}`);
    data.append("postUrl", "facebookchatbot");
    data.append("fullname", `${firstname} ${lastname}`);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.genius.co.uk/api/send-message-cb",
      headers: {
        Authorization: "b4e25cae-e21c-4995-b652-d36850340b9b",
        ...data.getHeaders(),
      },
      data: data,
    };
    
   const response = await axios(config);
   const {messages} =JSON.parse(response?.data?.response)
   return messages[0].id
  } catch (error) {
    return error?.response?.data ?? error
  }
};
module.exports = sendMessages;
