import React, { useEffect, useRef, useState } from "react";
import Styles from "./AddProfileStatus.module.css";

import { CloseOutlined } from "@ant-design/icons";
import { DatePicker, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { partyAwarenessStatusListSelector } from "../../../store/redux/selecters/index";
import { setLoading } from "../../../store/redux/slices/loadingSlice";
import { createPartyAwarenessStatusHolder } from "../../../store/redux/slices/partyAwarenessStatusSlice";
import {
  ErrorNotification
} from "../../../utils/Notification";
import { FromatDatePiker } from "../../../utils/Time";
function AddProfileStatusModal({ open, setOpenModal }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const htmlContentTemplate = useRef({
    "viet-file": [
      {
        title: "Ngày viết",
        type: "date",
        value: "20-12-2023",
        error: false,
      },
      {
        title: "Ngày hoàn thành",
        type: "date",
        value: "20-12-2023",
        error: false,
      },
    ],
    "viet-cuon": [
      {
        title: "Ngày viết",
        type: "date",
        value: "20-12-2023",
        error: false,
      },
      {
        title: "Ngày hoàn thành",
        type: "date",
        value: "20-12-2023",
        error: false,
      },
    ],
    "xac-minh-su-tra": [
      {
        title: "Nơi xác minh su tra",
        type: "text",
        value: "",
        error: false,
      },
      {
        title: "Đảng viên phụ trách",
        type: "text",
        value: "",
        error: false,
      },
    ],
    "lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi": [
      {
        title: "Đoàn thanh niên",
        type: "text",
        value: "",
        error: false,
      },
      {
        title: "Công đoàn",
        type: "text",
        value: "",
        error: false,
      },
      {
        title: "Cấp ủy nơi cư trú",
        type: "text",
        value: "",
        error: false,
      },
    ],
  });

  const [htmlContent, setHtmlContent] = useState({
    profileStatus: {
      data: [],
      type: "",
      currentSelect:'viet-file'
    },
    
  });

  const partyAwarenessStatusList = useSelector(partyAwarenessStatusListSelector);

  const isExistProfileStatus = (value) => {
    
    if (
      !partyAwarenessStatusList ||
      partyAwarenessStatusList?.length === 0
    )
      return false;
    let isExist = false;

    partyAwarenessStatusList.forEach((item) => {
  
      if (value === "viet-file" && item.type === "file") isExist = true;
      if (value === "viet-cuon" && item.type === "book") isExist = true;
      if (value === "xac-minh-su-tra" && item.type === "verification")
        isExist = true;
      if (
        value === "lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi" &&
        item.type === "opinion"
      )
        isExist = true;

    });

    return isExist;
  };

  const handleSubmit = () => {
    // Validate
    let isError = false;
    switch (htmlContent.profileStatus.type) {
      case "viet-file":
      case "viet-cuon":
        const startDateArr = htmlContent.profileStatus.data[0].value.split("-");
        const completedDateArr =
          htmlContent.profileStatus.data[1].value.split("-");

        // Compare year -> month -> day
        if (
          +completedDateArr[2] < +startDateArr[2] ||
          +completedDateArr[1] < +startDateArr[1] ||
          +completedDateArr[0] < +startDateArr[0]
        ) {
          ErrorNotification(
            `${htmlContent.profileStatus.data[1].title} không được nhỏ hơn ${htmlContent.profileStatus.data[0].title}`
          );
          isError = true;
        }
        break;
      case "xac-minh-su-tra":
      case "lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi": {
        for (let i = 0; i < htmlContent.profileStatus.data.length; i++) {
          if (htmlContent.profileStatus.data[i].value.trim().length === 0) {
            ErrorNotification(
              `${htmlContent.profileStatus.data[i].title} không được để trống`
            );
            isError = true;
          }
        }
      }
      default:
        break;
    }

    if(partyAwarenessStatusList && partyAwarenessStatusList.length===4){
      ErrorNotification(
        `Đã đủ tình trạng`
      );
      isError = true;
    }

    if (isError) return;

    // All thing good
    let content = {
      // awareness: {
      //   party_awareness_cell: partyAwarenessStatusList.party_awareness_cell,
      //   review_date: partyAwarenessStatusList.review_date,
      //   member_help: partyAwarenessStatusList.member_help,
      //   // issuance_date_certificate: partyAwarenessStatusList.issuance_date_certificate ,
      //   // classification: partyAwarenessStatusList.classification ,
      // },
      status: {
        type: "",
      },
    };

    switch (htmlContent.profileStatus.type) {
      case "viet-file":
        content.status = {
          type: "file",
          file_background_addition_date: "string",
          ...modifyToData("viet-file"),
        };
        break;
      case "viet-cuon":
        content.status = {
          type: "book",
          ...modifyToData("viet-cuon"),
        };
        break;
      case "xac-minh-su-tra":
        content.status = {
          type: "verification",
          ...modifyToData("xac-minh-su-tra"),
        };
        break;
      case "lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi":
        content.status = {
          type: "opinion",
          ...modifyToData("lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi"),
        };
        break;
      default:
        break;
    }

    // dispatch({
    //   type: updatePartySentment.type,
    //   data: {
    //     ...content,
    //     id: location.state?.id,
    //   },
    //   setOpenModal: setOpenModal,
    // });
    dispatch({
      type: setLoading.type,
      payload: false
    })
    dispatch({
      type: createPartyAwarenessStatusHolder.type,
      data: {
        ...content.status,
        party_awareness_id: location.state?.id,
      },
      setOpenModal: setOpenModal,
    });
  };

  const modifyToData = (type) => {
    switch (type) {
      case "viet-file":
      case "viet-cuon": {
        const [startDay, startMonth, startYear] =
          htmlContent.profileStatus.data[0].value.split("-");
        const [completedDay, completedMonth, completedYear] =
          htmlContent.profileStatus.data[1].value.split("-");
        const start_date = `${startYear}-${startMonth}-${startDay}`;
        const complete_date = `${completedYear}-${completedMonth}-${completedDay}`;
        return { start_date, complete_date };
      }
      case "xac-minh-su-tra": {
        const verification_destination =
          htmlContent.profileStatus.data[0].value.trim();
        const verification_party_member =
          htmlContent.profileStatus.data[1].value.trim();
        return {
          verification_destination,
          verification_party_member,
        };
      }
      case "lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi":
        const opinion_youth_union =
          htmlContent.profileStatus.data[0].value.trim();
        const opinion_trade_union =
          htmlContent.profileStatus.data[1].value.trim();
        const opinion_residence_committee =
          htmlContent.profileStatus.data[2].value.trim();
        return {
          opinion_trade_union,
          opinion_youth_union,
          opinion_residence_committee,
        };
      default:
        break;
    }
  };

  const renderHtmlFromType = (item, index) => {
    switch (item.type) {
      case "date":
        return (
          <div
            className={Styles["profile-status-modal-body__block"]}
            key={index}
          >
            <h5>{item.title}</h5>
            <DatePicker
              className={Styles["profile-status-modal-body__block__date"]}
              format={"DD-MM-YYYY"}
              value={dayjs(`${FromatDatePiker(item.value)}`)}
              defaultValue="20-12-2023"
              onChange={(e) => {
               
                if (e) {
                  handleContentChange(
                    item,
                    index,
                    `${e?.date()}-${e?.month() + 1}-${e?.year()}`
                  );
                } else {
                  handleContentChange(item, index, `01-01-1970`);
                }
              }}
            />
          </div>
        );

      case "text":
        return (
          <div
            className={Styles["profile-status-modal-body__block"]}
            key={index}
          >
            <h5>{item.title}</h5>
            <Input
              value={item.value}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange(item, index, e.target.value)}
              placeholder="Nhập vào đây..."
            />
          </div>
        );
      default:
        return <div></div>;
    }
  };



  useEffect(() => {
    let currentSelect = 'viet-file'
   
    // if (partyAwarenessStatusList) {
    //   console.log({partyAwarenessStatusList})
    //   //Không biết vì sao nhưng api trả về data đã tồn tại một phần tử với type==null -> +1 index và check type
    //  if(partyAwarenessStatusList.length===1) {
    //   partyAwarenessStatusList[0]?.type ? currentSelect ='viet-cuon' : currentSelect='viet-file'
    //  }
    //  if(partyAwarenessStatusList.length===2) {
    //   partyAwarenessStatusList[1]?.type ? currentSelect ='xac-minh-su-tra' : currentSelect='viet-cuon'
    //  }
    //  if(partyAwarenessStatusList.length===3) {
    //   partyAwarenessStatusList[2]?.type ? currentSelect ='lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi' : currentSelect='xac-minh-su-tra'
    //  }
  
    // }
    if (partyAwarenessStatusList) {
      console.log({partyAwarenessStatusList})
      //Không biết vì sao nhưng api trả về data đã tồn tại một phần tử với type==null -> +1 index và check type
     if(partyAwarenessStatusList.length===1) {currentSelect ='viet-cuon'

     }
     if(partyAwarenessStatusList.length===2) {
      currentSelect ='xac-minh-su-tra'
     }
     if(partyAwarenessStatusList.length===3) {
      currentSelect ='lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi'
     }
  
    }
    setHtmlContent({
      ...htmlContent,
      profileStatus: {
        type: currentSelect,
        data: htmlContentTemplate.current[currentSelect],
        currentSelect
      },
    });
  }, [partyAwarenessStatusList]);

  const handleContentChange = (item, index, newValue) => {
    item.value = newValue;
    const htmlContentTemp = JSON.parse(
      JSON.stringify(htmlContent.profileStatus.data)
    );
    htmlContentTemp[index] = item;
    setHtmlContent({
      ...htmlContent,
      profileStatus: {
        type: htmlContent.profileStatus.type,
        data: htmlContentTemp,
        currentSelect:htmlContent.profileStatus.currentSelect
      },
    });
  };

  const handleSelectChange = (value) => {
    setHtmlContent({
      ...htmlContent,
      profileStatus: {
        type: value,
        data: htmlContentTemplate.current[value],
        currentSelect:value
      },
    });
  };
  return (
    <Modal
      open={open}
      width={450}
      closable={false}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      <div className={Styles["profile-status-modal"]}>
        <div className={Styles["profile-status-modal-header"]}>
          <h3 className={Styles["profile-status-modal-header__title"]}>
            thêm tình trạng hồ sơ
          </h3>
          <CloseOutlined onClick={() => setOpenModal(false)} />
        </div>

        <div className={Styles["profile-status-modal-body"]}>
          <div className={Styles["profile-status-modal-body__block"]}>
            <h5>Trạng thái</h5>
            <Select
              options={[
                {
                  value: "viet-file",
                  label: "Viết file",
                  disabled: isExistProfileStatus("viet-file"),
                },
                {
                  value: "viet-cuon",
                  label: "Viết cuốn",
                  disabled: isExistProfileStatus("viet-cuon") || partyAwarenessStatusList?.length<1,
                },
                {
                  value: "xac-minh-su-tra",
                  label: "Xác minh su tra",
                  disabled: isExistProfileStatus("xac-minh-su-tra") || partyAwarenessStatusList?.length<2,
                },
                {
                  value: "lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi",
                  label: "Lấy ý kiến các tổ chức chính trị xã hội",
                  disabled: isExistProfileStatus("lay-y-kien-cac-to-chuc-chinh-tri-xa-hoi") || partyAwarenessStatusList?.length<3,
                },
              ]}
              className={Styles["profile-status-modal-body__select"]}
              value={htmlContent.profileStatus.currentSelect}
              onChange={handleSelectChange}
            />
       
          </div>
          {htmlContent.profileStatus.data.map((item, index) =>
            renderHtmlFromType(item, index)
          )}
        </div>
        <div className={Styles["profile-status-modal-footer"]}>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={Styles["profile-status-modal-footer__btn__submit"]}
          >
            THÊM
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProfileStatusModal;
