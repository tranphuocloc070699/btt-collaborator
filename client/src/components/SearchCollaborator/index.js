import React, { useEffect } from "react";
import Styles from "./searchCollaborator.module.css";

import { Button, Input, Select } from "antd";
import { useDispatch,useSelector } from "react-redux";

import { fetchDepartmentListTrigger, fetchPositionListTrigger } from "../../store/redux/slices/collaboratorSlice";
import {
    LoadingSelector,
    listDepartmentSelector,
    listPositionSelector
  } from "../../store/redux/selecters";
function SearchCollaborator({setSearch, search,onSearch}) {

    const dispatch = useDispatch();
    const listDepartment = useSelector(listDepartmentSelector)
    const listPosition = useSelector(listPositionSelector)
    

    useEffect(() =>{
        dispatch({
            type:fetchDepartmentListTrigger.type,
            data:{
                dep_names:''
            }
        })
        dispatch({
            type:fetchPositionListTrigger.type,
            data:{
                pos_names:''
            }
        })
    },[])


    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return ( 
        <div className={Styles["box_search"]}>
           <div className={Styles["box_search_in"]}>
                <div className={Styles["search_name"]}>
                    <Input
                        maxLength={30}
                        placeholder="Họ và tên"
                        onChange={(e)=>setSearch({...search, full_name: e.target.value || "" })}
                    />
                </div>
                <div className={Styles["search_pb"]}>
                    <Select
                        allowClear
                        showSearch
                        filterOption={filterOption}
                        placeholder="Chức danh"
                        options={listDepartment}
                        onChange={(value)=>{
                            console.log({value})
                            setSearch({...search, dep_names: value || "" })
                        }}
                    />
                </div>
                <div className={Styles["search_pb"]}>
                    <Select
                        allowClear
                        showSearch
                        filterOption={filterOption}
                        placeholder="Chức vụ"
                        options={listPosition}
                        onChange={(value)=>{setSearch({...search, pos_names: value || "" })}}
                    />
                </div>
                <div className={Styles["search_pb"]}>
                    <Select
                        showSearch
                        filterOption={filterOption}
                        placeholder="Nơi công tác"
                        allowClear
                        options={
                            [
                                {
                                    value:0,
                                    label:"BTT"
                                }
                            ]
                        }
                        onChange={(value)=>{setSearch({...search, workplace: value || "" })}}
                    />
                </div>
           </div>
           <div className={Styles["box_search_out"]}>
                <Button 
                    type="ghost" 
                    onClick={()=>{onSearch()}}
                >
                    Tìm kiếm
                </Button>
           </div>
        </div>
     );
}

export default SearchCollaborator;