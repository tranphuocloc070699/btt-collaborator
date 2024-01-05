import React, { useCallback } from "react";
import Styles from "./Party_sentiment_information.module.css";
import dayjs from "dayjs";
import { FromatDatePiker } from "../../../utils/Time";
import { DatePicker, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPartySentimentById } from "../../../store/redux/slices/partySentimentSlice";
import { partySentimentByIdSelecter } from "../../../store/redux/selecters";
import ButtonConfirm from "../../Button";
import { updatePartySentment } from "../../../store/redux/slices/partySentimentSlice";
import { ErrorNotification } from "../../../utils/Notification";
import {
  depListSelecter,
  PartyMemberCellSelecter,
} from "../../../store/redux/selecters";
import {
  getDepartments,
  getPartyMemberCell,
} from "../../../store/redux/slices/profileSlice";

function PartySentimentInformation({ tabIndex, setOnTab }) {
  const [storePartySentiment, setStorePartySentiment] = useState({
    party_awareness_cell: "",
    review_date: "",
    member_help: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const PartySentimentByID = useSelector(partySentimentByIdSelecter);

  const PartyMemberCell = useSelector(PartyMemberCellSelecter);
  const dep = useSelector(depListSelecter);
  const [options, setOptions] = useState([]);
  const ChangeSortPartyMember = (key, value) => {
    setStorePartySentiment({
      ...storePartySentiment,
      [key]: value,
    });
  };

  useEffect(() => {
    if (PartyMemberCell && PartyMemberCell.length > 0) {
      setOptions(
        PartyMemberCell.map((item) => {
          return {
            label: item,
            value: item,
          };
        })
      );
    }
  }, [PartyMemberCell, dep]);

  useEffect(() => {
    const callApiFollowOnPage = "party-awareness";
    dispatch({
      type: getPartyMemberCell.type,
      data: callApiFollowOnPage,
    });
  }, []);

  

  const HandelUpdate = useCallback(() => {
    if (storePartySentiment && Object.keys(storePartySentiment).length > 0) {
      // let content = {
      //   status: {},
      //   awareness: {},
      // };

      let content = {};

      //Validate
      if (
        !storePartySentiment?.party_awareness_cell ||
        storePartySentiment?.party_awareness_cell?.trim().length === 0
      ) {
        return ErrorNotification("Chi bộ không được để trống");
      }
      if (
        !storePartySentiment?.review_date ||
        storePartySentiment?.review_date?.trim().length === 0
      ) {
        return ErrorNotification("Ngày xét cảm tình Đảng không được để trống");
      }

      if (
        !storePartySentiment?.member_help ||
        storePartySentiment?.member_help?.trim().length === 0
      ) {
        return ErrorNotification("Đảng viên giúp đỡ không được để trống");
      }

      // content.awareness.party_awareness_cell =
      //   storePartySentiment.party_awareness_cell;
      // content.awareness.review_date = storePartySentiment.review_date;
      // content.awareness.member_help = storePartySentiment.member_help;

      content.party_awareness_cell = storePartySentiment.party_awareness_cell;
      content.review_date = storePartySentiment.review_date;
      content.member_help = storePartySentiment.member_help;

      // content.status = extractStatusFromObj(
      //   storePartySentiment.party_awareness_status
      // );

      dispatch({
        type: updatePartySentment.type,
        data: {
          ...content,
          id: location.state?.id,
        },
        setOnTab,
      });
    }
  }, [storePartySentiment]);


  // Lấy dữ liệu cảm tình đoàn
  useEffect(() => {
    dispatch({
      type: getPartySentimentById.type,
      data: { id: location?.state?.id },
    });
  }, [location?.state?.id]);

  useEffect(() => {
    if (PartySentimentByID && Object.keys(PartySentimentByID).length > 0) {
      setStorePartySentiment(PartySentimentByID);
    }
  }, [PartySentimentByID]);

  const onSelectChange = (e) => {
    ChangeSortPartyMember("party_awareness_cell", e)
  };

  return (
    <div className={Styles["box_info"]}>
      <div className={Styles["box_info-titles"]}>
        <h3>Chi bộ cảm tình Đảng</h3>
      </div>
      <div className={Styles["box_info-content"]}>
        <div className={`${Styles["box_selected"]} ${Styles['select']}`}>
          <h5>Tên</h5>
          <Input
            placeholder=""
            value={location.state?.name}
            // value={storePartySentiment.party_awareness_cell}
          />
         
        </div>
        <div className={`${Styles["box_selected"]} ${Styles['select']}`}>
          <h5>Chi bộ</h5>
          {/* <Input
            placeholder="Chi bộ tòa Soạn 3"
            onChange={(e) =>
              ChangeSortPartyMember("party_awareness_cell", e.target.value)
            }
            value={storePartySentiment.party_awareness_cell}
          /> */}
          <Select
            value={storePartySentiment.party_awareness_cell || ''}
            placeholder="Chọn chi bộ"
            onChange={onSelectChange}
            options={options}
          />
        </div>
        <div className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}`}>
          <h5>Ngày xét cảm tình Đảng</h5>
          <DatePicker
            placeholder="20/12/2020"
            format={"DD-MM-YYYY"}
            value={
              storePartySentiment.review_date
                ? dayjs(
                    `${FromatDatePiker(storePartySentiment.review_date, false)}`
                  )
                : ""
            }
            onChange={(e) => {
              ChangeSortPartyMember(
                "review_date",
                e ? `${e?.year()}-${e?.month() + 1}-${e?.date()}` : ""
              );
            }}
          />
        </div>
        <div className={Styles["box_selected"]}>
          <h5>Đảng viên giúp đỡ</h5>
          <Input
            placeholder="Đảng viên giúp đỡ"
            onChange={(e) =>
              ChangeSortPartyMember("member_help", e.target.value)
            }
            value={storePartySentiment.member_help}
          />
        </div>
      </div>
      <div className={Styles["box-confirm"]}>
        <button className={Styles["box-confirm__btn"]} onClick={HandelUpdate}>
          Tiếp theo
        </button>
      </div>
    </div>
  );
}

export default PartySentimentInformation;
