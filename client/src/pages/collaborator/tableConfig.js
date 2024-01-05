import React from "react";
import Styles from "./collaborator.module.css";

import { EditOutlined } from "@ant-design/icons";
// import { ListDep, ListPos, renderListItems } from "../../utils/TableConfig";
import AvatarContainer from "../../components/Avatar";

export const columns = (OnChangeDetailsPage) => {

  const extractAvatarFromArray = (arr) =>{
    return `${JSON.parse(arr)[0]}`;
    
  }

  const columns = [
    {
      width: "2%",
      title: <span className={Styles["table_header"]}>STT</span>,
      render: (_, record) => {
        return <div className={Styles["colunm_stt"]}>{record.id}</div>;
      },
    },
    {
      width: "15%",
      title: <span className={Styles["table_header"]}>Họ và tên</span>,
      render: (_, record) => {
        return (
          <div className={Styles["colunm_flex"]}>
            <AvatarContainer
              linkUrl={
                record?.avatar ? extractAvatarFromArray(record?.avatar) : ""
              }
            />
            <p>record.full_name</p>
          </div>
        );
      },
    },
    {
      width: "5%",
      title: <span className={Styles["table_header"]}>Giới tính</span>,
      render: (_, record) => {
        // const ListData = ListDep(record?.dep_pos);
        // return renderListItems(ListData);
        return (<div>{record?.gender}</div>)
      },
    },
    {
      width: "24%",
      title: <span className={Styles["table_header"]}>Danh xưng, học hàm, học vị 
      Chức vụ/Chức danh</span>,
      render: (_, record) => {
        // const ListData = ListPos(record?.dep_pos);
        return (<div>RenderListItems</div>)
      },
    },
    {
      width: "12%",
      title: <span className={Styles["table_header"]}>Nơi công tác</span>,
      render: (_, record) => {
        return <div>record?.party_awareness_cell</div>;
        
      },
    },
    {
      width: "10%",
      title: <span className={Styles["table_header"]}>Nơi công tác</span>,
      render: (_, record) => {
        return <div>record?.member_help</div>;
      },
    },
  ];
  return columns;
};
