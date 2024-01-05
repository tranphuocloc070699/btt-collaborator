import React, { useEffect, useState } from "react";
import Styles from "../AddProfileStatus/AddProfileStatus.module.css";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";
import { Modal, Space, Radio, DatePicker, Select,Input } from "antd";
import { FromatDatePiker } from "../../../utils/Time";
import TextArea from "antd/es/input/TextArea";

function UpdateProfileStatusModal({ open, setOpenModal, data, setData,onSubmit }) {
  const [htmlContent, setHtmlContent] = useState([]);

  const handleContentChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  useEffect(() => {
    switch (data.type) {
      case "file":
        setHtmlContent([
          <div className={Styles["profile-status-modal-body__block"]}>
            <h5>Ngày viết</h5>
            <DatePicker
              className={Styles["profile-status-modal-body__block__date"]}
              format={"DD-MM-YYYY"}
              value={dayjs(`${FromatDatePiker(data.start_date, "-", true)}`)}

              onChange={(e) => {
                if (e) {
                  handleContentChange(
                    "start_date",
                    `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                  );
                } else {
                  handleContentChange("start_date", `1970-01-01`);
                }
              }}
            />
          </div>,
          <div className={Styles["profile-status-modal-body__block"]}>
            <h5>Ngày hoàn thành</h5>
            <DatePicker
              className={Styles["profile-status-modal-body__block__date"]}
              format={"DD-MM-YYYY"}
              value={dayjs(`${FromatDatePiker(data.complete_date, "-", true)}`)}

              onChange={(e) => {
                if (e) {
                  handleContentChange(
                    "complete_date",
                    `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                  );
                } else {
                  handleContentChange("complete_date", `1970-01-01`);
                }
              }}
            />
          </div>,
        ]);
        break;
      case "book":
        setHtmlContent([
          <div className={Styles["profile-status-modal-body__block"]}>
            <h5>Ngày viết</h5>
            <DatePicker
              className={Styles["profile-status-modal-body__block__date"]}
              format={"DD-MM-YYYY"}
              value={dayjs(`${FromatDatePiker(data.start_date, "-", true)}`)}
              onChange={(e) => {
                if (e) {
                  handleContentChange(
                    "start_date",
                    `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                  );
                } else {
                  handleContentChange("start_date", `1970-01-01`);
                }
              }}
            />
          </div>,
          <div className={Styles["profile-status-modal-body__block"]}>
            <h5>Ngày hoàn thành</h5>
            <DatePicker
              className={Styles["profile-status-modal-body__block__date"]}
              format={"DD-MM-YYYY"}
              value={dayjs(`${FromatDatePiker(data.complete_date, "-", true)}`)}
              onChange={(e) => {
                if (e) {
                  handleContentChange(
                    "complete_date",
                    `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                  );
                } else {
                  handleContentChange("complete_date", `1970-01-01`);
                }
              }}
            />
          </div>,
        ]);
        break;
      case "verification":
        setHtmlContent([
          <div 
          // className={Styles["profile-status-modal-body__block"]}
          >
            <h5>Nơi đến xác minh su tra</h5>
            <Input
              value={data.verification_destination}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) =>
                handleContentChange("verification_destination", e.target.value)
              }
              placeholder="Nhập vào đây..."
            />
          </div>,
          <div 
          // className={Styles["profile-status-modal-body__block"]}
          >
            <h5>Đảng viên phụ trách</h5>
            <Input
              value={data.verification_party_member}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) =>
                handleContentChange("verification_party_member", e.target.value)
              }
              placeholder="Nhập vào đây..."
            />
          </div>,
        ]);
        break;
      case "opinion":
        setHtmlContent([
          <div 
          // className={Styles["profile-status-modal-body__block"]}
          >
            <h5>Đoàn thanh niên</h5>
            <Input
              value={data.opinion_youth_union}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) =>
                handleContentChange("opinion_youth_union", e.target.value)
              }
              placeholder="Nhập vào đây..."
            />
          </div>,
          <div 
          // className={Styles["profile-status-modal-body__block"]}
          >
            <h5>Công đoàn</h5>
            <Input
              value={data.opinion_trade_union}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) =>
                handleContentChange("opinion_trade_union", e.target.value)
              }
              placeholder="Nhập vào đây..."
            />
          </div>,
          <div 
          // className={Styles["profile-status-modal-body__block"]}
          >
            <h5>Cấp ủy nơi cư trú</h5>
            <Input
              value={data.opinion_residence_committee}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) =>
                handleContentChange(
                  "opinion_residence_committee",
                  e.target.value
                )
              }
              placeholder="Nhập vào đây..."
            />
          </div>,
        ]);
        break;
      default:
        break;
    }
  }, [data]);

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <Modal
      open={open}
      width={450}
      closable={false}
      footer={false}
      onCancel={() => {
        setOpenModal(false);
      }}
    >
      <div className={Styles["profile-status-modal"]}>
        <div className={Styles["profile-status-modal-header"]}>
          <h3 className={Styles["profile-status-modal-header__title"]}>
            chỉnh sửa tình trạng hồ sơ
          </h3>
          <CloseOutlined onClick={() => setOpenModal(false)} />
        </div>

        <div className={Styles["profile-status-modal-body"]}>
          <div className={Styles["profile-status-modal-body__block"]}>
            <h5>Trạng thái</h5>
            <Select
              className={Styles["profile-status-modal-body__select"]}
              value={data.title}
            />
          </div>
          {htmlContent.map((item, index) => (
            <div key={index} className={Styles['profile-status-modal-body__block']}>{item}</div>
          ))}
        </div>
        <div className={Styles["profile-status-modal-footer"]}>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={Styles["profile-status-modal-footer__btn__submit"]}
          >
            CHỈNH SỬA
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateProfileStatusModal;
