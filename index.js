const express = require("express")
const app = express()

const sdk = require('node-appwrite');
const fs = require('fs');
var uniqid = require('uniqid');

let client = new sdk.Client();
let storage = new sdk.Storage(client);

app.get("/post/image", (req, res, next) => {
    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

    const imageName = `images/${uniqid('image-')}`
    fs.writeFile(imageName, base64Data, 'base64', function (err) {
        client
            .setEndpoint('http://localhost:50/v1') // Your API Endpoint
            .setProject('625ac97006dc2d58b12c')
            .setJWT(req.body.jwt)

        const imagePath = path.join(__dirname, imageName)
        const readstream = fs.createReadStream(imagePath).path
        let promise = storage.createFile('625dd10f9ec7b3279649', 'unique()', readstream);
        promise.then(function (response) {
            fs.unlink(imagePath)
            return res.status(200).json({message: "successfull"})
        }, function (error) {
            return res.status(400).json({message: "An error occured"})
        });
    });


})

// const readst = fs.createReadStream(path.join(__dirname, 'images/out.png')).path
// // console.log("-----------------------------");

// let promise = storage.createFile('625dd10f9ec7b3279649', 'unique()', readst);

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log("first")
//     console.log(error);
// });


app.listen(7000)