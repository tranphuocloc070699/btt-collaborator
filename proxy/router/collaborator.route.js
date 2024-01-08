
const express = require("express")
const collaboratorRouter = express.Router()

const {
    fetchListCollaborator,
    fetchCollaboratorByID,
    createCollaborator,
    approveCollaborator,
    updateCollaborator,
    deleteCollaborator,
    fetchDepartmentList,
    fetchPositionlist,
    pushToCollaborativeField,
    pushToCollaborativeContent,
    pushToCareMode,
    removeFromCollaborativeField,
    removeFromCollaborativeContent,
    removeFromCareMode

} = require("../controller/collaborator.controller")

collaboratorRouter.get("/",fetchListCollaborator)
collaboratorRouter.get(`/single/:id`,fetchCollaboratorByID)
collaboratorRouter.post("/create",createCollaborator)
collaboratorRouter.patch("/patch/:id",approveCollaborator)
collaboratorRouter.put(`/update/:id`,updateCollaborator)
collaboratorRouter.delete(`/delete/:id`,deleteCollaborator)

collaboratorRouter.get("/department-list",fetchDepartmentList)
collaboratorRouter.get(`/position-list/`,fetchPositionlist)

collaboratorRouter.post("/create/field/:id",pushToCollaborativeField)
collaboratorRouter.post("/create/content/:id",pushToCollaborativeContent)
collaboratorRouter.post("/create/care-mode/:id",pushToCareMode)

collaboratorRouter.delete(`/delete/field/:id`,removeFromCollaborativeField)
collaboratorRouter.delete(`/delete/content/:id`,removeFromCollaborativeContent)
collaboratorRouter.delete(`/delete/care-mode/:id`,removeFromCareMode)





module.exports = {
    collaboratorRouter
}