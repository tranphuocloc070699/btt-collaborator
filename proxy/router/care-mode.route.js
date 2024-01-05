
const express = require("express")
const careModeRouter = express.Router()

const {
    fetchListCareMode,
    fetchCareModeByID,
    createCareMode,
    updateCareMode,
    deleteCareMode

} = require("../controller/care-mode.controller")

careModeRouter.get("/",fetchListCareMode)
careModeRouter.get(`/:id`,fetchCareModeByID)
careModeRouter.post("/create",createCareMode)
careModeRouter.put(`/update/:id`,updateCareMode)
careModeRouter.delete(`/delete/:id`,deleteCareMode)


module.exports = {
    careModeRouter
}