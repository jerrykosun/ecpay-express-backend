require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/ecpay-checkout', (req, res) => {
  const { MerchantTradeNo, TotalAmount, ItemName } = req.body;

  const ecpay = require('ecpay_aio_nodejs');
  let base_param = {
    MerchantTradeNo,
    MerchantTradeDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    TotalAmount,
    TradeDesc: '測試交易',
    ItemName,
    ReturnURL: 'https://你的domain.com/ecpay-return',
    ClientBackURL: 'https://你的網站.com/thankyou',
  };

  let create = new ecpay(payment_conf).payment_client();
  let html = create.payment_client.aio_check_out_all(base_param);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
