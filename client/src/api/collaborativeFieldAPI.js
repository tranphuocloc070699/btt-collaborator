
import API, {headers, endpoints} from "../API"

export function fetchListCollaborativeField_API(payload) {
    try {
            const {page,page_size,sort_by,order} = payload
        return API.get(endpoints["fetchListCollaborativeField"](page,page_size,sort_by,order),{headers: headers.headers_token})
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

export function fetchCollaborativeFieldByID_API(payload) {
    try {
        const { id } = payload
        return API.get(endpoints["fetchCollaborativeFieldByID"](id),{headers: headers.headers_token})
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

export function createCollaborativeField_API(payload){
    try {
        return API.post(endpoints["createCollaborativeField"],payload, { headers: headers.headers_token })
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

export function updateCollaborativeField_API(payload) {
    try {
        const { id , ...data } = payload
        return API.put(endpoints["updateCollaborativeField"](id),data,{headers: headers.headers_token})
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

export function deleteCollaborativeField_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["deleteCollaborativeField"](id),{headers: headers.headers_token})
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


