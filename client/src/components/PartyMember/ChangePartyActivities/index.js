import React from "react";
import dayjs from "dayjs";
// import classes from "./ChangePartyActivities.module.js";

import { DatePicker, Input } from "antd";
import ButtonConfirm from "../../Button";

import { useEffect , useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

import { 
    getPartyTranformList,
    createPartyTranform,
    updatePartyTranform
} from "../../../store/redux/slices/partyTranformSlice"
import { 
    PartyTranformListSelecter
} from "../../../store/redux/selecters"

import { FromatDatePiker } from "../../../utils/Time/index.js"; 
import inlineCss from "react-jss"
import { ChangePartyActivitiesCSS } from "./ChangePartyActivities.module.js"
import { setLoading } from "../../../store/redux/slices/loadingSlice.js";

function ChangePartyActivities({classes, setOnTab, tabIndex}) {
    const [storePartyTranform, setStorePartyTranform] = useState([])
    const [statePartyTranform, setStatePartyTranform] = useState({
        move_in_party_cell: "",
        move_in_date: "",
        move_out_party_cell: "",
        move_out_date: "",
        content: "",
    })
    const [page,setPage] = useState({
        page: 1,
        page_size: 10,
        sort_by: "id",
        order: "desc"
    })
    

    const dispatch = useDispatch()
    const location = useLocation()
    const partyTranform = useSelector(PartyTranformListSelecter)

    const ChangePartyTranform = (key,value)=>{
        setStatePartyTranform({
            ...statePartyTranform,
            [key]: value
        })
    }

    // Cập nhật chuyển sinh hoặt Đảng
    const HandelUpdate = ()=>{
       // Thêm update
       dispatch({
        type: setLoading.type,
        payload: false
        })
       dispatch({
          type: updatePartyTranform.type,
          data: {
             ...statePartyTranform,
             id: partyTranform[0]?.id
          }
       })
       setOnTab(tabIndex + 1)
    }

    // Tạo Chuyển sinh hoặt Đảng
    const HandelCreateChangePartyTranForm = ()=>{
        dispatch({
            type: setLoading.type,
            payload: false
        })
        dispatch({
            type: createPartyTranform.type,
            data: {
                ...statePartyTranform,
                party_member_id: location?.state?.id
            }
        })
        setOnTab(tabIndex + 1)
    }

    useEffect(()=>{
        
        dispatch({
            type: getPartyTranformList.type,
            data: {
                ...page,
                party_member_id: location?.state?.id
            }
        })
    },[location?.state?.id])

    useEffect(()=>{
        setStorePartyTranform(storePartyTranform)
        if(partyTranform.length){
            setStatePartyTranform({
                ...statePartyTranform,
                ...partyTranform[0]
            })
        }
    },[partyTranform])

    return (
       
        <div className={classes["box_info"]}>
            <div className={classes["box_info-titles"]}>
                <h3>Chuyển sinh hoạt Đảng</h3>         
            </div>
             <div className={classes["box_info-number"]}>
                    <div className={`${classes["box_selected"]} ${classes["box_datepiker"]}`}>
                        <h5>Tên chi bộ đến</h5>
                        <Input
                           maxLength={50}
                           value={statePartyTranform.move_in_party_cell}
                           onChange={(e)=>{ChangePartyTranform("move_in_party_cell",e.target.value)}}
                        />
                    </div>
                    <div className={`${classes["box_selected"]} ${classes["box_datepiker"]}`} >
                        <h5>Ngày đến chi bộ</h5>
                        <DatePicker 
                            placeholder=""
                            format={"DD-MM-YYYY"}
                            value={ statePartyTranform.move_in_date && dayjs(`${FromatDatePiker(statePartyTranform.move_in_date,true)}`)}
                            onChange={(e)=>{ChangePartyTranform("move_in_date",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "")}}
                        />
                    </div>
               </div>
             <div className={classes["box_info-number"]}>
                    <div className={`${classes["box_selected"]} ${classes["box_datepiker"]}`}>
                        <h5>Tên chi bộ đi</h5>
                        <Input 
                           maxLength={50}
                           value={statePartyTranform.move_out_party_cell}
                           onChange={(e)=>{ChangePartyTranform("move_out_party_cell",e.target.value)}}
                        />
                    </div>
                    <div className={`${classes["box_selected"]} ${classes["box_datepiker"]}`} >
                        <h5>Ngày rời chi bộ</h5>
                        <DatePicker 
                            placeholder=""
                            format={"DD-MM-YYYY"}
                            value={ statePartyTranform.move_out_date && dayjs(`${FromatDatePiker(statePartyTranform.move_out_date,true)}`)}
                            onChange={(e)=>{ChangePartyTranform("move_out_date", e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "")}}
                        />
                    </div>
               </div>
            <div className={classes["box-confirm"]}>
                <ButtonConfirm HandelUpdate={partyTranform.length ? HandelUpdate : HandelCreateChangePartyTranForm} title={"Tiếp theo"} />
            </div>
        </div>
     );
}

export default inlineCss(ChangePartyActivitiesCSS)(ChangePartyActivities);