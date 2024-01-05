
import API, {headers, endpoints} from "../API"

export function fetchListCareMode_API(payload) {
    try {
            const {page,page_size,sort_by,order} = payload
        return API.get(endpoints["fetchListCareMode"](page,page_size,sort_by,order),{headers: headers.headers_token})
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

export function fetchCareModeByID_API(payload) {
    try {
        const { id } = payload
        return API.get(endpoints["fetchCareModeByID"](id),{headers: headers.headers_token})
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

export function createCareMode_API(payload){
    try {
        return API.post(endpoints["createCareMode"],payload, { headers: headers.headers_token })
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

export function updateCareMode_API(payload) {
    try {
        const { id , ...data } = payload
        return API.put(endpoints["updateCareMode"](id),data,{headers: headers.headers_token})
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

export function deleteCareMode_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["deleteCareMode"](id),{headers: headers.headers_token})
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


