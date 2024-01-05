import React, { useEffect, useState } from "react";
import Styles from "./AnalysisResult.module.css";
import dayjs from "dayjs";

import { Button, Input, Modal, Radio , Space, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea";
import { FromatDatePiker } from "../../../utils/Time";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"

import { 
    CretateQualityEvalutionById,
    getQualityEvalutionById,
    UpdateQualityEvalutionById
} from "../../../store/redux/slices/qualityEvalutionSlice";
import {
    QualityEvalutionByIdSelecter
} from "../../../store/redux/selecters"

import { WarnNotification } from "../../../utils/Notification";
import { FromatYearHistory } from "../../../utils/Time"
import { setLoading } from "../../../store/redux/slices/loadingSlice";


function ModelAnalysisResult({open,setOpenModel, IDUpdate = 0, QualityEvalutionListStort, setIdUpdate}) {
    const [CreateQuanlity,setCreateQuanlity] = useState({
        quality_result: "",
        quality_result_reason: "",
        date: ""
    }); 


    const location = useLocation()
    const dispatch = useDispatch()
    const QualityEvalutionById = useSelector(QualityEvalutionByIdSelecter)

    const ChangeSortQuanlity = (key,value)=>{
        setCreateQuanlity({
            ...CreateQuanlity,
            [key]: value
        })
    }

    const QualityResultList = [
        "Hoàn thành suất xắc nhiệm vụ",
        "Hoàn thành tốt nhiệm vụ",
        "Hoàn thành nhiệm vụ",
        "Không hoàn thành nhiệm vụ"
    ]

    const RemoveYear =  ()=>{
        const ReportExsitYear = FromatYearHistory(QualityEvalutionListStort,true) // Number list
        const year =  QualityEvalutionById?.date?.split("-")[0] || ""  // Current year edit

        return ReportExsitYear.filter((item)=> item != year)
        
    }

    // Check đánh giá phân tích chắt lượng cùng năm
    
    
    // Xác nhận dữ liệu
    const ValidateData = (CreateQuanlity,funHandel)=>{
        if(!CreateQuanlity.date){
            WarnNotification("Vui lòng nhập năm đánh giá Đảng Viên")
            return 0
         }
         
         if(!CreateQuanlity.quality_result){
             WarnNotification("Vui lòng chọn kết quả đánh giá đảng viên")
             return 0
         }
 
         if(CreateQuanlity.quality_result == 'Không hoàn thành nhiệm vụ'){
             if(!CreateQuanlity.quality_result_reason){
                 WarnNotification("Vui lòng nhập lý do đánh giá đảng viên")
                 return 0
             }
         }
         
         if (CreateQuanlity.date){
             RemoveYear().includes(CreateQuanlity.date.split("-")[0]) ? WarnNotification(`Năm ${CreateQuanlity.date.split("-")[0]} Đã được đánh giá`) : funHandel();
         }
    }

    // Tạo kết quả đánh giá
    const CreateQuanlityResuft = ()=>{
        ValidateData(CreateQuanlity,PostQuanlityResuft)
        
    }
    const PostQuanlityResuft = ()=>{
        let quality_result_reason = '';
        if(CreateQuanlity.quality_result=='Không hoàn thành nhiệm vụ'){
            quality_result_reason = CreateQuanlity.quality_result_reason;
        }
        dispatch({
            type: setLoading.type,
            payload: false
        })
        dispatch({
            type: CretateQualityEvalutionById.type,
            data: {
                ...CreateQuanlity,
                quality_result_reason,
                party_member_id: location?.state?.id
            },
            setOpenModel: setOpenModel,
            setCreateQuanlity: setCreateQuanlity,
        })
        setIdUpdate(0)
       
    }

    
    // Cập nhật dữ liệu đánh giá
    const PutQuanlityResuft = ()=>{
        ValidateData(CreateQuanlity,UpdateQuanlityResuft)
    }
    const UpdateQuanlityResuft = ()=>{
        let quality_result_reason = CreateQuanlity.quality_result ==  "Không hoàn thành nhiệm vụ" ? CreateQuanlity.quality_result_reason : ""
        dispatch({
            type: setLoading.type,
            payload: false
        })
        dispatch({
            type: UpdateQualityEvalutionById.type,
            data: {
                ...CreateQuanlity,
                quality_result_reason,
                party_member_id: location?.state?.id
            },
            setOpenModel: setOpenModel,
            setCreateQuanlity: setCreateQuanlity,
        })   
        setIdUpdate(0)
    }


    // Trả dữ liệu rỗng
    const HanelEmptyData = ()=>{
        setOpenModel(false)
        setIdUpdate(0)
        setCreateQuanlity({
            quality_result: "",
            quality_result_reason: "",
            date: ""
        })
    }

    // Lấy dữ liệu chỉnh sửa
    useEffect(()=>{
        if(IDUpdate){
            dispatch({
                type: getQualityEvalutionById.type,
                data: { id: IDUpdate },
            })
        }
    },[IDUpdate])

    // Đẩy vào state dữ liệu đang chỉnh sửa
    useEffect(()=>{
        setCreateQuanlity(QualityEvalutionById)
    },[QualityEvalutionById])

    return ( 
        <Modal
            open={open}
            width={450}
            closable={false}
            footer={false}
            onCancel={()=> HanelEmptyData()}

        >
            <div className={Styles["box_analysis"]}>
               <div className={Styles["box_analysis-title"]}>
                    <h3>KẾT QUẢ PHÂN TÍCH ĐẢNG VIÊN</h3>
                    <CloseOutlined 
                        onClick={()=>setOpenModel(false)}
                    />
               </div>
               <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                    <h5>Năm</h5>
                    <DatePicker 
                        placeholder=""
                        format={"DD-MM-YYYY"}
                        value={ CreateQuanlity.date && dayjs(`${FromatDatePiker(CreateQuanlity.date,true)}`)}
                        onChange={(e)=>{ChangeSortQuanlity("date",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}`: "")}}
                    />
               </div>
               <div className={Styles["box_radio"]}>
                    <Radio.Group 
                        value={CreateQuanlity?.quality_result} 
                        onChange={(e)=>{
                            ChangeSortQuanlity("quality_result", e.target.value)}}
                        >
                        <Space direction="vertical">
                            {QualityResultList?.map((item)=>{
                                return (
                                    <Radio value={item}>{item}</Radio>
                                )
                            })}
                        </Space>
                    </Radio.Group>
               </div>
               
               {CreateQuanlity.quality_result == QualityResultList[3] // Hiển thị form nhập lý do nếu "Không hoàn thành nhiệm vụ"
                    &&
                    <div className={Styles["box_selected"]}>
                            <h5>Lý do</h5>
                            <TextArea
                                maxLength={200}
                                value={CreateQuanlity.quality_result_reason}
                                onChange={(e)=>{ChangeSortQuanlity("quality_result_reason",e.target.value)}}
                            />
                    </div>
               }
               <div className={Styles["confirm-btn"]}>
                    {IDUpdate
                        ?
                        <Button onClick={()=>{PutQuanlityResuft()}} type="ghost" >Cập nhật</Button>
                        :
                        <Button onClick={()=>{CreateQuanlityResuft()}} type="ghost">Thêm</Button>
                    }
               </div>
            </div>
        </Modal>
    );
}

export default ModelAnalysisResult;