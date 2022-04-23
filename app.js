const express = require("express")
const app = express()
const axios = require("axios").default

var botId = 'sinchsandbox1';
var phoneNbr = '07088519618';
var bearerToken = 'fJOpNPCem9';

var url = 'https://us1.whatsapp.api.sinch.com/whatsapp/v1/' + botId + '/messages';
var data = {
      to: [phoneNbr],
      message: {
            type: 'text',
            text: 'Greetings from Sinch'
      }
};

var postReq = {
      method: "POST",
      headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/json'
      }
};



axios({
      url,
      ...postReq,
      responseType: "json",
      data: JSON.stringify(data),
}).then(res=>{
      console.log("Here");
}).catch(err=>{
      console.log("1");
})
// fetch(url, postReq)
//   .then(data => {
//     return data.json()
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(error => console.log(error));



// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//     user: "tobijay6@gmail.com",
//     pass: "Oluobadare202"
//     }
//     });

//     const mailOptions = {
//         from: 'The Idea project',
//         to: "donmk202@gmail.com",
//         subject: 'My first Email!!!',
//         text: "This is my first email. I am so excited!"
//         };

//         transporter.sendMail(mailOptions, (err, info)=>{
//             console.log(err||=info)
//         })

/////////////

// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "efcb0543f746d0",
//       pass: "52642c59e01617"
//     }
//   });

//   const message = {
//     from: "pop3.mailtrap.io",
//     to: "donmk202@gmail.com",
//     subject: "Subject",
//     text: "Hello SMTP Email"
// }

// transport.sendMail(message, function(err, info) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(info);
//     }
// })

/////////////////////

// require("dotenv").config()
// const client = require('twilio')("AC032430d0719ff619d288a13ba16f165f", "a355dc391dd0620367eb2d35b07c772c"); 

// client.messages 
//       .create({ 
//          body: 'Hello', 
//          from: 'whatsapp:+14155238886',       
//          to: 'whatsapp:+2347088519618' 
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();

////////////////////////////////////////////////////

// const sdk = require('node-appwrite');
// const apiKey = "309372d28d80cad582fe5ab77f094cc365231cf028b346ba5e122a217a1185663b402d5190c4cfddb13c9d5cfc3b7badd5a09914ea423e1fb06bfe3b5629e23072d5dab70286e024eab009c03c562909d34b530232f022536eb2486775690ce92f040ae20bbeb60247e50d39439ddfc3b5a614568b262fc00a2a0a09e1143edb"

// // const users = new sdk.Users(client)


// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
//     res.setHeader('Access-Control-Allow-Headers', '*')
//     next()
// })

// app.post("/login", async (req, res, next) => {
//     console.log(req.body);
//     let client = new sdk.Client();

//     let account = new sdk.Account(client);

//     client
//         .setEndpoint('http://localhost:50/v1') // Your API Endpoint
//         .setProject('625ac97006dc2d58b12c') // Your project ID
//         .setJWT(req.body.jwt)

//     const user = await account.getSession(req.body.sessionId)
//     console.log(user);
//     res.json({ message: "Success" })
// })

app.listen(9000)