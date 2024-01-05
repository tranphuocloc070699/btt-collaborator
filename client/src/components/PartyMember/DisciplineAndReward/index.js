import React, { useEffect } from "react";
import Styles from "./DisciplineAndReward.module.css";
import dayjs from "dayjs";

import { Select,DatePicker,Button,Table, Tabs } from "antd";
import { columns } from "./table";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DropdownIndex from "../../DropdownIndex";
import TextArea from "antd/es/input/TextArea";
import ButtonConfirm from "../../Button";
import RewardAndDiscipline from "../../Modal/RewardAndDiscipline";

import {
  partyBadgeListSelecter,
  rewardAndDisciplineListSelector,
  TotalItemsrewardAndDisciplineListSelector,
  partyBadgeTotalItems
} from "../../../store/redux/selecters/index";

import {
  getRewardAndDisciplineListHolder,
  createRewardAndDisciplineListHolder,
  updateRewardAndDisciplineListHolder,
} from "../../../store/redux/slices/rewardAndDisciplineSlice";

import {
  getpartyBadgeList,
  CretatepartyBadgeById,
  UpdatepartyBadgeById
} from "../../../store/redux/slices/partyBadgeSlice";

import { FromatDatePiker } from "../../../utils/Time";
import { ErrorNotification, WarnNotification } from "../../../utils/Notification";
import { buildData } from "../../../utils/TableConfig";
import { setLoading } from "../../../store/redux/slices/loadingSlice";


function DisciplineAndReward({ tabIndex, setOnTab }) {
  const [openModel, setOpenModel] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [page, setPage] = useState({
    page: 1,
    page_size: 10,
    sort_by: "id",
    order: "desc",
    party_member_id: 0,
  });
  const [pageBadge, setPageBadge] = useState({
    page: 1,
    page_size: 10,
    sort_by: "id",
    order: "desc",
    party_member_id: 0,
  });
  const [ConvertForm,setConvertForm] = useState(false) // Chuyển đổi qua huy hiệu Đảng
  const [activekeysTab,setActivekeysTab] = useState("1") // Chuyển đổi

  const rewardAndDisciplineList = useSelector(rewardAndDisciplineListSelector);
  const total_itemsBadge= useSelector(partyBadgeTotalItems);
  const total_items = useSelector(TotalItemsrewardAndDisciplineListSelector);
  const partyBadgeList = useSelector(partyBadgeListSelecter);

  const [
    createRewardAndDisciplineContent,
    setCreateRewardAndDisciplineContent,
  ] = useState({
    type: "khen-thuong",
    formality: "string",
    decision_number: "string",
    content: "",
    date: "",
    party_member_id: 0,
    party_badge: ""
  });

  const [
    updateRewardAndDisciplineContent,
    setUpdateRewardAndDisciplineContent,
  ] = useState({
    id: 0,
    type: "khen-thuong",
    formality: "string",
    decision_number: "string",
    content: "",
    date: "",
    party_badge: ""
  });

  const dispatch = useDispatch();
  const location = useLocation();

  // Save value huy hieu, ky luat, khen thuong
  const changeRewardAndDisciplineContent = (key, value) => {
    setCreateRewardAndDisciplineContent({
      ...createRewardAndDisciplineContent,
      [key]: value,
    });
  };

  // Create huy hieu, ky luat, khen thuong
  const handleCreateRewardAndDiscipline = () => {
    if (createRewardAndDisciplineContent.date.length === 0) {
      ErrorNotification("Ngày không được để trống");
      return;
    }
    if (createRewardAndDisciplineContent?.content.trim().length === 0) {
      ErrorNotification("Nội dung không được để trống");
      return;
    }
    dispatch({
      type: setLoading.type,
      payload: false
    })
    if(createRewardAndDisciplineContent.type !== "huy-hieu"){
      dispatch({
        type: createRewardAndDisciplineListHolder.type,
        data: {
          ...createRewardAndDisciplineContent,
          party_member_id: location?.state?.id
        },
        setCreateRewardAndDisciplineContent    
      });       
    }else{
      dispatch({
            type: CretatepartyBadgeById.type,
            data: {
              party_badge: createRewardAndDisciplineContent.content,
              date: createRewardAndDisciplineContent.date,
              party_member_id: location?.state?.id
            },
            setCreateRewardAndDisciplineContent
      })
    }
  };

  // Update huy hieu, ky luat, khen thuong
  const handleUpdateSubmit = async () => {
    if (updateRewardAndDisciplineContent.date.length === 0) {
      WarnNotification("Ngày không được để trống");
      return;
    }
    if(!updateRewardAndDisciplineContent?.type){
      if (!updateRewardAndDisciplineContent?.party_badge) {
        WarnNotification("Huy hiệu không được để trống");
        return;
      }
    }else{
      if (!updateRewardAndDisciplineContent?.content) {
        ErrorNotification("Nội dung không được để trống");
        return;
      }
    }

    dispatch({
      type: setLoading.type,
      payload: false
    })
    if(!updateRewardAndDisciplineContent?.type){
      await dispatch({
        type: UpdatepartyBadgeById.type,
        data: {
          ...updateRewardAndDisciplineContent
        },
        setUpdateRewardAndDisciplineContent,
        setOpenUpdateModal
      })
    }else{
       await  dispatch({
           type: updateRewardAndDisciplineListHolder.type,
           data: {
             ...updateRewardAndDisciplineContent,
           },
           setOpenUpdateModal
       });
   
       setCreateRewardAndDisciplineContent({
         type: "khen-thuong",
         formality: "string",
         decision_number: "string",
         content: "",
         date: "",
         party_member_id: 0,
       })
    }
  };

  // Get data edit huy hieu, ky luat, khen thuong
  const handleEditRewardAndDiscipline = (record) => { 
    if (!openUpdateModal && record.id) {
      setOpenUpdateModal(true);
      if(record.party_member_id) delete record.party_member_id
      setUpdateRewardAndDisciplineContent(record);
    }else{
      alert('Không có id')
    }
  };

  // Get huy hieu, ky luat, khen thuong
  const getListOnTabs = (checkCallAPi)=>{
    const GetListSlice = [ getRewardAndDisciplineListHolder, getpartyBadgeList]
    const pageFollow = [ page, pageBadge ]

    dispatch({
      type: GetListSlice[+checkCallAPi - 1].type,
      data: {
        ...pageFollow[+checkCallAPi - 1],
        party_member_id: location.state?.id,
      },
    });
    changeRewardAndDisciplineContent("party_member_id", location.state?.id);
  }

  // Items on Tab
  const ShowTableFollowTab = (data,page,total,setPage)=>{
    return (
      <div className={Styles["box_info-table"]}>
          <Table
              columns={columns(handleEditRewardAndDiscipline)}
              dataSource={buildData(data)}
              pagination={{
                total: total?.total_items,
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5","10","15"],
              }}
              onChange={(pageOption)=>{
                setPage({...page, page_size: pageOption.pageSize, page: pageOption.current })
              }}
          />
      </div>
    )
  }
  const items = [
    {
      key: '1',
      label: 'Kỷ luật, khen thưởng',
      children: ShowTableFollowTab(rewardAndDisciplineList,page,total_items,setPage)
    },
    {
      key: '2',
      label: 'Huy hiệu Đảng',
      children: ShowTableFollowTab(partyBadgeList,pageBadge,total_itemsBadge,setPageBadge)
    },
  ];

  useEffect(() => {
    getListOnTabs(activekeysTab)
  }, [page,pageBadge,activekeysTab]);

  return (
    <div className={Styles["AnalysisResult"]}>
      <div className={Styles["box_info-titles"]}>
        <h3>Kỷ luật, khen thưởng, huy hiệu Đảng</h3>
      </div>
      {tabIndex && DropdownIndex(tabIndex, openModel, setOpenModel)}
      <div className={Styles["box_info-content"]}>
        <div className={Styles["box_info-number"]}>
          <div
            className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}
          >
            <h5>Chọn khen thưởng/ kỷ luật, huy hiệu Đảng</h5>
            <Select
              placeholder="Khen thưởng"
              value={createRewardAndDisciplineContent.type}
              onChange={(value) =>{
                changeRewardAndDisciplineContent("type", value)
                // Sử dụng riêng cho huy hiệu Đảng
                if(value == "huy-hieu"){
                    setConvertForm(true)
                    setActivekeysTab("2")
                  }else{
                    setActivekeysTab("1")
                    setConvertForm(false)
                  }
              }
              }
              options={[
                {
                  value: "khen-thuong",
                  label: "Khen thưởng",
                },
                {
                  value: "ky-luat",
                  label: "Kỷ luật",
                },
                {
                  value: "huy-hieu",
                  label: "Huy hiệu Đảng",
                },
              ]}
            />
          </div>
          <div
            className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}`}
          >
            <h5>Ngày</h5>
            <DatePicker
              placeholder=""
              format={"DD-MM-YYYY"}
              value={
                createRewardAndDisciplineContent.date.length > 0
                  ? dayjs(
                      `${FromatDatePiker(
                        createRewardAndDisciplineContent.date
                      )}`
                    )
                  : ""
              }
              onChange={(e) => {
                if (e) {
                  changeRewardAndDisciplineContent(
                    "date",
                    `${e?.date()}-${e?.month() + 1}-${e?.year()}`
                  );
                } else {
                  changeRewardAndDisciplineContent("date", ``);
                }
              }}
            />
          </div>
        </div>
        <div className={`${Styles["box_selected"]} ${Styles["box_textarea"]}`}>
          { ConvertForm ? <h5>Huy hiệu Đảng</h5> : <h5>Nội Dung</h5> }
          <TextArea
            maxLength={200}
            placeholder={""}
            value={createRewardAndDisciplineContent.content}
            onChange={(e) =>
              changeRewardAndDisciplineContent("content", e.target.value)
            }
          />
        </div>
      </div>
      <div className={Styles["box_info-add"]}>
        <div></div>
        <Button type="ghost" onClick={() => handleCreateRewardAndDiscipline()}>
          THÊM
        </Button>
      </div>
      <Tabs defaultActiveKey="1"  activeKey={activekeysTab} items={items} onChange={(active)=>{  setActivekeysTab(active)}} />
      <div className={Styles["box-confirm"]}>
        <ButtonConfirm HandelUpdate={()=>setOnTab(tabIndex + 1)} title={"Tiếp theo"} />
      </div>
      <RewardAndDiscipline
        data={updateRewardAndDisciplineContent}
        open={openUpdateModal}
        setOpenModel={setOpenUpdateModal}
        setData={(key, value) => {
          setUpdateRewardAndDisciplineContent({
            ...updateRewardAndDisciplineContent,
            [key]: value,
          });
          
        }}
        handleUpdateSubmit = { handleUpdateSubmit }
      />
    </div>
  );
}

export default DisciplineAndReward;
