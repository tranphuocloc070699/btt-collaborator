
import API, {headers, endpoints} from "../API"

export function fetchListCollaborativeContent_API(payload) {
    try {
            const {page,page_size,sort_by,order} = payload
        return API.get(endpoints["fetchListCollaborativeContent"](page,page_size,sort_by,order),{headers: headers.headers_token})
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

export function fetchCollaborativeContentByID_API(payload) {
    try {
        const { id } = payload
        return API.get(endpoints["fetchCollaborativeContentByID"](id),{headers: headers.headers_token})
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

export function createCollaborativeContent_API(payload){
    try {
        return API.post(endpoints["createCollaborativeContent"],payload, { headers: headers.headers_token })
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

export function updateCollaborativeContent_API(payload) {
    try {
        const { id , ...data } = payload
        return API.put(endpoints["updateCollaborativeContent"](id),data,{headers: headers.headers_token})
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

export function deleteCollaborativeContent_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["deleteCollaborativeContent"](id),{headers: headers.headers_token})
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


