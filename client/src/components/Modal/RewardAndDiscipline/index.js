import React from "react";
import Styles from "./RewardAndDiscopline.module.css"
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons"
import { Modal,Space,Radio, Button, Input, DatePicker } from "antd"
import { FromatDatePiker  } from "../../../utils/Time"
import TextArea from "antd/es/input/TextArea";


function RewardAndDiscipline({data,setData,open,setOpenModel,handleUpdateSubmit}) {
    const typeRender = data?.type || false
    
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
                {typeRender ? <h3>KHEN THƯỞNG, KỶ LUẬT</h3> : <h3>HUY HIỆU ĐẢNG</h3> }
                <CloseOutlined
                    onClick={()=>{setOpenModel(false)}}
                />
           </div>
           {typeRender &&
            <div className={Styles["box_radio"]}>
                  <Radio.Group value={data?.type} onChange={e => setData('type',e.target.value)}>
                      <Space direction="horizontal">
                          <Radio value={'khen-thuong'}>Khen thưởng</Radio>
                          <Radio value={'ky-luat'}>Kỷ luật</Radio>
                      </Space>
                  </Radio.Group>
            </div>
            }
           <div className={`${Styles["box_selected"]} ${Styles["box_selected-on"]}`}>
                <h5>Ngày</h5>
                <DatePicker
              placeholder="20-12-2020"
              format={"DD-MM-YYYY"}
              value={data?.date.length>0 ? dayjs(
                `${FromatDatePiker(data?.date,"-",true)}`
              ) : ''}
              onChange={(e) => {
                if(e){
                  setData(
                    "date",
                    `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                  );
                }else{
                  setData(
                    "date",
                    ``
                  );
                }
              }}
            />
           </div>
           <div className={Styles["box_selected"]}>
              {typeRender ? <h5>Nội dung</h5> : <h5>Huy hiệu Đảng</h5> }
              {typeRender ?
                <TextArea value={data?.content} maxLength={200} onChange={(e) => setData('content',e.target.value)}></TextArea>
                :
                <TextArea value={data?.party_badge} maxLength={200} onChange={(e) => setData('party_badge',e.target.value)}></TextArea>
              }
           </div>
           <div className={Styles["confirm-btn"]}>
                <button  onClick={() => handleUpdateSubmit()}>Xác nhận</button>
           </div>
        </div>
    </Modal>
    );
}

export default RewardAndDiscipline;