import React from "react";
import Styles from "./collaborator.module.css"

import Title from "../../components/Title";


import { buildData } from "../../utils/TableConfig";
import { columns } from "./tableConfig"
import { Table,Dropdown,theme } from "antd";
import {CheckCircleOutlined,EditOutlined,CloseCircleOutlined} from "@ant-design/icons"

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

import { 
  fetchListCollaboratorTrigger,
} from "../../store/redux/slices/collaboratorSlice";

import {
    LoadingSelector,
    listCollaboratorSelector,
    totalItemsOfListCollaboratorSelector
} from "../../store/redux/selecters";
// import PartySentimentPopup from "../../components/Modal/PartySemtiment";
import CreateCollaboratorModal from "../../components/Modal/CreateCollaborator"
import CollaboratorInfoModal from "../../components/Modal/CollaboratorInfo"
import Loadding from "../../components/Loading/LoadingComponient";
import { CheckMicroFrontEnd } from "../../utils/Token";
import SearchCollaborator from "../../components/SearchCollaborator";

const items = [
    {
      label: 'Duyệt đề xuất',
      key: '1',
      icon: <CheckCircleOutlined />,
    },
    {
      label: 'Chỉnh sửa bổ sung',
      key: '2',
      icon:<EditOutlined />
    },
    {
      label: 'Vô hiệu hóa',
      key: '3',
      danger:true,
      icon:<CloseCircleOutlined />
    },
  ];

function Collaborator() {
  const dispatch = useDispatch();
    const [open,setOpen] = useState(false)
    const [infoModalOpen,setInfoModalOpen] = useState(false)
    const [collaboratorSelected,setCollaboratorSelected] = useState(null)
    const [page,setPage] = useState({
        page: 1,
        page_size: 10,
        sort_by: "id",
        order: "desc"
    })
    const [pageNumber,setPageNumber] = useState(10)
    const [search,setSearch] = useState({
        full_name: "",
        dep_names:"",
        pos_names:"",
        workplace:"",
        is_collaborator:true
    })

    const [upsaveCollaborator,setUpsaveCollaborator] = useState({
      title:'',
      workplace:'',
      other_social:''
    })
    

 
    

    const listCollaborator = useSelector(listCollaboratorSelector);
    const totalItems = useSelector(totalItemsOfListCollaboratorSelector);
    
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

    const onUpsaveSubmit = (type) =>{
      console.log({type})
      console.log({upsaveCollaborator})
    }

    // List cảm tình đảnh và phân trang theo page
    useEffect(()=>{
      const query = {
        ...page,
        ...search
      }
        dispatch({
          type:fetchListCollaboratorTrigger.type,
          data:query
        })
    },[page])
    
    return ( 
        <div className={Styles["party_Sentiment"]}>
            <Title title={"Quản lý cộng tác viên chuyên gia - chuyên viên"} setOpen={setOpen} addButton={true} />
            <CreateCollaboratorModal setOpenModal={setOpen} open={open} title={'ĐỀ XUẤT'} collaborator={upsaveCollaborator} setCollaborator={setUpsaveCollaborator}  onSubmit={onUpsaveSubmit}/>
            <CollaboratorInfoModal setOpenModal={setInfoModalOpen} open={infoModalOpen} collaborator={collaboratorSelected} setCollaborator={setCollaboratorSelected} />
            <SearchCollaborator 
                setSearch={setSearch} 
                search={search}  
            />
            <div className={Styles["party_Sentiment-table"]}>
                {!loading ? <Loadding/> :  
                   <Dropdown
                   menu={{
                     items,
                   }}
                   trigger={['contextMenu']}
                 >
                <div>
                  {JSON.stringify(totalItems)}
                <Table
                 onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        setCollaboratorSelected(record)
                        setInfoModalOpen(true)
                      
                      }, // click row
                      onDoubleClick: (event) => {}, // double click row
                      onContextMenu: (event) => {console.log({event:record})}, // right button click row
                      onMouseEnter: (event) => {}, // mouse enter row
                      onMouseLeave: (event) => {}, // mouse leave row
                    };
                  }}
                    columns={columns(OnChangeDetailsPage,)}
                    dataSource={buildData(listCollaborator)}  
                    pagination={{
                        position: ["bottomLeft"],
                        total: totalItems,
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
                            console.log({pageNumber})
                            setPageNumber(pageNumber)
                          },
                    }}
                    onChange={(pageOption)=>{
                      console.log({pageOption})
                        setPage({...page, page_size: pageOption.pageSize, page: pageOption.current })
                    }}
                    
                /> 
                </div>
                 
                 </Dropdown>
                }
               
            </div>
        </div>
    );
}

export default Collaborator;