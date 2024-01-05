import React, { memo, useCallback, useMemo } from "react";
import Styles from "./Party_member_information.module.css";
import dayjs from "dayjs";

import { useState,useEffect } from "react";
import { DatePicker, Input, Modal } from "antd";

import { getPartyMemberByID, updatePartyMemberByID } from "../../../store/redux/slices/partyMemberSlice";
import { partyMemberByIdSelecter } from "../../../store/redux/selecters";

import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import Group from "../../../assets/img/Group.png"
import { FromatDatePiker  } from "../../../utils/Time"
import ButtonConfirm from "../../Button";
import PreviewFile from "../../Modal/PreviewFiles";

function InfomationPartyMember({tabIndex, setOnTab}) {
    const [stortPartyMember,setStortPartyMember] = useState({})
    const [ViewFiles,setViewFiles] = useState({
        openViewFile: false,
        linkUrl: "",
    })
    let fileList

    const location = useLocation()
    const dispatch = useDispatch()
    const partyMemberByID = useSelector(partyMemberByIdSelecter)
   
    // Thay đổi form dữ liệu
    const ChangeSortPartyMember = (key,value)=>{
        setStortPartyMember({
            ...stortPartyMember,
            [key]: value
        })
    }

    // Cập nhật dữ liệu khi chuyển Tab
    const HandelUpdate = useCallback(()=>{
        dispatch({
            type: updatePartyMemberByID.type,
            data: stortPartyMember
        })
        setOnTab(tabIndex+1)
    },[stortPartyMember])

    // Đối tượng đảng viên theo ID
    useEffect(()=>{
        dispatch({
            type: getPartyMemberByID.type,
            data: { id: location?.state?.id} 
        })
        
    },[location?.state?.id])

    useEffect(()=>{
        setStortPartyMember(partyMemberByID)
    },[partyMemberByID])



    if(stortPartyMember.document_path){
        fileList = JSON.parse(stortPartyMember.document_path)
    }

    console.log(ViewFiles);


    return ( 
        <div className={Styles["box_info"]}>
            <div className={Styles["box_info-titles"]}>
                <h3>Thông tin đảng viên</h3>         
            </div>
            <div className={Styles["box_info-content"]}>
                <div className={Styles["box_selected"]}>
                    <h5>Tên</h5>
                    <Input 
                        maxLength={50}
                        value={stortPartyMember.full_name}
                    />
               </div>
                <div className={Styles["box_selected"]}>
                    <h5>Đảng bộ</h5>
                    <Input 
                        maxLength={50}
                        value={stortPartyMember.party_committee}
                        onChange={(e)=>{ChangeSortPartyMember("party_committee",e.target.value)}}
                    />
               </div>
               <div className={Styles["box_info-number"]}>
                    <div className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}`}>
                        <h5>Ngày kết nạp tại chi bộ</h5>
                        <DatePicker 
                           format={"DD-MM-YYYY"}
                           placeholder=""
                           value={ stortPartyMember.admission_party_cell ? dayjs(`${FromatDatePiker(stortPartyMember.admission_party_cell,false)}`) : ""}
                           onChange={(e)=>{ChangeSortPartyMember("admission_party_cell",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : '')}}
                        />
                    </div>
                    <div className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}`} >
                        <h5>Ngày chính thức</h5>
                        <DatePicker 
                            placeholder=""
                            format={"DD-MM-YYYY"}
                            value={stortPartyMember.official_party_cell ? dayjs(`${FromatDatePiker(stortPartyMember.official_party_cell,false)}`) : ""}
                            onChange={(e)=>{ ChangeSortPartyMember("official_party_cell",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : '')}}
                        />
                    </div>
               </div>
        
               <div className={Styles["box_info-number"]}>
                    <div className={Styles["box_selected"]}>
                        <h5>Người giới thiệu 1</h5>
                        <Input 
                            maxLength={50}
                            value={stortPartyMember.first_full_name}
                            onChange={(e)=>{ChangeSortPartyMember("first_full_name",e.target.value)}}
                        />
                    </div>
                    <div className={Styles["box_selected"]}>
                        <h5>Chức vụ</h5>
                        <Input 
                            maxLength={50}
                            value={stortPartyMember.first_position}
                            onChange={(e)=>{ChangeSortPartyMember("first_position",e.target.value)}}
                        />
                    </div>
               </div>
               <div className={Styles["box_info-number"]}>
                    <div className={Styles["box_selected"]}>
                        <h5>Người giới thiệu 2</h5>
                        <Input 
                            maxLength={50}
                            value={stortPartyMember.second_full_name}
                            onChange={(e)=>{ChangeSortPartyMember("second_full_name",e.target.value)}}
                        />
                    </div>
                    <div className={Styles["box_selected"]}>
                        <h5>Chức vụ</h5>
                        <Input 
                            maxLength={50}
                            value={stortPartyMember.second_position}
                            onChange={(e)=>{ChangeSortPartyMember("second_position",e.target.value)}}
                        />
                    </div>
               </div>
               <div className={Styles["box_info-number"]}>
                    <div className={Styles["box_selected"]}>
                        <h5>Số thẻ Đảng</h5>
                        <Input 
                            maxLength={50}
                            value={stortPartyMember.party_card_number}
                            onChange={(e)=>{ChangeSortPartyMember("party_card_number",e.target.value)}}
                        />
                    </div>
                    <div className={`${Styles["box_selected"]} ${Styles["box_datepiker"]}` } >
                        <h5>Ngày cấp</h5>
                        <DatePicker 
                            placeholder=""
                            format={"DD-MM-YYYY"}
                            value={ stortPartyMember.card_issuance_date ? dayjs(`${FromatDatePiker(stortPartyMember.card_issuance_date,false)}`) : ""}
                            onChange={(e)=>{ ChangeSortPartyMember("card_issuance_date",e ? `${e?.year()}-${e?.month()+1}-${e?.date()}` : '')}}
                        />
                    </div>
               </div>
               <div className={Styles["box_upload"]}>
                    <div className={Styles["upload"]}>
                        <input onChange={(e)=>{UploadFile(e)}} type="file" multiple></input>
                        <div className={Styles['upload_icons']}>
                            <img src={Group}></img>
                            <p>Tải tài liệu</p>
                        </div>
                    </div>

                    <PreviewFile 
                        ViewFiles={ViewFiles}
                        setViewFiles={setViewFiles}
                    ></PreviewFile>
                    {/* <iframe src={`https://dev-resource.tuoitre.vn/storages/booking-service/2023-12-26/60947b5e911e4e8b816696cd3abd5b4f.pdf`} /> */}

                    {fileList?.length > 0 && fileList.map((file, index)=>{
                    return (
                        <div key={index} onClick={()=>{setViewFiles({openViewFile: true, linkUrl: file})}} className={Styles["upload"]}>
                            {/* <div><CloseCircleOutlined onClick={()=>ClearFiles(index)} /></div> */}
                            <div></div>
                            <div className={Styles['upload_icons']}>
                                <img width={40} height={40} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"}></img>
                                {/* <p>{file.name}</p> */}
                            </div>
                        </div>
                    )
                })}
               </div>
            </div>
            <div className={Styles["box-confirm"]}>
                <ButtonConfirm HandelUpdate={HandelUpdate} title={"Tiếp theo"} />
            </div>
        </div>
    );
}

export default memo(InfomationPartyMember);