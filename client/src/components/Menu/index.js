import React from "react";
import Styles from "./menu.module.css";

import { Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Menu({dataMenu, setOnTab, onTab}) {
    return ( 
        <div className={Styles["Box_menu"]}>
            {dataMenu && dataMenu.map((menu, index)=>{
                return (
                    <Space key={index}>
                        <div 
                            className={index == onTab ?  Styles["Box_menu-detail"] : Styles["Box_menu-detail-out"]}
                            onClick={()=>{ setOnTab(index)}}
                        >
                            <div className={index == onTab ? Styles["menu-hover"] : Styles["menu-hover-out"] }>

                            </div>
                            <div className={Styles["box_menu-item"]}>
                                <img src={menu.icons} />
                            </div>
                            <div className={Styles["box_menu-dis"]}>
                            <h3>{menu?.content}</h3>
                            <span>{menu?.content_dis}</span>
                            </div>
                        </div>
                    </Space>
                )
            })}
        </div>
     );
}

export default Menu;