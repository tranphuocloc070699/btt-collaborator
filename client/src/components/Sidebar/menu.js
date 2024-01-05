import React from "react";

import { Link } from "react-router-dom";
import { UsergroupAddOutlined, HeartOutlined } from "@ant-design/icons"

import { CheckMicroFrontEnd } from "../../utils/Token";
import { manager } from "../../utils/Auth"

const pathMicro = CheckMicroFrontEnd()

function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
    };
}

export function ItemMenu(){
        return [
            getItem(<Link to={`${pathMicro}`}>Chuyên gia - chuyên viên</Link>,"collaborator", <UsergroupAddOutlined /> ,[
                getItem(<Link to={`${pathMicro}/manager`}>Quản lý</Link>,"manager",),
            ]),      
           
            
        ]
}   


