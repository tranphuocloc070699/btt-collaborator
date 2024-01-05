const express = require("express")
const rootRouter = express.Router()

const { collaborativeFieldRouter } = require("./collaborative-field.route")
const { collaborativeContentRouter } = require("./collaborative-content.route")
const { careModeRouter } = require("./care-mode.route")
const { uploadRouter } = require("./upload.router")

rootRouter.use("/collaborative-field",collaborativeFieldRouter)
rootRouter.use("/collaborative-content",collaborativeContentRouter)
rootRouter.use("/care-mode",careModeRouter)

rootRouter.use("/upload", uploadRouter)

module.exports = {
    rootRouter
}