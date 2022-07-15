const nodeoutlook = require('nodejs-nodemailer-outlook')


function sendEmail (dest, message, attachment){
    if (!attachment) {
        attachment = []
    }
    
nodeoutlook.sendEmail({
    auth: {
        user: process.env.senderEmail,
        pass: process.env.password
    },
    from: process.env.senderEmail,
    to: dest,
    subject: 'Hey you, awesome!',
    html: message,
    text: 'Welcome to our family',
  
    
}


);

}


module.exports = sendEmail