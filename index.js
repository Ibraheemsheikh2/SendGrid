const express = require('express');
const bodyParser = require('body-parser');
const sendgridMail = require('@sendgrid/mail');
const { v4: uuid } = require('uuid'); 
require('dotenv').config();

console.log(process.env.SENDGRID_API_KEY);

const apiKey = process.env.SENDGRID_API_KEY;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendotp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(Math.random() * 9000) + 1000;
    
  sendgridMail.setApiKey(apiKey);
  
  const msg = {
    to: email,
    from: 'tonywilson.1357@gmail.com',
    subject: 'OTP Verification Code',
    text: `Your OTP verification code is: ${otp}.`,
  };
  
  sendgridMail
    .send(msg)
    .then(() => {
      console.log(`OTP sent to ${email} successfully!`);
      res.send({ success: true, message: 'OTP sent successfully!', otp : otp});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ success: false, message: 'Failed to send OTP' });
    });
});
  
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
