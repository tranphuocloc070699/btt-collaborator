import React from "react";
import Styles from "./Sidebar.module.css"

import { Layout, Menu } from "antd"
import { ItemMenu } from "./menu";
const { Sider } = Layout

function Sidebar() {
    const items = ItemMenu()
    if(!window.location.href.includes("erp")){
        return (
            <Sider 
                width={266}
                className={Styles["Sidebar"]}
            >
                <Menu
                    mode="inline"
                    items={items}
                />
            </Sider>
        )
    }else{
        return items
    }
}

export default Sidebar;