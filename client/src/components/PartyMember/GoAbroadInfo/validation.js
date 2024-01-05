import { WarnNotification } from "../../../utils/Notification"
export const validattion = (storeGoabroad)=>{
    if(!storeGoabroad?.destination_country){
        WarnNotification("Vui lòng nhập nơi đến")
        return false
    }
    if(!storeGoabroad?.time){
        WarnNotification("Vui lòng chọn thời gian đi")
        return false
    }
    if(!storeGoabroad?.time_comeback){
        WarnNotification("Vui lòng chọn thời gian về")
        return false
    }
    if(!storeGoabroad?.content){
        WarnNotification("Vui Lòng thêm nội dung")
        return false
    }
    return true
}

export const OnCheckDate = (value,storeGoabroad,ChangeStoreGoabroad)=>{
    if(!storeGoabroad?.time){
        WarnNotification("Vui lòng chọn ngày đi")
    }

    if(storeGoabroad.time){
        const end = new Date(value).getDate();
        const start = new Date(storeGoabroad.time).getDate();
        if(value){
            if((end - start) > 0){
                ChangeStoreGoabroad("time_comeback",value)
            }else{
                WarnNotification("Ngày đến không được nhỏ hơn ngày đi")
                ChangeStoreGoabroad("time_comeback","")
            }
        }else{
            ChangeStoreGoabroad("time_comeback","")
        }
    }
}