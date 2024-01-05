const express = require("express")

const uploadRouter = express.Router()

const { uploadFiles } = require("../controller/upload.controler")

uploadRouter.post("/",uploadFiles)

module.exports = {
    uploadRouter,
}