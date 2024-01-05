import React, { useState } from "react";
import Styles from "./AddPartySympathyClass.module.css";

import { CloseOutlined } from "@ant-design/icons";
import { DatePicker, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  createPartyAwarenessClassListHolder,
} from "../../../store/redux/slices/partyAwarenessClassSlice";
import {
  ErrorNotification
} from "../../../utils/Notification";
import { FromatDatePiker } from "../../../utils/Time";
import { setLoading } from "../../../store/redux/slices/loadingSlice";

function AddPartySympathyClassModal({ open, setOpenModal }) {

  const [data,setData]=  useState({
      go_to_class_date: "",
      issuance_date_certificate: "",
      classification: "kha"
  })
  const location = useLocation();
  const dispatch = useDispatch();
  const handleSubmit = () =>{
    if (data.go_to_class_date.length === 0) {
      ErrorNotification("Ngày đi học không được để trống");
      return;
    }
    if (
      data.issuance_date_certificate.length === 0
    ) {
      ErrorNotification("Ngày cấp không được để trống");
      return;
    }

    const startDateArr = data.go_to_class_date.split("-");
    const completedDateArr =
    data.issuance_date_certificate.split("-");

    // Compare year -> month -> day
    if (
      +completedDateArr[2] < +startDateArr[2] ||
      +completedDateArr[1] < +startDateArr[1] ||
      +completedDateArr[0] < +startDateArr[0]
    ) {
      ErrorNotification(
        `Ngày cấp không được nhỏ hơn ngày đi học`
      );
      return;
    }


    if(!location?.state?.id){
      ErrorNotification("Không tìm thấy Party awareness id từ location");
      return;
    }

    dispatch({
      type: setLoading.type,
      payload: false
    })

    dispatch({
      type: createPartyAwarenessClassListHolder.type,
      data: {
        party_awareness_id: location?.state?.id,
        go_to_class_date: data.go_to_class_date,
        issuance_date_certificate: data.issuance_date_certificate,
        classification: data.classification,
      },
      setOpenModal
    });

  }


  return (
    <Modal
      open={open}
      width={450}
      closable={false}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      <div className={Styles["party-sympathy-class-modal"]}>
        <div className={Styles["party-sympathy-class-modal-header"]}>
          <h3 className={Styles["party-sympathy-class-modal-header__title"]}>
            Thêm lớp học cảm tình Đảng
          </h3>
          <CloseOutlined onClick={() => setOpenModal(false)} />
        </div>

        <div className={Styles["party-sympathy-class-modal-body"]}>
          <div
            className={`${Styles["box_info-content"]}`}
          >
            <div
              className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}
            >
              <h5>Ngày đi học</h5>
              <DatePicker
                format={"DD-MM-YYYY"}
                placeholder="10-12-2023"
                value={
                  data.go_to_class_date?.length > 0
                    ? dayjs(
                        `${FromatDatePiker(data.go_to_class_date, "-", true)}`
                      )
                    : ""
                }
                onChange={(e) => {
                  if (e) {
                    setData({
                      ...data,
                      go_to_class_date:`${e?.year()}-${e?.month() + 1}-${e?.date()}`
                    })
                  } else {
                    setData({
                      ...data,
                      go_to_class_date:`1970-01-01`
                    })
                  }
                }}
              />
            </div>
            <div
              className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}`}
            >
              <h5>Ngày cấp</h5>
              <DatePicker
                format={"DD-MM-YYYY"}
                placeholder="10-12-2023"
                value={
                  data.issuance_date_certificate?.length > 0
                    ? dayjs(
                        `${FromatDatePiker(
                          data.issuance_date_certificate,
                          "-",
                          true
                        )}`
                      )
                    : ""
                }
                onChange={(e) => {
                  if (e) {
                    setData({
                      ...data,
                      issuance_date_certificate:`${e?.year()}-${e?.month() + 1}-${e?.date()}`
                    })
                  } else {
                    setData({
                      ...data,
                      issuance_date_certificate:`1970-01-01`
                    })
                  }
                }}
              />
            </div>
            <div
              className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}
            >
              <h5>Xếp loại</h5>
              <Select
                defaultValue="Khá"
                value={data.classification}
                options={[
                  { value: "trung-binh", label: "Trung bình" },
                  { value: "kha", label: "Khá" },
                  { value: "gioi", label: "Giỏi" },
                  {
                    value: "xuat-sac",
                    label: "Xuất sắc",
                  },
                ]}
                onChange={(value) =>
                  setData({
                    ...data,
                    classification:value
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className={Styles["party-sympathy-class-modal-footer"]}>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={Styles["party-sympathy-class-modal-footer__btn__submit"]}
          >
            THÊM
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddPartySympathyClassModal;
