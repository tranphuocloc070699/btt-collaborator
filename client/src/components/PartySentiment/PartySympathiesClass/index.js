import React, { useEffect, useState } from "react";
import Styles from "./PartySympathiesClass.module.css";

import { DatePicker, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  partyAwarenessClassListSelector,
  partySentimentByIdSelecter,
} from "../../../store/redux/selecters/index";
import {
  getPartyAwarenessClassListHolder,
  createPartyAwarenessClassListHolder,
  updatePartyAwarenessClassListHolder,
} from "../../../store/redux/slices/partyAwarenessClassSlice";
import ButtonConfirm from "../../Button";
import { FromatDatePiker } from "../../../utils/Time";
import dayjs from "dayjs";
import { ErrorNotification } from "../../../utils/Notification";
import plus from "../../../assets/img/plus.svg";
import minus from "../../../assets/img/minus.svg";
import dotImg from "../../../assets/img/Dots.svg"
import {useLocation} from 'react-router-dom'
import AddPartySympathyClassModal from "../../Modal/AddPartySympathyClass";
function PartySympathiesClass() {
  const partyAwarenessClassData = useSelector(partyAwarenessClassListSelector);
  const PartySentimentByID = useSelector(partySentimentByIdSelecter);

  const [arrData, setArrData] = useState([
    // {
    //   go_to_class_date: "",
    //   issuance_date_certificate: "",
    //   classification: "",
    //   is_expanded: true,
    // },
  ]);

  const location = useLocation();

  const [cssExpandControlList, setCssExpandControlList] = useState([]);

  const [indexChangingList, setIndexChangingList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location?.state?.id) {
      console.log('location chaging...')
      const data = {
        page_size: 100,
        page: 1,
        sort_by: "id",
        order: "desc",
        party_awareness_id: location?.state?.id,
      };
      dispatch({
        type: getPartyAwarenessClassListHolder.type,
        data,
      });
    } else {
      alert("PartySentimentByID undefined, check log");
      console.error({ PartySentimentByID });
    }

  }, [location?.state?.id]);

  const handleContentChange = (key, index, newValue) => {
    let arrTemp = JSON.parse(JSON.stringify(arrData));
    if (arrTemp[index][key] != newValue) {
      // store index to call api update or post
      if (!indexChangingList.includes(index)) {
        indexChangingList.push(index);
      }
      arrTemp[index][key] = newValue;
      setArrData(arrTemp);
    } else {
      if (indexChangingList.indexOf(index) != -1) {
        indexChangingList.splice(indexChangingList.indexOf(index));
      }
    }
  };

  const handleCssExpandControls = (index) => {
    let arrTemp = JSON.parse(JSON.stringify(arrData));
    arrTemp[index].is_expanded = !arrTemp[index].is_expanded;
    setArrData(arrTemp);
  };

  const handleSubmit = () => {
    if (indexChangingList.length > 0) {
      if (arrData[indexChangingList[0]].go_to_class_date.length === 0) {
        ErrorNotification("Ngày đi học không được để trống");
        return;
      }
      if (
        arrData[indexChangingList[0]].issuance_date_certificate.length === 0
      ) {
        ErrorNotification("Ngày cấp không được để trống");
        return;
      }

      if (arrData[indexChangingList[0]].classification.length === 0) {
        ErrorNotification("Xếp loại không được để trống");
        return;
      }

      const startDateArr = arrData[indexChangingList[0]].go_to_class_date.split("-");
      const completedDateArr =
      arrData[indexChangingList[0]].issuance_date_certificate.split("-");

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

      indexChangingList.forEach((item) => {
        const data = arrData[item];
        //update
        if (data.id) {
          dispatch({
            type: updatePartyAwarenessClassListHolder.type,
            data: {
              id: data.id,
              go_to_class_date: data.go_to_class_date,
              issuance_date_certificate: data.issuance_date_certificate,
              classification: data.classification,
            },
          });
        }
        //create
        else {
          dispatch({
            type: createPartyAwarenessClassListHolder.type,
            data: {
              party_awareness_id: PartySentimentByID.id,
              go_to_class_date: data.go_to_class_date,
              issuance_date_certificate: data.issuance_date_certificate,
              classification: data.classification,
            },
          });
        }
      });
    }
  };

  useEffect(() => {

    if (partyAwarenessClassData && partyAwarenessClassData.length > 0) {
      const data = partyAwarenessClassData.map((item) => {
        return {
          ...item,
          is_expanded: true,
        };
      });
      setArrData(data);
    }else{
     
      setArrData([
        {
          go_to_class_date: "",
          issuance_date_certificate: "",
          classification: "",
          is_expanded: true,
        }
      ])
    }
  }, [partyAwarenessClassData]);
  return (
    <div className={Styles["box_info"]}>
      <div className={`${Styles["box_info-titles"]} ${Styles['flex']}`}>
        <h3>Lớp cảm tình Đảng</h3>
        {/* {
          arrData.length>=1 && (
            
          )
        } */}
        <div className={Styles["profile-status-header__controls"]}>
            <img src={dotImg} />
            <div className={Styles["profile-status-header__controls__popup"]}>      
                <div
                  className={
                    Styles["profile-status-header__controls__popup__item"]
                  }
                  onClick={() => setOpenModal(true)}
                >
                  Thêm
                </div>
            </div>
          </div>
      </div>
      {arrData.map((item, index) => (
        <div
          className={`${Styles["party-sympathies-body"]} ${
            item.is_expanded ? Styles["expanded"] : Styles["collapsed"]
          }`}
        >
          <div className={`${Styles["party-sympathies-body-counter"]} ${
            item.is_expanded ? Styles["expanded"] : Styles["collapsed"]
          }`}>
            <div className={`${Styles["party-sympathies-body-counter__node"]}`}>
              Lần {index + 1}
              <div
                className={Styles["party-sympathies-body-counter__node__icon"]}
                onClick={() => handleCssExpandControls(index)}
              >
                <img src={item.is_expanded ? minus : plus} />
              </div>
            </div>
          </div>
          <div
            className={`${Styles["box_info-content"]} ${
              item.is_expanded ? Styles["expanded"] : Styles["collapsed"]
            }`}
            key={index}
          >
            <div
              className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}
            >
              <h5>Ngày đi học</h5>
              <DatePicker
                format={"DD-MM-YYYY"}
                placeholder="10-12-2023"
                value={
                  item.go_to_class_date?.length > 0
                    ? dayjs(
                        `${FromatDatePiker(item.go_to_class_date, "-", true)}`
                      )
                    : ""
                }
                onChange={(e) => {
                  if (e) {
                    handleContentChange(
                      "go_to_class_date",
                      index,
                      `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                    );
                  } else {
                    handleContentChange(
                      "go_to_class_date",
                      index,
                      `1970-01-01`
                    );
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
                  item.issuance_date_certificate?.length > 0
                    ? dayjs(
                        `${FromatDatePiker(
                          item.issuance_date_certificate,
                          "-",
                          true
                        )}`
                      )
                    : ""
                }
                onChange={(e) => {
                  if (e) {
                    handleContentChange(
                      "issuance_date_certificate",
                      index,
                      `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                    );
                  } else {
                    handleContentChange(
                      "issuance_date_certificate",
                      index,
                      `1970-01-01`
                    );
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
                value={item.classification}
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
                  handleContentChange("classification", index, value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      <div className={Styles["box-confirm"]}>
        <button
          class={Styles["box-confirm__btn__submit"]}
          onClick={handleSubmit}
        >
          HOÀN THÀNH
        </button>
      </div>
      <AddPartySympathyClassModal open={openModal}setOpenModal={setOpenModal}/>
    </div>
  );
}

export default PartySympathiesClass;
