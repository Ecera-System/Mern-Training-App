const BillingAddress = require('../models/BillingAddress');

exports.storeBillingAddress = async (req, res) => {
    try {
        const { firstName, lastName, address1, address2, country, state, city, zip, contactNo } = req.body;

        const isAlreadeyStored = await BillingAddress.findOne({userId: req.decoded._id});

        const billingAddress = {
            firstName,
            lastName,
            address1,
            // Check if address2 is provided, otherwise exclude it from the object
            ...(address2 && { address2 }),
            country,
            state,
            city,
            zip,
            contactNo,
            userId: req.decoded._id,
        };

        if (isAlreadeyStored) {
            return res.status(400).json({
                error: "You have already submitted the billing address",
            })
        } else {
            const result = await BillingAddress.create(billingAddress);
            res.status(200).json({success: true, id: result._id, message: 'Billing address stored successfully!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};


exports.getBillingAddress = async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findOne({userId: req.decoded._id});

        if(!billingAddress){
            return res.status(404).json({error: "Billing address info not found"})
        }else{
            res.status(200).json({ success: true, billingAddress});
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};