
import API, {headers, endpoints} from "../API"

export function fetchListCollaborator_API(payload) {
    try {
            const {page,page_size,sort_by,order} = payload
        return API.get(endpoints["fetchListCollaborator"](page,page_size,sort_by,order),{headers: headers.headers_token})
                .then((res)=>{
                    return res.data
                })
                .catch((err)=>{
                    return err
                })   
    } catch (error) {
        return error
    }
}

export function fetchCollaboratorByID_API(payload) {
    try {
        const { id } = payload
        return API.get(endpoints["fetchCollaboratorByID"](id),{headers: headers.headers_token})
                .then((res)=>{
                    return res.data
                })
                .catch((err)=>{
                    return err
                })   
    } catch (error) {
        return error
    }
}

export function createCollaborator_API(payload){
    try {
        return API.post(endpoints["createCollaborator"],payload, { headers: headers.headers_token })
                .then((res)=>{
                    return res.data
                })
                .catch((err)=>{
                    return err
                })
    } catch (error) {
        return error
    }
}

export function updateCollaborator_API(payload) {
    try {
        const { id , ...data } = payload
        return API.put(endpoints["updateCollaborator"](id),data,{headers: headers.headers_token})
                .then((res)=>{
                    return res.data
                })
                .catch((err)=>{
                    return err
                })   
    } catch (error) {
        return error
    }
}

export function deleteCollaborator_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["deleteCollaborator"](id),{headers: headers.headers_token})
                .then((res)=>{
                    return res.data
                })
                .catch((err)=>{
                    return err
                })   
    } catch (error) {
        return error
    }
}


