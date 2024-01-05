import React from "react"
import Styles from "./DisciplineAndReward.module.css"

import { EditOutlined } from "@ant-design/icons";
import IconsEdit from "../../../assets/img/Write.png";

export const columns = (handleEditRewardAndDiscipline) =>{

  const convertTypeToLabel = (type) =>{
    switch (type) {
      case 'khen-thuong':
        
        return 'Khen thưởng';
        case 'ky-luat':
        
        return 'Kỷ luật';
        case 'huy-hieu':
        
        return 'huy-hieu';
      default:
        return ''
    }
  }

  const reverseDate = (date) =>{
    const [year,month,day] = date.split('-');
    return `${day}/${month}/${year}`
  }

    const columns = [  
        {
            width: "10%",
            title: <span className={Styles["table_title"]}>Ngày</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr-sub"]}>{reverseDate(record?.date)}</p>
                )
            }
        },
        {
            width: "20%",
            title: <span className={Styles["table_title"]}>Loại</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr"]}>{convertTypeToLabel(record?.type || convertTypeToLabel("huy-hieu") )}</p>
                )
            }
        },
        {
            title: <span className={Styles["table_title"]}>Nội dung</span>,
            render: (record)=>{
                return (
                    <p className={Styles["table_tr"]}>{record?.content || record?.party_badge}</p>
                )
            }
        },
        {
            width: "10%",
            title: <span className={Styles["table_title"]}></span>,
            render: (_, record) => {
              return (
                <div className={Styles["colunm_action"]}>
                  <div
                    onClick={() => handleEditRewardAndDiscipline(record)}
                    className={Styles["colunm_action-edit"]}
                  >
                    <img src={IconsEdit}></img>
                  </div>
                </div>
              );
            },
          },
    ]

    return columns;
    
}
