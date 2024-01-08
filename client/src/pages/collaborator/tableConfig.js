import React from "react";
import Styles from "./collaborator.module.css";

import { EditOutlined } from "@ant-design/icons";
import { ListDep, ListPos, renderListItems } from "../../utils/TableConfig";
import AvatarContainer from "../../components/Avatar";

export const columns = (OnChangeDetailsPage) => {
  const extractAvatarFromArray = (arr) => {
    return `${JSON.parse(arr)[0]}`;
  };

  const convertStatus = (state) => {
    if (!state) return <div></div>;

    if (state == "NOT_PROPOSED")
      return <div style={{ color: "#dbdbdb" }}>Vô hiệu hóa</div>;
    if (state == "PROPOSED")
      return <div style={{ color: "orange" }}>Đang chờ duyệt</div>;
    if (state == "ACTIVE")
      return <div style={{ color: "#29B171" }}>Chuyên gia</div>;
  };

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
                record?.avatar ? record?.avatar : ""
              }
              status={record?.state}
            />
            <p>{record.full_name}</p>
          </div>
        );
      },
    },
    {
      width: "8%",
      title: <span className={Styles["table_header"]}>Giới tính</span>,
      render: (_, record) => {
        return <div>{record?.gender=='1' ? 'Nam' : record.gender=='0' ? 'Nữ' : 'Khác'}</div>;
      },
    },
    {
      width: "24%",
      title: (
        <span className={Styles["table_header"]}>
          Danh xưng, học hàm, học vị, Chức vụ/Chức danh
        </span>
      ),
      render: (_, record) => {
        // console.log(record.dep_pos);
        // const data = [];
        // if (record?.dep_pos) {
        //   data.push(record?.dep_pos[0]?.position?.pos_name);
        //   data.push(record?.dep_pos[0]?.department_name);
        // }

        // const ListData = ListDep(record?.dep_pos);
        return (
          // <div>
          //   <p>{record?.dep_pos[0]?.position?.pos_name}</p>
          //   <p style={{color:'#A1A5B7',marginTop:4}}>{record?.dep_pos[0]?.department_name}</p>
          // </div>
          <div>{record?.position}

        </div>
        );
      },
    },
    {
      width: "12%",
      title: <span className={Styles["table_header"]}>Nơi công tác</span>,
      render: (_, record) => {
        return <div>{record?.workplace}</div>;
      },
    },
    {
      width: "10%",
      title: <span className={Styles["table_header"]}>Đề xuất</span>,
      render: (_, record) => {
        return <div>{record?.proposer_full_name}</div>;
      },
    },
    {
      width: "10%",
      title: <span className={Styles["table_header"]}>Trạng thái</span>,
      render: (_, record) => {
        return <div>{convertStatus(record?.state)}</div>;
      },
    },
  ];
  return columns;
};
