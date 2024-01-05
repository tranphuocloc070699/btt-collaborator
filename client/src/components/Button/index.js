import React from "react";
import Styles from "./Button.module.css";

import { Button } from "antd";

function ButtonConfirm({title,HandelUpdate}) {
    
    return ( 
        <div className={Styles["btn-bg"]}>
            <Button
                onClick={HandelUpdate}
            >
                {title}
            </Button>
        </div>
     );
}

export default ButtonConfirm;