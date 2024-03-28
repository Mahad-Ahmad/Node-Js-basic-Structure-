var mongoose = require("mongoose");
var { mongo } = require("./vars");
const connect = async () => {
  try {
    const conn = await mongoose.connect(mongo.uri);
    console.log(`mongodb is connected ${conn.connection.host}`);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
module.exports = connect;
