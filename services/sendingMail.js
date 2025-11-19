const nodemailer = require('nodemailer');
try {
const sendMail =async (mailInfo)=>{
    // mail pathaune logic ya lekhne
    // step 1=> first ma hami le transport banaunu parxa transport vaneko configuration ho
// passing  object
    // auth=> tapai ko businees ko email and pass ke ho vner or sender pass and email
 const transporter=nodemailer.createTransport({
    service:"email",
      host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT, // or 465 for SSL
  secure: false,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS //real pass hoin yo app pass ho
    }
 })

    // step 2=> mail options banaune
    
    // step 3=> mail pathaune
    await transporter.sendMail(mailInfo);
}
} catch (error) {
    console.error("Error defining sendMail function:", error);
}
module.exports = { sendMail };