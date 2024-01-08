import React from "react";
import Styles from "./title.module.css"

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"

function Title({title, addButton=false, setOpen}) {
    return ( 
        <div className={Styles["box_title"]}>
            <div className={Styles["box-box"]}>
                <h3 className={Styles["box_title-h3"]}>{title}</h3>
                {addButton
                    &&
                <Button 
                    onClick={()=>setOpen(true)}
                    type="ghost"
                >
                    Đề xuất
                </Button>
                }

            </div>
        </div>
     );
}

export default Title;