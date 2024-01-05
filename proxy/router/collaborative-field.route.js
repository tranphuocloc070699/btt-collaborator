
const express = require("express")
const collaborativeFieldRouter = express.Router()

const {
    fetchListCollaborativeField,
    fetchCollaborativeFieldByID,
    createCollaborativeField,
    updateCollaborativeField,
    deleteCollaborativeField

} = require("../controller/collaborative-field.controller")

collaborativeFieldRouter.get("/",fetchListCollaborativeField)
collaborativeFieldRouter.get(`/:id`,fetchCollaborativeFieldByID)
collaborativeFieldRouter.post("/create",createCollaborativeField)
collaborativeFieldRouter.put(`/update/:id`,updateCollaborativeField)
collaborativeFieldRouter.delete(`/delete/:id`,deleteCollaborativeField)


module.exports = {
    collaborativeFieldRouter
}