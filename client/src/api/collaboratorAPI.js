
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
        const { id , ...data } = payload
        return API.post(endpoints["createCollaborator"],(id),data, { headers: headers.headers_token })
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

export function fetchDepartmentList_API(payload){
    try {
        const { dep_name } = payload
        let filter = ''
        if(dep_name) filter.concat(`?dep_name=${dep_name}`)
        return API.get(endpoints["fetchDepartmentList"](filter),{headers: headers.headers_token})
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

export function fetchPositionlist_API(payload){
    try {
        const { pos_name } = payload
        let filter = ''
        if(pos_name) filter.concat(`?pos_name=${pos_name}`)
        return API.get(endpoints["fetchPositionlist"](filter),{headers: headers.headers_token})
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


export function pushToCollaborativeField_API(payload){
    try {
        const { id , ...data } = payload
        return API.post(endpoints["pushToCollaborativeField"],(id),data, { headers: headers.headers_token })
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

export function pushToCollaborativeContent_API(payload){
    try {
        const { id , ...data } = payload
        return API.post(endpoints["pushToCollaborativeContent"],(id),data, { headers: headers.headers_token })
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

export function pushToCareMode_API(payload){
    try {
        const { id , ...data } = payload
        return API.post(endpoints["pushToCareMode"],(id),data, { headers: headers.headers_token })
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



export function removeFromCollaborativeField_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["removeFromCollaborativeField"](id),{headers: headers.headers_token})
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

export function removeFromCollaborativeContent_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["removeFromCollaborativeContent"](id),{headers: headers.headers_token})
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

export function removeFromCareMode_API(payload) {
    try {
        const { id  } = payload
        return API.delete(endpoints["removeFromCareMode"](id),{headers: headers.headers_token})
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

