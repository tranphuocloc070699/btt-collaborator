import React, { useEffect, useState } from "react";
import Styles from "./ProfileStatus.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import dotImg from "../../../assets/img/Dots.svg";
import arr001Img from "../../../assets/img/arr001.svg";
import { partyAwarenessStatusListSelector } from "../../../store/redux/selecters/index";
import { getPartyAwarenessStatusListHolder, updatePartyAwarenessStatusHolder } from "../../../store/redux/slices/partyAwarenessStatusSlice";
import {
  ErrorNotification
} from "../../../utils/Notification";
import AddProfileStatusModal from "../../Modal/AddProfileStatus/index";
import UpdateProfileStatusModal from "../../Modal/UpdateProfileStatus/index";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";
function ProfileStatus({setOnTab}) {
  const dispatch = useDispatch();


  const partyAwarenessStatusList = useSelector(partyAwarenessStatusListSelector);
  const location = useLocation()


  const [htmlContent, setHtmlContent] = useState({
    profile: [],
    headerPopupControls: [
      {
        title: "Thêm",
        ACTION: "ADD",
      },
    ],
  });
  const [profileStatusUpdateItem,setProfileStatusUpDateItem] = useState({});

  useEffect(() =>{
    if(location?.state?.id){
      const metadata = {
        page:1,
        page_size:10,
        sort_by:'id',
        order:'desc',
        party_awareness_id:location?.state?.id
      }

      dispatch({
        type:getPartyAwarenessStatusListHolder.type,
        data:metadata
      })
    }
  },[location?.state?.id])


  useEffect(() => {
    
    if (partyAwarenessStatusList && partyAwarenessStatusList.length>0) {
      
      const content = extractStatusFromObj(
        JSON.parse(JSON.stringify(partyAwarenessStatusList))
      );
     
      setHtmlContent(content);
    }else{
      setHtmlContent(
        {
          profile: [],
          headerPopupControls: [
            {
              title: "Thêm",
              ACTION: "ADD",
            },
          ],
        }
      )
    }
  }, [partyAwarenessStatusList]);



  const revertDate = (date) =>{
    const [year, month, day] =
          date.split("-");

          return `${day}-${month}-${year}`
  }
  const extractStatusFromObj = (dataOriginal) => {
   
    if (!dataOriginal) {
      alert("[extractStatusFromObj] dataOriginal undefined");
      return;
    }
    if(dataOriginal.length===0) return;


   
    let content = {  profile: [],
      headerPopupControls: [
        {
          title: "Thêm",
          ACTION: "ADD",
        },
      ],}



    // Check data type -> return specific item and remove all other object , let i = content.profile[number]
    let data = [];
    dataOriginal.forEach(item => {
      if(item.type==='file') data[0] = item;
      if(item.type==='book') data[1] = item;
      if(item.type==='verification') data[2] = item;
      if(item.type==='opinion') data[3] = item;
    })
    


    if(data && data.length>0){
      data.forEach(item => {
        delete item.created_at;
        delete item.updated_at;
        delete item.deleted_at;
        switch (item.type) {
          case "file": {
            content.profile.push({
              ...item,
              title: "Viết file",
              line: [
                {
                  type: "dot",
                  title: "Ngày viết",
                  content: revertDate(item.start_date),
                },
                {
                  type: "dot",
                  title: "Ngày hoàn thành",
                  content: revertDate(item.complete_date),
                },
              ],
            })
            break;
          }
          case "book": {
            content.profile.push({
              ...item,
              title: "Viết cuốn",
              line: [
                {
                  type: "dot",
                  title: "Ngày viết",
                  content: revertDate(item.start_date),
                },
                {
                  type: "dot",
                  title: "Ngày hoàn thành",
                  content: revertDate(item.complete_date),
                },
              ],
            });
            break;
          }
          case "verification": {
            content.profile.push({
              ...item,
              title: "Xác minh su tra",
              line: [
                {
                  type: "semi",
                  title: "Nơi đến xác minh su tra",
                  content: item.verification_destination,
                },
                {
                  type: "semi",
                  title: "Đảng viên phụ trách",
                  content: item.verification_party_member,
                },
              ],
            });
            break;
          }
          case "opinion": {
            content.profile.push({
              ...item,
              title: "Lấy ý kiến các tổ chức chính trị xã hội",
              line: [
                {
                  type: "block",
                  title: "Đoàn thanh niên",
                  content: item.opinion_youth_union,
                },
                {
                  type: "block",
                  title: "Công đoàn",
                  content: item.opinion_trade_union,
                },
                {
                  type: "block",
                  title: "Cấp ủy nơi cư trú",
                  content: item.opinion_residence_committee,
                },
              ],
            });
            break;
          }
          default:
            break;
        }
      })
    }
    return content;
  };
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const openPopup = (action) => {
    switch (action) {
      case "ADD":
        setOpenModal(true);
        break;

      default:
        break;
    }
  };

  const handleClickEdit = (block) =>{
    const blockTransform = JSON.parse(JSON.stringify(block));
    delete blockTransform.line;
    
    setProfileStatusUpDateItem(blockTransform);
    setOpenUpdateModal(true);
  }

  const handleNavigateToNextStep = () =>{
    setOnTab(prevState => prevState + 1)
  }


  const handleUpdateProfileStatus = (data) =>{

      const dataTranforms = JSON.parse(JSON.stringify(data));
      delete dataTranforms.party_awareness_id;
      delete dataTranforms.title;


      if(dataTranforms.type=='file' || dataTranforms.type=='book'){
        const startDateArr = dataTranforms.start_date.split("-");
        const completedDateArr =
          dataTranforms.complete_date.split("-");

        // Compare year -> month -> day
        if (
          +completedDateArr[2] < +startDateArr[2] ||
          +completedDateArr[1] < +startDateArr[1] ||
          +completedDateArr[0] < +startDateArr[0]
        ) {
          ErrorNotification(
            `Ngày hoàn thành không được nhỏ hơn ngày viết`
          );
          return;
        }
      }

      dispatch({
        type:updatePartyAwarenessStatusHolder.type,
        data:{...dataTranforms},
        setOpenModal:setOpenUpdateModal
      })

      
  }

  return (
    <div className={Styles["AnalysisResult"]}>
      <div className={Styles["profile-status-container"]}>
        <div className={Styles["profile-status-header"]}>
          <h3 className={Styles["profile-status-header__title"]}>
            Tình trạng hồ sơ
          </h3>
          <div className={Styles["profile-status-header__controls"]}>
            <img src={dotImg} />
            <div className={Styles["profile-status-header__controls__popup"]}>
              {htmlContent.headerPopupControls.map((item, index) => (
                <div
                  key={index}
                  className={
                    Styles["profile-status-header__controls__popup__item"]
                  }
                  onClick={() => openPopup(item.ACTION)}
                >
                  <PlusOutlined />
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={Styles["profile-status-body"]}>
          {htmlContent.profile.map((block, index) => (
            <div className={Styles["profile-status-body__block"]} key={index}>
              <h4 className={Styles["profile-status-body__block__title"]}>
                <img
                  src={arr001Img}
                  className={Styles["profile-status-body__block__title__icon"]}
                />
                <span>{block.title}</span>
                <EditOutlined 
                title="Chỉnh sửa"
                style={{cursor:'pointer'}}
                onClick={() => handleClickEdit(block)}
                />
              </h4>
              {block.line.map((line, lineIndex) => (
                <h5
                  key={lineIndex}
                  className={
                    Styles["profile-status-body__block__line"] +
                    (line.type === "block" ? " " + Styles["block"] : "")
                  }
                >
                  {line.title}
                  <span
                    className={
                      Styles[
                        `profile-status-body__block__line__divide__${line.type}`
                      ]
                    }
                  >
                    {line.type === "semi" && ":"}
                  </span>
                  <span
                    className={
                      Styles[`profile-status-body__block__line__content`] +
                      (line.type === "block" ? " " + Styles["block"] : "")
                    }
                  >
                    {line.content}
                  </span>
                </h5>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={Styles["box-confirm"]}>
        <button className={Styles['box-confirm__btn']} onClick={handleNavigateToNextStep}>Tiếp theo</button>
      </div>
      <AddProfileStatusModal open={openModal} setOpenModal={setOpenModal} />
      <UpdateProfileStatusModal open={openUpdateModal} setOpenModal={setOpenUpdateModal} data={profileStatusUpdateItem} setData={setProfileStatusUpDateItem} onSubmit={handleUpdateProfileStatus} />
    </div>
  );
}

export default ProfileStatus;
