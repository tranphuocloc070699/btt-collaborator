import React from "react"
import API, {headers, endpoints} from "../API"

export function getUploadAPI(form) {
    try {
       return API.post(endpoints["uploadFileChangeParty"], form ,{  headers: { "content-type": "multipart/form-data", "Authorization": headers.headers_token.Authorization }})
            .then((res)=>{
                console.log({res});
                return res.data
            })
            .catch((err)=>{
                return err
            })
        
    } catch (error) {
        return error
    }
}

