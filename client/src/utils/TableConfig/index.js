import React from "react"
import Styles from "./tabel.module.css"
// Đặt lại key table sau mối lần thay đổi dữ liệu
export const buildData = (data = [])=>{
    if(data.length){
        const newData = data?.map((record,index)=>{
            return {
                ...record,
                number: index + 1
            }
        })
    
        return newData
    }
}


// Lấy danh sách phòng ban của user
export const ListDep = (dep_pos = [])=>{
    const arrDepPos = dep_pos.map((dep_name)=>{
        return dep_name?.department_name
    })
    return arrDepPos
}

// Lấy danh sách chức vụ của user
export const ListPos = (dep_pos = [])=>{
    const arrPos = dep_pos.map((pos_name)=>{
        return pos_name?.position?.pos_name
    })
    return arrPos
}


export const renderListItems = (List = [])=>{
    return (
        <div className={Styles["colunm_name"]}>
            <ul className={Styles["parent_tolip"]}>
                {List.map((items,index)=>{
                    return <li title={items} key={index} className={Styles["tolip"]}>{items}</li>
                })}
            </ul>
        </div>
    )
}