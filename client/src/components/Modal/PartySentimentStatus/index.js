import React from "react";
import Styles from "./PartySentiment.module.css";
import dayjs from "dayjs";

import { FromatDatePiker } from "../../../utils/Time";

import { Input, DatePicker } from "antd";


function PartySentimentStatus({type = "",open,setOpenModal, ChangeSortPartySentiment, storePartySentiment}) {
    return ( 
        <>
            <div className={Styles["box_analysis"]}>
                {(type === "book" || type === "file")
                    &&
                    <>
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Ngày viết</h5>
                                <DatePicker 
                                    placeholder="10-12-2023" 
                                    format={"DD-MM-YYYY"}
                                    value={storePartySentiment.start_date ? dayjs(`${FromatDatePiker(storePartySentiment.start_date,false)}`) : ""}
                                    onChange={(e)=>{ChangeSortPartySentiment("start_date",`${e?.year()}-${e?.month()+1}-${e?.date()}`)}}
                                />
                        </div>
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Ngày hoàn thành</h5>
                                <DatePicker 
                                    format={"DD-MM-YYYY"}
                                    placeholder="10-11-2023" 
                                    value={storePartySentiment.complete_date ? dayjs(`${FromatDatePiker(storePartySentiment.complete_date,false)}`) : ""}
                                    onChange={(e)=>{ChangeSortPartySentiment("complete_date",`${e?.year()}-${e?.month()+1}-${e?.date()}`)}}
                                />
                        </div>
                    </>
                }
            
                {type === "verification" // Xác minh su tra
                    &&
                    <>
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Nơi xác minh sutra</h5>
                                <Input 
                                    placeholder="Tam Bình, Thủ Đức, TP.Hồ Chí Minh" 
                                />
                        </div>
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Đảng viên phụ trách</h5>
                                <Input 
                                    placeholder="Lê Công Tiến" 
                                />
                        </div>
                    </>
                }

                {type === "opinion"
                    &&
                    <> 
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Đoàn thanh niên</h5>
                                <Input 
                                    placeholder="Vui vẽ, nhiệt tình, tận tụy" 
                                    
                                />
                        </div>
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Công đoàn</h5>
                                <Input 
                                    placeholder="Vui vẽ, nhiệt tình, tận tụy" 
                                />
                        </div>
                        <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                                <h5>Cấp ủy nơi cư trú</h5>
                                <Input 
                                    placeholder="Vui vẽ, nhiệt tình, tận tụy" 
                                />
                        </div>
                    </>
                }

                {!type ? <></>: ""}

            </div>
        </>
     );
}

export default PartySentimentStatus;