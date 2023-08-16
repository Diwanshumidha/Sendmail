const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config()




// app.enable('trust proxy')


app.use(express.json());
app.use(cors());





app.post("/send", function (req, res) {
    const {name,email,message,mobileNumber,location} = req.body

    console.log(req.body)
    let transporter = nodemailer.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,


        secure: true, 
        auth: {
          user: process.env.FROM_MAIL,
          pass:process.env.PASS,
        },
      });
      
      transporter.verify((err, success) => {
        err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success} ===`);
      });

let HtmlOption = `

    <h2>You Got A New Message</h2>
    <h3>Contact Details</h3>
    <ul>
    <li> Name: ${name}</li>
    <li> Phone Number: ${mobileNumber}</li>
    <li> Email: ${email}</li>
    <li> Location: ${location}</li>
    </ul>
    <p> Message: ${message}</p>
`

  let mailOptions = {
    to: process.env.TO_EMAIL,
    subject: `Message from: ${name} User!!!!`,
    html:HtmlOption,
    date: new Date(),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
    console.log(err)
      res.json({
        status: "fail",
      });
    } else {
        console.log("== Message Sent ==");
        res.json({
          status: "success",
        });
    }
  });
});

app.listen(3000,()=>{
    console.log('Server is live on 3000')
})

