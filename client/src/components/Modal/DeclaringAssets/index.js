import React, { useEffect, useState } from "react";
import Styles from "./DeclaringAssets.module.css"
import dayjs from "dayjs";

import { CloseOutlined } from "@ant-design/icons"
import { Modal,Space,Radio, Button, Input, DatePicker, InputNumber } from "antd"



import { useLocation } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { 
    createAssetDeclaration,
    getAssetDeclarationByID,
    updateAssetDeclarationByID
} from "../../../store/redux/slices/assetDeclarationSlice";
import {
    assetDeclaratByIDSelecter
} from "../../../store/redux/selecters"

import { WarnNotification } from "../../../utils/Notification";
import { FromatDatePiker } from "../../../utils/Time";
import { setLoading } from "../../../store/redux/slices/loadingSlice";

function DeclaringAssets({open,setOpenModel, IDUpdate, setIdUpdate}) {
    const [typeValue,setTypeValue] = useState(0)
    const [stateDeclaringAssets,setStateDeclaringAssets] = useState({
        type: "",
        description: "",
        value: "",
        date: "",
        party_member_id: 0
    })

    const location = useLocation()
    const dispatch = useDispatch()
    const assetDeclaratByID = useSelector(assetDeclaratByIDSelecter)


    // Lấy dữ liệu lưu vào state
    const ChangeSortDeclaringAssets = (key,value)=>{
        setStateDeclaringAssets({
            ...stateDeclaringAssets,
            [key]: value
        })
    }

    const type = ["Nhà","Tiết Kiệm","Đất","Tài sản khác"]


    const ValidateData = (stateDeclaringAssets, funHandel)=>{
        if(!stateDeclaringAssets.date){
            WarnNotification("Vui lòng chon năm kê khai")
            return 0
        }

        if(!stateDeclaringAssets.description){
            WarnNotification("Vui lòng nhập mô tả")
            return 0
        }

        if(!stateDeclaringAssets.value){
            WarnNotification("Vui lòng nhập giá trị")
            return 0
        }
        funHandel()
        
    }

    // Tạo kê khai tài sản cá nhân
    const CreateAssetDeclaration = ()=>{
        ValidateData(stateDeclaringAssets, PostAssetDeclaration)
    }

    const PostAssetDeclaration = ()=>{
        dispatch({
            type: setLoading.type,
            payload: false
        })
        dispatch({
            type: createAssetDeclaration.type,
            data: {
                ...stateDeclaringAssets,
                type: type[typeValue],
                party_member_id: location?.state.id
            }
        })
        setOpenModel(false)
        setStateDeclaringAssets({})
    }

    // Cập nhật kê khai tài sản
    const UpdateAssetDeclaration = ()=>{
        ValidateData(stateDeclaringAssets,PutAssetDeclaration)
    }

    const PutAssetDeclaration = ()=>{
        dispatch({
            type: setLoading.type,
            payload: false
        })
        dispatch({
            type: updateAssetDeclarationByID.type,
            data: {
                ...stateDeclaringAssets,
                type: type[typeValue],
                party_member_id: location?.state.id
            }
        })
        setIdUpdate(0)
        setOpenModel(false)
        setStateDeclaringAssets({})
    }


    // Đóng tab
    const onCancelModal = ()=>{
        setOpenModel(false)
        setIdUpdate(0)
        setStateDeclaringAssets({
            type: "",
            description: "",
            value: "",
            date: "",
            party_member_id: 0
        })

    }

    useEffect(()=>{
        if(IDUpdate){
            dispatch({
                type: getAssetDeclarationByID.type,
                data: {
                    id: IDUpdate
                }
            })
        }
    },[IDUpdate])

    useEffect(()=>{
        setStateDeclaringAssets(assetDeclaratByID)
    },[assetDeclaratByID])

    return ( 
        <Modal
        open={open}
        width={600}
        closable={false}
        footer={false}
        onCancel={()=>{onCancelModal()}}
    >
        <div className={Styles["box_analysis"]}>
           <div className={Styles["box_analysis-title"]}>
                <h3>KÊ KHAI TÀI SẢN</h3>
                <CloseOutlined 
                    onClick={()=>{onCancelModal()}}
                />
           </div>
           <div className={Styles["box_radio"]}>
                <Radio.Group 
                    value={typeValue}
                    onChange={(e)=>{setTypeValue(e.target.value)}}
                >
                    {type.length && type.map((item,index)=>{
                        return (
                            <Radio value={index}>{item}</Radio>
                        )
                    })}
                </Radio.Group>
           </div>
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Năm kê khai tài sản</h5>
                <DatePicker 
                    format={"DD-MM-YYYY"}
                    defaultValue={"19-09-2000"}
                    placeholder=""
                    value={stateDeclaringAssets?.date ? dayjs(`${FromatDatePiker(stateDeclaringAssets?.date, false)}`) : ""}
                    onChange={(e)=>{ChangeSortDeclaringAssets("date",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : "")}}
                />
           </div>
           <div className={Styles["box_selected"]}>
            { typeValue == 0
                &&
                <h5>Mô tả (Tên căn nhà & Diện tích)</h5>
            }
            { typeValue == 1
                &&
                <h5>Mô tả (Tên tiết kiệm)</h5>
            }
            { typeValue == 2
                &&
                <h5> Mô tả (Tên thửa đất và diện tích)</h5>
            }
            { typeValue == 3
                &&
                <h5> Mô tả (Tên tài sản khác)</h5>
            }
                <Input 
                    onChange={(e)=>ChangeSortDeclaringAssets("description",e.target.value)}
                    value={stateDeclaringAssets?.description}
                    maxLength={100}
                />
           </div>
    
           <div className={Styles["box_selected"]}>
                <h5>Giá trị (VND) </h5>
                <Input
                    type="number"
                    maxLength={50}
                    onChange={(e)=>ChangeSortDeclaringAssets("value",e.target.value)}
                    value={stateDeclaringAssets?.value}
                />
           </div>
           <div className={Styles["confirm-btn"]}>
                {IDUpdate ?
                    <Button type="ghost" onClick={()=>{UpdateAssetDeclaration()}} >Cập nhật</Button>
                    :
                    <Button type="ghost" onClick={()=>{CreateAssetDeclaration()}} >Xác nhận</Button>
                }
           </div>
        </div>
    </Modal>
    );
}

export default DeclaringAssets;