/* eslint-disable indent */
import nc from 'next-connect'
import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'

require('dotenv').config();

const nodemailer = require('nodemailer');

const sendEmailToUser = async (req, res) => {
    const {recipient, sender, title, content, senderPassword } = req.body
    const {SECRET_GMAIL_ACCOUNT, SECRET_GMAIL_RECIPIENT} = process.env

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            // type: login    <--   default
            // type: OAuth2,
            user: sender,
            pass: senderPassword,
            // clientId: "CLIENT_ID_HERE",
            // clientSecret: "CLIENT_SECRET_HERE",
            // refreshToken: "REFRESH_TOKEN_HERE"   
        }
    });

    var mailOptions = {
        from: sender,
        to: SECRET_GMAIL_RECIPIENT,
        subject: title,
        text: content
    };

    let response
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            response = 'Email sent: ' + info.response
            console.log('Email sent: ' + info.response);
        }
    });

    res.status(200).json({ response })
}

export default nc()
  .use(session)
  .use(getCurrentUserByToken)
  .use(authenticateUser)
  .use(sendEmailToUser)
