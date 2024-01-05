import React from "react";
import Styles from "./collaborator.module.css"

import Title from "../../components/Title";


import { buildData } from "../../utils/TableConfig";
import { columns } from "./tableConfig"
import { Table } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

// import { 
//     getListPartySentiment,
// } from "../../store/redux/slices/partySentimentSlice";

import {
    LoadingSelector,
    listCollaboratorSelector
} from "../../store/redux/selecters";
// import PartySentimentPopup from "../../components/Modal/PartySemtiment";
import Loadding from "../../components/Loading/LoadingComponient";
import { CheckMicroFrontEnd } from "../../utils/Token";
import SearchCollaborator from "../../components/SearchCollaborator";
function Collaborator() {
    const [open,setOpen] = useState(false)
    const [page,setPage] = useState({
        page: 1,
        page_size: 10,
        sort_by: "id",
        order: "desc"
    })
    const [pageNumber,setPageNumber] = useState(10)
    const [search,setSearch] = useState({
        full_name: ""
    })

    const listCollaborator = useSelector(listCollaboratorSelector);
    
    useEffect(() =>{
        console.log({listCollaborator})
    },[listCollaborator])

    const pathMicro = CheckMicroFrontEnd()
    // const history = useHistory()
    // const dispatch = useDispatch()
    // const total_items = useSelector(TotalItemsSentimentSelecter)
    // const list_party_sentiment = useSelector(ListpartySentimentSelecter)
    const loading = useSelector(LoadingSelector)
    
    // const UserSearchParams = ()=>{
    //     GetListSentiment()
    // }
    // const GetListSentiment = ()=>{
    //     dispatch({
    //         type: getListPartySentiment.type,
    //         data: { ...page, ...search, is_already_member: ""},
    //     })
    // }
    const OnChangeDetailsPage = (record)=>{
        history.push(`${pathMicro}/collaborator/manager`,  { id: record.awareness_id, name: record.full_name})
    }

    // // List cảm tình đảnh và phân trang theo page
    // useEffect(()=>{
    //     GetListSentiment()
    // },[page])
    
    return ( 
        <div className={Styles["party_Sentiment"]}>
            <Title title={"Quản lý cộng tác viên chuyên gia - chuyên viên"} setOpen={setOpen} addButton={true} />
            {/* <PartySentimentPopup setOpen={setOpen} open={open} /> */}
            <SearchCollaborator 
                callApiFollowOnPage={"party-awareness"}
                setSearch={setSearch} 
                search={search}  
                UserSearchParams={{}}
            />
            <div className={Styles["party_Sentiment-table"]}>
                {!loading ? <Loadding/> :  <Table 
                    columns={columns(OnChangeDetailsPage,)}
                    dataSource={buildData(listCollaborator)}  
                    pagination={{
                        position: ["bottomLeft"],
                        total: 10,
                        locale:{items_per_page:""},
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10","20","30"],
                        showTotal: (total) => {
                            if (pageNumber * page < total) {
                              return `Hiển thị ${pageNumber * page} trong ${total}`;
                            }
                            return `Hiển thị ${total} trong ${total}`;
                          },
                          onChange: (page, pageNumber) => {
                            
                            setPageNumber(pageNumber)
                          },
                    }}
                    onChange={(pageOption)=>{
                    
                        setPage({...page, page_size: pageOption.pageSize, page: pageOption.current })
                    }}
                    
                />}
               
            </div>
        </div>
    );
}

export default Collaborator;