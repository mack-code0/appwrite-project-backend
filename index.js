const express = require("express")
const app = express()

require("dotenv").config()
const fs = require('fs');
const path = require("path")


const sdk = require('node-appwrite');
let client = new sdk.Client();

client
    .setEndpoint(process.env.PROJECT_ENDPOINT)
    .setProject(process.env.PROJECT_ID)

app.use(express.json({ limit: "50mb" }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Method", "POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})

app.post("/signup", (req, res, next) => {
    const { name, email, password } = req.body
    let users = new sdk.Users(client);

    client.setKey(process.env.API_KEY) // Your secret API key

    let promise = users.create('unique()', email, password, name);

    promise.then(function (response) {
        res.status(200).json({ message: "User Created" })
    }, function (error) {
        res.status(error.code).json({ error: "An error occured" })
    });
})


// app.post("/image", async (req, res, next) => {

// })

app.post("/image", (req, res, next) => {
    let storage = new sdk.Storage(client);

    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    const userName = req.body.userName
    const receiptId = req.body.receiptId
    const jwt = req.get("Authorization").split(" ")[1]

    const imageName = `images/${userName}-Receipt-${receiptId}.png`
    fs.writeFile(imageName, base64Data, 'base64', function (err) {
        client.setJWT(jwt)
        
        const imagePath = path.join(__dirname, imageName)
        let promise = storage.createFile(process.env.BUCKET_ID, receiptId, imagePath);
        promise.then(function (response) {
            fs.unlink(imagePath, () => {
                return res.status(200).json({ successfull: "successfull" })
            })
        }, function (error) {
            fs.unlink(imagePath, () => {
                return res.json({ error: "An error occured", status: error.code })
            })
        }).catch(() => {
            res.json({ error: "An error occured" })
        })
    });
})

app.listen(7000)