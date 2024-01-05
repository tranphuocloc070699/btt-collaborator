
const express = require("express")
const collaborativeContentRouter = express.Router()

const {
    fetchListCollaborativeContent,
    fetchCollaborativeContentByID,
    createCollaborativeContent,
    updateCollaborativeContent,
    deleteCollaborativeContent

} = require("../controller/collaborative-content.controller")

collaborativeContentRouter.get("/",fetchListCollaborativeContent)
collaborativeContentRouter.get(`/:id`,fetchCollaborativeContentByID)
collaborativeContentRouter.post("/create",createCollaborativeContent)
collaborativeContentRouter.put(`/update/:id`,updateCollaborativeContent)
collaborativeContentRouter.delete(`/delete/:id`,deleteCollaborativeContent)


module.exports = {
    collaborativeContentRouter
}