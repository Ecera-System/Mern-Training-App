const mongoose = require("mongoose");

const refundTermsSchema = mongoose.Schema(
  {
    registrationFees: {
      type: Number,
      default: 20,
      required: true,
    },
    returnWindow: {
      type: Number,
      default: 7,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RefundTerms = mongoose.model("RefundTerms", refundTermsSchema);

module.exports = RefundTerms;
