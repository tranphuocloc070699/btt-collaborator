import React from "react";
import Styles from "./searchCollaborator.module.css";

import { Button, Input, Select } from "antd";
import { useDispatch,useSelector } from "react-redux";

// import { getDepartments, getPartyMemberCell } from "../../store/redux/slices/profileSlice";
// import { depListSelecter, PartyMemberCellSelecter } from "../../store/redux/selecters"

function SearchCollaborator({setSearch, search, UserSearchParams, callApiFollowOnPage}) {

    const dispatch = useDispatch();
    // const dep = useSelector(depListSelecter)
    // const PartyMemberCell = useSelector(PartyMemberCellSelecter)
    
    const onSearch = ()=>{
        UserSearchParams()
    }


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
                        placeholder="Chức danh/Chức vụ"
                        onFocus={()=>{
                            // dispatch({
                            //     type: getDepartments.type,
                            //     data: {
                            //         page: 1,
                            //         page_size: 9999,
                            //         sort_by: "id",
                            //         order: "desc",
                            //         party: callApiFollowOnPage
                            //     }
                            // })
                        }}
                        // options={dep.length && dep.map((item)=>{
                        //     return {
                        //         label: item,
                        //         value: item
                        //     }
                        // })}
                        options={[
                            {
                                value:0,
                                label:"BTT"
                            }
                        ]}
                        onChange={(value)=>{setSearch({...search, dep_names: value || "" })}}
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
                        // options={PartyMemberCell.length && PartyMemberCell.map((item)=>{
                        //     return {
                        //         label: item,
                        //         value: item
                        //     }
                        // })}
                        // onFocus={()=>{
                        //     dispatch({
                        //         type: getPartyMemberCell.type,
                        //         data: callApiFollowOnPage
                        //     })
                        // }}
                        onChange={(value)=>{setSearch({...search, [`${callApiFollowOnPage}_cell`.replace("-","_")]: value || "" })}}
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