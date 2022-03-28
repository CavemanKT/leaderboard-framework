/* eslint-disable indent */
import nc from 'next-connect'
import session from '@/api/helpers/session'
import getCurrentUserByToken from '@/api/helpers/getCurrentUserByToken'
import authenticateUser from '@/api/helpers/authenticateUser'
let nodemailer = require('nodemailer');
import { User } from '@/db/models'

const sendEmailToUser = async (req, res) => {
    const {recipient, sender, title, content, password } = req.body
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: sender,
            pass: password
        }
    });

    var mailOptions = {
        from: sender,
        to: recipient,
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
