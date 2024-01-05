import React, { useCallback, useEffect, useState } from "react";
import Styles from "./PartyMemberAnalysisResult.module.css"

import { FaEllipsisH,FaPlusCircle} from "react-icons/fa";
import { Dropdown } from "antd";

import DropdownIndex from "../../DropdownIndex";
import ButtonConfirm from "../../Button";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { 
    getQualityEvalutionList,
} from "../../../store/redux/slices/qualityEvalutionSlice"
import {
    QualityEvalutionListSelecter
} from "../../../store/redux/selecters"
import { EditOutlined } from "@ant-design/icons";

function PartyMemberAnalysisResult({tabIndex, setOnTab}) {
    const [openModel,setOpenModel] = useState(false) 
    const [IDUpdate,setIdUpdate] = useState(0)
    const [QualityEvalutionListStort,setQualityEvalutionListStort] = useState([])

    const [page,setPage] = useState({
        page: 1,
        page_size: 9999,
        sort_by: "id",
        order: "desc"
    })

    const dispatch = useDispatch()
    const location = useLocation()
    const QualityEvalutionList = useSelector(QualityEvalutionListSelecter)


    const items = [
        {
          key: '1',
          label: (
            <div 
                onClick={()=>{setOpenModel(true)}}
                className={Styles["title-add"]}
            >
                <FaPlusCircle />
                <div>Thêm</div>
            </div>
          ),
        },
    ];

    // show model chỉnh sửa
    const ShowModelUpdate = (id)=>{
        setOpenModel(true)
        setIdUpdate(id)
    }

   

    const arrYearNotNewCreate = (List)=>{
        const list = List.map((item)=>{
            return {
                ...item,
                sort: item.date.split("-")[0]
            }
        }).sort((a,b)=> b.sort-a.sort)
        return list
    }

    const HandelTabIndex = ()=>{
        setOnTab(tabIndex + 1)
    }
    
    useEffect(()=>{
        dispatch({
            type: getQualityEvalutionList.type,
            data: { 
                ...page,
                party_member_id: location?.state?.id
            }
        })
    },[location?.state?.id])

    useEffect(()=>{
        const QualityEvalutionListSort = arrYearNotNewCreate(QualityEvalutionList)
        setQualityEvalutionListStort(QualityEvalutionListSort)
    },[QualityEvalutionList])

    
    return ( 
        <div className={Styles["AnalysisResult"]}>
            <div className={Styles["box_info-titles"]}>
                <h3>Kết quả phân tích chất lượng Đảng viên</h3>      
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                >
                    <FaEllipsisH />   
                </Dropdown>  
            </div>
            {tabIndex && DropdownIndex(tabIndex,openModel,setOpenModel,IDUpdate,QualityEvalutionListStort,setIdUpdate)  }
            <div className={Styles["box_steps"]}>
                {QualityEvalutionListStort?.map((item)=>{{
                    return (
                        <>
                            <div className={Styles["steps-items"]}>
                                <div>{item.date.split("-")[0]}</div>
                                <div className={Styles["item-round"]}></div>
                                <div className={Styles["item-title"]}>{item?.quality_result} 
                                    <EditOutlined 
                                        title="Chỉnh sửa"
                                        onClick={()=>ShowModelUpdate(item?.id)}
                                    />
                                </div>
                            </div>
                            <div className={Styles["steps-items"]}>
                                <div style={{visibility: "hidden"}}>2020</div>
                                <div className={Styles["item-border"]}></div>
                                <div className={Styles["item-title-sub"]}>{item?.quality_result_reason}</div>
                            </div>
                        </>
                    )
                }}) }
            </div>
            <div className={Styles["box-confirm"]}>
                <ButtonConfirm HandelUpdate={HandelTabIndex} title={"Tiếp theo"} />
            </div>
        </div>
     );
}

export default PartyMemberAnalysisResult;