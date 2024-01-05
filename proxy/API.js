
const axios = require("axios")
const https = require("https")

const agent = new https.Agent({
    rejectUnauthorized: true
})

let API = axios.create({
    baseURL: process.env.BACKEND_DOMAIN,
},{httpsAgent: agent})


let endpoints = {
    // Lĩnh vực cộng tác
   "fetchListCollaborativeField": (page,page_size,sort_by,order)=> `/collaborative-field/?page_size=${page_size}&page=${page}&sort_by=${sort_by}&order=${order}`,
   "fetchCollaborativeFieldByID": (id) => `/collaborative-field/${id}`,
   "createCollaborativeField": `/collaborative-field/`,
   "updateCollaborativeField": (id)=> `/collaborative-field/${id}`,
   "deleteCollaborativeField": (id)=> `/collaborative-field/${id}`,

   // Nội dung cộng tác
   "fetchListCollaborativeContent": (page,page_size,sort_by,order)=> `/collaborative-content/?page_size=${page_size}&page=${page}&sort_by=${sort_by}&order=${order}`,
   "fetchCollaborativeContentByID": (id) => `/collaborative-content/${id}`,
   "createCollaborativeContent": `/collaborative-content/`,
   "updateCollaborativeContent": (id)=> `/collaborative-content/${id}`,
   "deleteCollaborativeContent": (id)=> `/collaborative-content/${id}`,
   
   // Chế độ chăm sóc
   "fetchListCareMode": (page,page_size,sort_by,order)=> `/care-mode/?page_size=${page_size}&page=${page}&sort_by=${sort_by}&order=${order}`,
   "fetchCareModeByID": (id) => `/care-mode/${id}`,
   "createCareMode": `/care-mode/`,
   "updateCareMode": (id)=> `/care-mode/${id}`,
   "deleteCareMode": (id)=> `/care-mode/${id}`,

    
}

module.exports = {
    endpoints,
    API
}


