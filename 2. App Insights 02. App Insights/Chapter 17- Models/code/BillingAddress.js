const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Schema design
const billingAddressSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name!"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name!"],
    },
    address1: {
      type: String,
      required: [true, "Please provide address1!"],
    },
    address2: {
      type: String,
      required: [true, "Please provide address2!"],
    },
    country: {
        type: String,
        required: [true, "Please provide country name!"],
      },
    state: {
        type: String,
        required: [true, "Please provide state name!"],
    },
    city: {
      type: String,
      required: [true, "Please provide city name!"],
    },
    zip: {
      type: String,
      required: [true, "Please provide zip code!"],
    },
    contactNo: {
      type: String,
      required: [true, "Please provide contact no.!"],
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  
);

const BillingAddress = mongoose.model("BillingAddress", billingAddressSchema);

module.exports = BillingAddress;
