const RefundTerms = require("../models/RefundTerms");

// Create new terms
exports.createRefundTerms = async (req, res, next) => {
  try {
    // console.log("createRefundTerms");
    //
    const { registrationFees, returnWindow } = req.body;
    const refundTerms = await RefundTerms.create({
      registrationFees,
      returnWindow,
    });

    res.status(201).json({
      data: refundTerms,
      success: "Refund terms created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// Get terms
exports.getRefundTerms = async (req, res, next) => {
  try {
    const refundTerms = await RefundTerms.findOne();
    res.status(200).json(refundTerms);
  } catch (error) {
    next(error);
  }
};

// Update registration fees
exports.updateRegistrationFees = async (req, res, next) => {
  try {
    const { registrationFees } = req.body;
    // console.log(req.body, "req.body");
    //
    // console.log(registrationFees, "registrationFees");
    await RefundTerms.updateOne({}, { $set: { registrationFees } });

    res
      .status(200)
      .json({ success: "Registration fees updated successfully!" });
  } catch (error) {
    next(error);
  }
};

// Update return window
exports.updateReturnWindow = async (req, res, next) => {
  try {
    const { returnWindow } = req.body;

    // console.log(returnWindow, "returnWindow");
    await RefundTerms.updateOne({}, { $set: { returnWindow } });

    res.status(200).json({ success: "Return window updated successfully!" });
  } catch (error) {
    next(error);
  }
};
