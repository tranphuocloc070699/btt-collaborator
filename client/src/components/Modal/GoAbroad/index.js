import React, { useEffect, useState } from "react";
import Styles from "./GoAbroad.module.css"
import dayjs from "dayjs";

import { CloseOutlined } from "@ant-design/icons"
import { Modal, Button, Input, DatePicker } from "antd"
import TextArea from "antd/es/input/TextArea";

import { setLoading } from "../../../store/redux/slices/loadingSlice";
import { getgoAbroadById, UpdategoAbroadById } from "../../../store/redux/slices/goAbroadSlice"
import { useDispatch, useSelector } from "react-redux";
import { useLocation  } from "react-router-dom"
import { FromatDatePiker } from "../../../utils/Time";
import { goAbroadListByIDSelecter } from "../../../store/redux/selecters"
import { validattion, OnCheckDate } from "../../PartyMember/GoAbroadInfo/validation";


function GoAbroad({open,setOpenModel,IDUpdate,setIdUpdate}) {
    const goAbroadListByID = useSelector(goAbroadListByIDSelecter)
    const [storeGoabroad,setStoreGoabroad] = useState({
        destination_country: "",
        time: "",
        time_comeback: "",
        date: "",
        content: ""
    })

    const location = useLocation()
    const dispatch = useDispatch()

    const ChangeStoreGoabroad = (key,value)=>{
        setStoreGoabroad({
            ...storeGoabroad,
            [key]: value
        })
    }


    const HandelUpdateGoabroad = ()=>{
        if(validattion(storeGoabroad)){
            dispatch({
                type: setLoading.type,
                payload: false
            })
            dispatch({
                type: UpdategoAbroadById.type,
                data: {
                    ...storeGoabroad,
                    date: storeGoabroad.time,
                    party_member_id: location?.state.id
                },
                setOpenModel,
                setStoreGoabroad: setStoreGoabroad
            })
            setIdUpdate(0)
        }
      
    }

    useEffect(()=>{
        if(IDUpdate){
            dispatch({
                type: getgoAbroadById.type,
                data: { id: IDUpdate }
            })
        }
    },[IDUpdate])

    useEffect(()=>{
        setStoreGoabroad(goAbroadListByID)
    },[goAbroadListByID])
  
    return ( 
        <Modal
        open={open}
        width={450}
        closable={false}
        footer={false}
        onCancel={()=>{setOpenModel(false)}}
    >
        <div className={Styles["box_analysis"]}>
           <div className={Styles["box_analysis-title"]}>
                <h3>ĐI NƯỚC NGOÀI</h3>
                <CloseOutlined 
                    onClick={()=>{
                        setOpenModel(false)
                    }}
                />
           </div>
           <div className={Styles["box_selected"]}>
                <h5>Chọn nơi di</h5>
                <Input 
                    maxLength={50}
                    value={storeGoabroad.destination_country}
                    onChange={(e)=>{ChangeStoreGoabroad("destination_country",e.target.value)}}
                    placeholder="Chon nơi đi"     
                />
           </div>
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Ngày đi</h5>
                <DatePicker 
                            value={storeGoabroad.time && dayjs(`${FromatDatePiker(storeGoabroad.time,true)}`)}
                            onChange={(e)=>{ChangeStoreGoabroad("time",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "")}}
                            placeholder="20-12-2022" 
                            format={"DD-MM-YYYY"}
                        />
           </div>
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Ngày về</h5>
                <DatePicker 
                            value={storeGoabroad.time_comeback && dayjs(`${FromatDatePiker(storeGoabroad.time_comeback,true)}`)}
                            onChange={(e)=>{OnCheckDate(e? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "", storeGoabroad, ChangeStoreGoabroad) }}
                            placeholder="20-12-2022" 
                            format={"DD-MM-YYYY"}
                        />
           </div>
           <div className={Styles["box_selected"]}>
                <h5>Nội dung</h5>
                <TextArea 
                        maxLength={200}
                        value={storeGoabroad.content}
                        onChange={(e)=>{ChangeStoreGoabroad("content",e.target.value)}}
                        placeholder="Nội dung"     
                    />
           </div>
           <div className={Styles["confirm-btn"]}>
                <Button type="ghost" onClick={HandelUpdateGoabroad} >Cập nhật</Button>
           </div>
        </div>
    </Modal>
    );
}

export default GoAbroad;