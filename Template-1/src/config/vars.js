
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` }); //get env file based on script NODE_ENV==="cross-env" in package.json

module.exports = {
    mongo : {
        uri:process.env.MONGO_URI
    },
    port : process.env.PORT
}