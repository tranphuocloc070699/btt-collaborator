import React, { useEffect } from "react";
import Styles from "./DeclaringAssetsInfo.module.css";


import { FaPlusCircle, FaArrowRight, FaEllipsisH } from "react-icons/fa";
import { Space, Dropdown } from "antd";

import DropdownIndex from "../../DropdownIndex";

import { useState } from "react"
import { PlusOutlined, EditOutlined, MinusOutlined } from "@ant-design/icons";

import {
    getAssetDeclarationList
} from "../../../store/redux/slices/assetDeclarationSlice"

import ButtonConfirm from "../../../components/Button/index"
import { assetDeclarationListSelecter } from "../../../store/redux/selecters"
import { FromatYearHistory, GetElementOnYear, GetElementOnType } from "../../../utils/Time"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"

import arr001Img from "../../../../src/assets/img/arr001.svg"
import minusImg from "../../../../src/assets/img/minus.svg"
import plusImg from "../../../../src/assets/img/plus.svg"

function DeclaringAssetsInfo({tabIndex,setOnTab}) {
    const [openModel,setOpenModel] = useState(false) 
    const [idUpdate,setIdUpdate] = useState()
    const [year,setYear] = useState([])
    const [page,setPage] = useState({
        page: 1,
        page_size: 9999,
        sort_by: "date",
        order: "desc"
    })
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

    const dispatch = useDispatch()
    const location = useLocation()
    const assetDeclarationList =  useSelector(assetDeclarationListSelecter)
    // const year = FromatYearHistory(assetDeclarationList)

    // Mở model chỉnh sửa
    const OpenModalUpdate = (id)=>{
        setIdUpdate(id)
        setOpenModel(true)
    }


    const HandelTabIndex = ()=>{
        setOnTab(tabIndex + 1)
    }

    const HandelCloseOpen = (idClose)=>{
        const yearClose = year.map((x,index)=>{
            return idClose == index ? {...x,open: !x.open } : x
        })
        setYear(yearClose)
    }

    const formattedNumber =  (number)=>{
       const formatNumber = +number
       return formatNumber.toLocaleString("vi-VN", {
            currency: "VND",
        })
    }

    console.log(formattedNumber(500000));

    useEffect(()=>{
        dispatch({
            type: getAssetDeclarationList.type,
            data: {
                ...page,
                party_member_id: location?.state.id
            }
        })
    },[])

    useEffect(()=>{
        setYear(FromatYearHistory(assetDeclarationList))
    },[assetDeclarationList])


    return ( 
        <div className={Styles["AnalysisResult"]}>
            <div className={Styles["box_info-titles"]}>
                <h3>Kê khai tài sản</h3>      
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                >
                    <FaEllipsisH />   
                </Dropdown>  
            </div>
            {tabIndex && DropdownIndex(tabIndex,openModel,setOpenModel,idUpdate,[],setIdUpdate)}
            {
                year.length > 0 && year.map((item, index)=>{
                    const data = GetElementOnYear(item.year,assetDeclarationList)
                    const GetElement = GetElementOnType("",data);
                    return (
                        <div className={`${Styles["calender"]} ${!item.open ? Styles["close"] :"" }` }>
                            <div className={Styles["year"]}>
                                {item.year}
                            </div>
                            <div className={Styles["plus_icons"]} >
                                <div className={Styles["icons"]}>
                                    <img src={item?.open ? plusImg : minusImg} onClick={()=>{HandelCloseOpen(index)}} />
                                </div>
                                <div className={item?.open ? Styles["line"] : Styles["line-close"]}></div>
                            </div>
                            <div className={item?.open ? Styles["box_steps"] : Styles["box_steps-close"]}>
                                {GetElement.home.length > 0 &&
                                    <div className={Styles["box-items"]}>                            
                                        <div className={Styles["box_items-title"]}>
                                            <div className={Styles["box-title"]}>
                                                <img src={arr001Img} />
                                                <h5>Nhà</h5>
                                            </div>
                                        </div>
                                        {GetElement.home.length > 0 && GetElement.home.map((item)=>{
                                            return (
                                                <div className={Styles["steps-items"]}>
                                                    <div className={Styles["goAroad"]}>
                                                        <div className={Styles["item-round"]}>
                                                            <Space direction="horizontal">
                                                                <span className={Styles["m2"]}>{item?.description}</span>
                                                                <span className={Styles["title"]}>Giá trị:</span>
                                                                <span className={Styles["price"]}>{formattedNumber(item.value)} VND</span>
                                                                <span className={Styles["place_edit"]}>
                                                                    <EditOutlined  onClick={()=> OpenModalUpdate(item?.id)} />
                                                                </span>
                                                            </Space>
                                                        </div>
                                                    </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                }
                                {GetElement.saveMoney.length > 0 &&
                                    <div className={Styles["box-items"]}>
                                        <div className={Styles["box_items-title"]}>
                                            <div className={Styles["box-title"]}>
                                                <img src={arr001Img} />
                                                <h5>Tiết kiệm</h5>
                                            </div>
                                        </div>
                                        {GetElement.saveMoney.length > 0 && GetElement.saveMoney.map((item)=>{
                                            return (
                                                <div className={Styles["steps-items"]}>
                                                    <div className={Styles["goAroad"]}>
                                                        <div className={Styles["item-round"]}>
                                                            <Space direction="horizontal">
                                                                <span className={Styles["m2"]}>{item?.description}</span>
                                                                <span className={Styles["title"]}>Giá trị:</span>
                                                                <span className={Styles["price"]}>{formattedNumber(item.value)} VND</span>
                                                                <span className={Styles["place_edit"]}>
                                                                    <EditOutlined  onClick={()=> OpenModalUpdate(item?.id)} />
                                                                </span>
                                                            </Space>
                                                        </div>
                                                    </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                }
                                {GetElement.land.length > 0 &&
                                    <div className={Styles["box-items"]}>
                                        <div className={Styles["box_items-title"]}>
                                            <div className={Styles["box-title"]}>
                                                <img src={arr001Img} />
                                                <h5>Đất</h5>
                                            </div>
                                        </div>
                                        {GetElement.land.length > 0 && GetElement.land.map((item)=>{
                                            return (
                                                <div className={Styles["steps-items"]}>
                                                    <div className={Styles["goAroad"]}>
                                                        <div className={Styles["item-round"]}>
                                                            <Space direction="horizontal">
                                                                <span className={Styles["m2"]}>{item?.description}</span>
                                                                <span className={Styles["title"]}>Giá trị:</span>
                                                                <span className={Styles["price"]}>{item.value} VND</span>
                                                                <span className={Styles["place_edit"]}>
                                                                    <EditOutlined  onClick={()=> OpenModalUpdate(item?.id)} />
                                                                </span>
                                                            </Space>
                                                        </div>
                                                    </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                }

                                {GetElement.OtherAssets.length > 0 &&
                                    <div className={Styles["box-items"]}>
                                        <div className={Styles["box_items-title"]}>
                                            <div className={Styles["box-title"]}>
                                                <img src={arr001Img} />
                                                <h5>Tài sản khác</h5>
                                            </div>
                                        </div>
                                        {GetElement.OtherAssets.length  > 0 && GetElement.OtherAssets.map((item)=>{
                                            console.log(formattedNumber(item.value));
                                            return (
                                                <div className={Styles["steps-items"]}>
                                                    <div className={Styles["goAroad"]}>
                                                        <div className={Styles["item-round"]}>
                                                            <Space direction="horizontal">
                                                                <span className={Styles["m2"]}>{item?.description}</span>
                                                                <span className={Styles["title"]}>Giá trị:</span>
                                                                <span className={Styles["price"]}>{formattedNumber(item.value)} VND</span>
                                                                <span className={Styles["place_edit"]}>
                                                                    <EditOutlined  onClick={()=> OpenModalUpdate(item?.id)} />
                                                                </span>
                                                            </Space>
                                                        </div>
                                                    </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div className={Styles["box-confirm"]}>
                <ButtonConfirm HandelUpdate={HandelTabIndex} title={"Tiếp theo"} />
            </div>
        </div>
     );
}

export default DeclaringAssetsInfo;