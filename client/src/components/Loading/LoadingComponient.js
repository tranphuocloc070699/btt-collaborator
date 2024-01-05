import React from "react";
import Styles from "./Loadding.module.css"

import { Spin } from "antd"
function Loadding() {
        return (
                <div className={Styles.Loadding}>
                    <div>
                        <Spin size="large"></Spin>
                        <div className={Styles.loadding}>Đang tải dữ liệu...</div>
                    </div>
                </div>
        )
    }

export default Loadding;