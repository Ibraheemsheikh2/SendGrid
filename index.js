const express = require('express');
const bodyParser = require('body-parser');
const sendgridMail = require('@sendgrid/mail');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendotp', (req, res) => {
    const { email } = req.body;
    const otp = uuid.v4().substr(0, 4); // Generate a 4-digit OTP using UUID
  
    sendgridMail.setApiKey('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');
  
    const msg = {
      to: 'ibraheemsheikh2@gmail.com',
      from: 'ibraheemsheikh2023@gmail.com',
      subject: 'OTP Verification Code',
      text: `Your OTP verification code is: ${otp}`,
    };
  
    sendgridMail
      .send(msg)
      .then(() => {
        res.send({ success: true, message: 'OTP sent successfully!'});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ success: false, message: 'Failed to send OTP' });
      });
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });