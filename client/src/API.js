import axios from "axios";
import https from "https"
import {generateToken} from './utils/Token/index'


const agent = new https.Agent({
    rejectUnauthorized: false
})

export default axios.create({
    baseURL: process.env.HD_EXP_DOMAIN,  
},{httpsAgent: agent})

export let endpoints = {

  "fetchListCollaborativeField": (page,page_size,sort_by,order)=> `/api/collaborative-field/?page=${page}&page_size=${page_size}&sort_by=${sort_by}&order=${order}`,
  "fetchCollaborativeFieldByID": (id)=> `/api/collaborative-field/${id}`,
  "createCollaborativeField": `/api/collaborative-field/create`,
  "updateCollaborativeField": (id)=> `/api/collaborative-field/update/${id}`,
  "deleteCollaborativeField": (id)=> `/api/collaborative-field/delete/${id}`,


  "fetchListCollaborativeContent": (page,page_size,sort_by,order)=> `/api/collaborative-content/?page=${page}&page_size=${page_size}&sort_by=${sort_by}&order=${order}`,
  "fetchCollaborativeContentByID": (id)=> `/api/collaborative-content/${id}`,
  "createCollaborativeContent": `/api/collaborative-content/create`,
  "updateCollaborativeContent": (id)=> `/api/collaborative-content/update/${id}`,
  "deleteCollaborativeContent": (id)=> `/api/collaborative-content/delete/${id}`,


  "fetchListCareMode": (page,page_size,sort_by,order)=> `/api/care-mode/?page=${page}&page_size=${page_size}&sort_by=${sort_by}&order=${order}`,
  "fetchCareModeByID": (id)=> `/api/care-mode/${id}`,
  "createCareMode": `/api/care-mode/create`,
  "updateCareMode": (id)=> `/api/care-mode/update/${id}`,
  "deleteCareMode": (id)=> `/api/care-mode/delete/${id}`,


  "fetchListCollaboratorContent": (page,page_size,sort_by,order)=> `/api/collaborator-content/?page=${page}&page_size=${page_size}&sort_by=${sort_by}&order=${order}`,
  "fetchCollaboratorContentByID": (id)=> `/api/collaborator-content/${id}`,
  "createCollaboratorContent": `/api/collaborator-content/create`,
  "updateCollaboratorContent": (id)=> `/api/collaborator-content/update/${id}`,
  "deleteCollaboratorContent": (id)=> `/api/collaborator-content/delete/${id}`,

//   Collaborator
   // Chuyên gia - chuyên viên
    // filter: full_name,dep_names,pos_names,workplace
    "fetchListCollaborator": (page,page_size,sort_by,order,filter)=> `/api/collaborator/?page_size=${page_size}&page=${page}&sort_by=${sort_by}&order=${order}${filter}`,
    "fetchCollaboratorByID": (id) => `/api/collaborator/single/${id}`,
    // "createCollaborator": (id) => `/api/collaborator/create/${id}`,
    "createCollaborator": `/api/collaborator/create`,
    "approveCollaborator": (id) => `/api/collaborator/patch/${id}`,
    "updateCollaborator": (id)=> `/api/collaborator/update/${id}`,
    "deleteCollaborator": (id)=> `/api/collaborator/delete/${id}`,
 
    // List department/positions
    // filter: dep_name   
    "fetchDepartmentList": (filter)=> `/api/collaborator/department-list/${filter}`,
    // filter: pos_name  
    "fetchPositionlist": (filter)=> `/api/collaborator/position-list/${filter}`,
 
    "pushToCollaborativeField":(id)=> `/api/collaborator/create/field/${id}`,
    "removeFromCollaborativeField":(id)=> `/api/collaborator/delete/field/${id}`,
 
    "pushToCollaborativeContent":(id)=> `/api/collaborator/create/content/${id}`,
    "removeFromCollaborativeContent":(id)=> `/api/collaborator/delete/content/${id}`,
 
    "pushToCareMode":(id)=> `/api/collaborator/create/care-mode/${id}`,
    "removeFromCareMode":(id)=> `/api/collaborator/delete/care-mode/${id}`, 


  // Upload
  "uploadFileChangeParty" : `/api/upload`
}

export let headers = {
    headers: {
        "Content-Type": "application/json",
    },
    headers_token: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoyNzQ5Nzk2MTk2fQ.2i_z3-2cpRRXusvpR-T5h0QvclOi4gL8wq1ze-aLyAA`,
        "Content-Type": "application/json",
        token:generateToken()
    }
}

