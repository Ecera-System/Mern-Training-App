const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

// Schema design
const EnvVariablesSchema = mongoose.Schema(
  {
    //smtp info
    smtpUser: String,
    smtpPassword: String,
    senderEmail: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email address!"],
    },

    //other fields can be add below

    editor: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  
);

const EnvVariables = mongoose.model("EnvVariables", EnvVariablesSchema);

module.exports = EnvVariables;
