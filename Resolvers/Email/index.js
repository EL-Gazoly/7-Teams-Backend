const nodemailer = require('nodemailer')
const { readFile } = require ('../../Middlewares/file');

    

       
const sendEmailService = {
    sendEmail: async (_, {email, certificate}) => {
        const imageURL = await readFile(certificate)
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
              user: process.env.SENDER_EMAIL,
              pass: process.env.SENDER_PASSWORD,
            },
          });
          const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : `${email}`,
            subject : 'Here is your certificate',
            text: 'Please check the attachment.',
            attachments: [
              {
                filename: 'certificate.jpeg',
                path: `.${imageURL}`,
              },
            ],
          }
        
          transporter.sendMail(mailOptions, (error, info)=> {
            if(error) {
              throw new Error
            } else {
              console.log('Email sent : ', info.response)
              return "Email sent successfully"
            }
          })

          return 'It works'
      },
}

module.exports = sendEmailService