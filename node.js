const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const cors = require('cors');
app.use(cors());

const razorpay = new Razorpay({
    key_id: ' rzp_test_a7M06VXSA6nHHa',
    key_secret: 'OUKWCNI8HGKFZW44wRe30PVX'
});

app.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount, // amount in smallest currency unit (paise)
        currency: 'INR',
        receipt: 'order_rcptid_11'
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
