import React, { useEffect, useState } from "react";
import Styles from "./PartySentiment.module.css";
import dayjs from "dayjs";

import { FromatDatePiker } from "../../../utils/Time";
import { Modal, Radio, Space, Input, DatePicker, Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { optionSelect, ActionStatus } from "./option";
import {  createPartySentiment, updatePartySentment } from "../../../store/redux/slices/partySentimentSlice"
import { 
    depListSelecter,
    PartyMemberCellSelecter,
    PrrofileListSelecter
 } from "../../../store/redux/selecters"
import { getDepartments, getProfileList, getPartyMemberCell} from "../../../store/redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import PartySentimentStatus from "../PartySentimentStatus";
import { WarnNotification } from "../../../utils/Notification";

function PartySentimentPopup({open,setOpen}) {
    
    const [openModelStatus,setOpenModelStatus] = useState("");
    const [storePartySentiment,setStortPartySentiment] = useState({})


    const dispatch = useDispatch()
    const profileList = useSelector(PrrofileListSelecter)
    const depList = useSelector(depListSelecter)
    const PartyMemberCell = useSelector(PartyMemberCellSelecter)

    // Thêm mới thành viên cảm tình Đảng
    const OnCreatePartySentiment = (status)=>{
        dispatch({
            type: createPartySentiment.type,
            data: {
                pro_id: storePartySentiment.pro_id,
                party_awareness_cell: storePartySentiment.party_awareness_cell,
                review_date: storePartySentiment.review_date,
                member_help: storePartySentiment.member_help,
            },
            setStortPartySentiment,
            setOpen
        })
    }

    const ChangeSortPartySentiment = (key,value)=>{
        setStortPartySentiment({
            ...storePartySentiment,
            [key]: value
        })
    }


    // Danh sachs profile
    const ChangeSelectFollowDeps = (value)=>{
        dispatch({
            type: getProfileList.type,
            data: {
                page: 1,
                page_size : 9999,
                sort_by: "created_at",
                order: "desc",
                dep_names: value
            }
        })
        setStortPartySentiment({
            ...storePartySentiment,
            pro_id : ""
        })

    }

    const getListProfile = ()=>{
        dispatch({
            type: getProfileList.type,
            data: {
                page: 1,
                page_size : 9999,
                sort_by: "created_at",
                order: "desc",
                dep_names: ""
            }
        })
    }

    return ( 
        <Modal
            open={open}
            width={500}
            closable={false}
            footer={false}
            onCancel={()=>setOpen(false)}
        >
            <div className={Styles["box_analysis"]}>
           <div className={Styles["box_analysis-title"]}>
                <h3>THÊM THÀNH VIÊN CẢM TÌNH ĐẢNG</h3>
                <CloseOutlined onClick={()=>setOpen(false)}/>
           </div>
           {/* <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Phòng ban</h5>
                <Select 
                    options={depList.map((dep)=>{
                        return {
                            value: dep,
                            label: dep
                        }
                    })}
                    placeholder=""  
                    showSearch
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    onChange={(value) => ChangeSelectFollowDeps(value)}
                />
           </div> */}
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Tên</h5>
                <Select
                    options={profileList.map((profile)=>{
                
                        return {
                            value: profile.id,
                            label: profile.full_name
                        }
                    })}
                    onFocus={()=>getListProfile()}
                    showSearch
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    onChange={(e)=>{
                        ChangeSortPartySentiment("pro_id",e)
                    }}
                    value={storePartySentiment?.pro_id}

                    
                />
           </div>
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Chi bộ</h5>
                <Input 
                    onChange={(e)=>ChangeSortPartySentiment("party_awareness_cell",e.target.value)}
                    value={storePartySentiment.party_awareness_cell}
                />
                {/* <Select 
                    options={PartyMemberCell.map((PartyMemberCell)=>{
                        return {
                            value:PartyMemberCell,
                            label:PartyMemberCell
                        }
                    })}
                    showSearch
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    onChange={(e)=>{
                        ChangeSortPartySentiment("party_awareness_cell",e)
                    }}
                /> */}
           </div>
           <div className={Styles["box_selected"]}>
                <h5>Đảng viên giúp đỡ</h5>
                <Input 
                    onChange={(e)=>ChangeSortPartySentiment("member_help",e.target.value)}
                    value={storePartySentiment.member_help}
                />
           </div>
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Ngày xét cảm tình Đảng</h5>
                <DatePicker 
                    placeholder=""
                    format={"DD-MM-YYYY"}
                    value={ storePartySentiment.review_date ? dayjs(`${FromatDatePiker(storePartySentiment.review_date, false)}`) : ""}
                    onChange={(e)=>{ChangeSortPartySentiment("review_date",`${e?.year()}-${e?.month()+1}-${e?.date()}`)}}
                />
           </div>
           <div className={Styles["confirm-btn"]}>
                <Button type="ghost" onClick={()=>OnCreatePartySentiment(openModelStatus)} >Xác nhận</Button>
           </div>
        </div>
        </Modal>
     );
}

export default PartySentimentPopup;