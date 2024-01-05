import React from "react";
import Styles from "./GoAbroadInfo.module.css"
import dayjs from "dayjs";

import { Space, Dropdown, Select, DatePicker, Button, Table, Input } from "antd";
import { FaEllipsisH, FaGlobeAmericas,FaPlusCircle } from "react-icons/fa"
import TextArea from "antd/es/input/TextArea";
import { columns } from "./table";
import { FromatDatePiker, TotalDays } from "../../../utils/Time";

import { useState, useEffect } from "react"; 
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom"


import {  
    getgoAbroadList,
    CretategoAbroadById,
    UpdategoAbroadById
} from "../../../store/redux/slices/goAbroadSlice";

import { 
    goAbroadListSelecter,
    totalItemsGoAbroadSelecter
} from "../../../store/redux/selecters"

import DropdownIndex from "../../DropdownIndex";
import { WarnNotification } from "../../../utils/Notification";
import ButtonConfirm from "../../Button";
import { setLoading } from "../../../store/redux/slices/loadingSlice";
import { validattion, OnCheckDate } from "./validation";
import { CheckMicroFrontEnd } from "../../../utils/Token";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function GoAbroadInfo({tabIndex, setOnTab}) {

    const [openModel,setOpenModel] = useState(false) 
    const [stateGoAbroadList,setStateGoAbroadList] = useState([])
    const [statusUpdate,setStatusUpdate] = useState(false)
    const [IDUpdate,setIDUpdate] = useState(0)
    const [storeGoabroad,setStoreGoabroad] = useState({
        destination_country: "",
        time: "",
        time_comeback: "",
        date: "",
        content: ""
    })
    const [page,setPage] = useState({
        page: 1,
        page_size: 10,
        sort_by: "id",
        order: "desc"
    })
    const pathMicro = CheckMicroFrontEnd()

    // Đặt lại store
    const ChangeStoreGoabroad = (key,value)=>{
        setStoreGoabroad({
            ...storeGoabroad,
            [key]: value
        })
    }

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const goAbroadList = useSelector(goAbroadListSelecter)
    const total_items = useSelector(totalItemsGoAbroadSelecter)

    
    // Tạo đi nước ngoài
    const CreateGoabroad = async ()=>{
        if(validattion(storeGoabroad)){
            dispatch({
                type: setLoading.type,
                payload: false
            })
            dispatch({
                type: CretategoAbroadById.type,
                data: {
                    ...storeGoabroad,
                    date: storeGoabroad.time,
                    party_member_id: location?.state.id,
                },
                setStoreGoabroad: setStoreGoabroad
            })
        }
    }

 
    // Cập nhật đi nước ngoài
    const UpdateGoabroad = (record)=>{
        setOpenModel(true)
        setIDUpdate(record?.id)
    }

    const HandelTabIndex = ()=>{
        history.push(`${pathMicro}/party_member`)
    }

    useEffect(()=>{
        dispatch({
            type: getgoAbroadList.type,
            data: {
                ...page,
                party_member_id : location?.state.id
            }
        })
    },[page])

    useEffect(()=>{
        setStateGoAbroadList(goAbroadList)
    },[goAbroadList])

    return ( 
        <div className={Styles["AnalysisResult"]}>
            <div className={Styles["box_info-titles"]}>
                <h3>Đi nước ngoài </h3>      
            </div>
            {tabIndex && DropdownIndex(tabIndex,openModel,setOpenModel,IDUpdate, [], setIDUpdate)  }
            <div className={Styles["box_info-content"]}>
               <div className={`${Styles["box_selected"]} ${Styles["box_textarea"]}`}>
                    <h5>Chọn nơi di</h5>
                    <Input 
                        maxLength={50}
                        value={storeGoabroad.destination_country}
                        onChange={(e)=>{ChangeStoreGoabroad("destination_country",e.target.value)}}  
                    />
               </div>
               <div className={Styles["box_info-number"]}>
                    <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                        <h5>Ngày đi</h5>
                        <DatePicker 
                            value={storeGoabroad.time && dayjs(`${FromatDatePiker(storeGoabroad.time,true)}`)}
                            onChange={(e)=>{ChangeStoreGoabroad("time",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "")}}
                            placeholder="" 
                            format={"DD-MM-YYYY"}
                        />
                    </div>
                    <div className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}` } >
                        <h5>Ngày về</h5>
                        <DatePicker 
                            value={storeGoabroad.time_comeback && dayjs(`${FromatDatePiker(storeGoabroad.time_comeback,true)}`)}
                            onChange={(e)=>{OnCheckDate(e? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "", storeGoabroad, ChangeStoreGoabroad) }}
                            placeholder="" 
                            format={"DD-MM-YYYY"}
                        />
                    </div>
               </div> 
               <div className={`${Styles["box_selected"]} ${Styles["box_textarea"]}`}>
                    <h5>Nội dung</h5>
                    <TextArea 
                        maxLength={200}
                        value={storeGoabroad.content}
                        onChange={(e)=>{ChangeStoreGoabroad("content",e.target.value)}}
                        
                    />
               </div>
            </div>
            <div className={Styles["box_info-add"]}>
                 <div></div>
                 {statusUpdate
                    ?
                    <Button type="ghost" onClick={()=>HandelUpdateGoabroad()} >Cập nhật</Button>
                    :
                    <Button type="ghost" onClick={()=>CreateGoabroad()}>THÊM</Button>
                 }
            </div>
            <div className={Styles["box_info-table"]}>
                <Table
                    columns={columns(UpdateGoabroad)}
                    dataSource={stateGoAbroadList}
                    pagination={{
                        total: total_items?.total_items,
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["5","10","15"],
                    }}
                    onChange={(pageOption)=>{
                        setPage({...page, page_size: pageOption.pageSize, page: pageOption.current })
                    }}
                >
                </Table>
            </div>
            <div className={Styles["box-confirm"]}>
                <ButtonConfirm title={"Hoàn thành"} HandelUpdate={HandelTabIndex}></ButtonConfirm>
            </div>
        </div>
     );
}

export default GoAbroadInfo;