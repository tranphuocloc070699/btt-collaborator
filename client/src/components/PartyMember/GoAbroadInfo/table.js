import React from "react"
import Styles from "./GoAbroadInfo.module.css"

import { TotalDays, FromatDate } from "../../../utils/Time"
import IconsEdit from "../../../assets/img/Write.png";


export const columns = (UpdateGoabroad)=>{
    return [  
        {
            width: "12%",
            title: <span className={Styles["table_title"]}>Ngày</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr-sub"]}>{FromatDate(record.date,"/")}</p>
                )
            }
        },
        {
            width: "20%",
            title: <span className={Styles["table_title"]}>Nơi đi</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr"]}>{record?.destination_country}</p>
                )
            }
        },
        {
            width: "15%",
            title: <span className={Styles["table_title"]}>Số ngày</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr"]}>
                        {TotalDays(record.time,record.time_comeback)}
                    </p>
                )
            }
        },
        {
            title: <span className={Styles["table_title"]}>Nội dung</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr"]}>{record?.content}</p>
                )
            }
        },
        {
            width: "8%",
            title: <span className={Styles["table_title"]}></span>,
            render: (record)=>{
                return (
                    <div className={Styles["tabel-btn"]}  onClick={()=> UpdateGoabroad(record)}>
                        <img src={IconsEdit} />
                    </div>
                )
            }
        },
    ]
}