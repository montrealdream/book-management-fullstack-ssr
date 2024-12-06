const nodemailer = require('nodemailer');

module.exports.send = (toEmail, subject, content) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL_HOST,
          pass: process.env.NODEMAILER_PASSWORD_HOST,
        }
    });
      
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL_HOST,
        to: toEmail,
        subject: subject,
        html: content,
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) console.log(error);
        else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
    });
}
