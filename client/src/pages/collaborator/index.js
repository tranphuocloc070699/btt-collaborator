import React from "react";
import Styles from "./collaborator.module.css";

import Title from "../../components/Title";

import { buildData } from "../../utils/TableConfig";
import { columns } from "./tableConfig";
import { Table, Dropdown, theme } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
  FormOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { emptyUploadTrigger } from "../../store/redux/slices/uploadSlice"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment"
import {
  fetchListCollaboratorTrigger,
  fetchCollaboratorTrigger,
  createCollaboratorTrigger,
  approveCollaboratorTrigger,
  updateCollaboratorTrigger,
  deleteCollaboratorTrigger,
} from "../../store/redux/slices/collaboratorSlice";

import {
  LoadingSelector,
  listCollaboratorSelector,
  totalItemsOfListCollaboratorSelector,
  collaboratorSelector,
} from "../../store/redux/selecters";
// import PartySentimentPopup from "../../components/Modal/PartySemtiment";
import CreateCollaboratorModal from "../../components/Modal/CreateCollaborator";
import CollaboratorInfoModal from "../../components/Modal/CollaboratorInfo";
import ApproveProposalModal from "../../components/Modal/ApproveProposal";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import { CheckMicroFrontEnd } from "../../utils/Token";
import SearchCollaborator from "../../components/SearchCollaborator";
import {
  UploadSelector
} from "../../store/redux/selecters";
function Collaborator() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "",
  });
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const uploadList = useSelector(UploadSelector)
  const [page, setPage] = useState({
    page: 1,
    page_size: 10,
    sort_by: "id",
    order: "asc",
  });
  const [pageNumber, setPageNumber] = useState(10);
  const [search, setSearch] = useState({
    full_name: "",
    position: "",
    workplace: "",
  });

  const [upsaveCollaborator, setUpsaveCollaborator] = useState({
    id:  null,
    avatar: '',
    title: '',
    workplace: '',
    full_name: '',
    gender: 0,
    birth_day: '',
    resident: '',
    phone: '',
    email: '',
    other_social: '',
    position: '',
    fields: [],
    contents: [],
    care_modes: []
  });
  const [upsaveInfo, setUpsaveInfo] = useState({
    avatar: "",
    full_name: "",
    title: "",
  });

  const listCollaborator = useSelector(listCollaboratorSelector);
  const totalItems = useSelector(totalItemsOfListCollaboratorSelector);
  const collaborator = useSelector(collaboratorSelector);
  const pathMicro = CheckMicroFrontEnd();
  const loading = useSelector(LoadingSelector);
  const [items, setItems] = useState([]);

  const OnChangeDetailsPage = (record) => {
    history.push(`${pathMicro}/collaborator/manager`, {
      id: record.awareness_id,
      name: record.full_name,
    });
  };

//   const mapNumToGender = (num) => {
//     const arr = ['Nữ','Nam','Khác']
//     return arr[num];
//   }
//   const mapGenderToNum = (gender) =>{
  
//     const arr = ['Nữ','Nam','Khác']
//   const index = arr.findIndex(item => item==gender);

//     return index
// }

  const onUpsaveSubmit = (type) => {



    setGlobalLoading(true)
    if (type == "ĐỀ XUẤT") {
      const data = {
        ...upsaveCollaborator,
        avatar:uploadList[0]
       
      };

      dispatch({
        type: createCollaboratorTrigger.type,
        data,
        setOpen: setOpen,
        setLoading:setGlobalLoading
      });
    } else if (type == "CHỈNH SỬA") {
      const data = {
        ...upsaveCollaborator,
        ...(uploadList.length > 0 && {avatar:uploadList[0]})
      };
      dispatch({
        type: updateCollaboratorTrigger.type,
        data,
        setOpen: setOpen,
        setLoading:setGlobalLoading
      });
    }

    setUpsaveCollaborator({
      title:'',
      workplace:'',
      other_social:''
    })
  };

  const onConfirmModalSubmit = () => {
    setGlobalLoading(true)
    if (confirmModal.type == "APPROVE") {
      dispatch({
        type: approveCollaboratorTrigger.type,
        data: {
          id: upsaveCollaborator?.id
  
        },
        setLoading:setGlobalLoading
      });

      setConfirmModal({
        open: false,
        title: "",
      });
    } else if (confirmModal.type == "DELETE") {
      dispatch({
        type: deleteCollaboratorTrigger.type,
        data: {
          id: upsaveCollaborator?.id,
        },
        setLoading:setGlobalLoading
      });
    }
    setConfirmModal({
      open: false,
      title: "",
      type: "",
    });
  };

  // List cảm tình đảnh và phân trang theo page
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    setGlobalLoading(true)
    const query = {
      ...page,
      ...search,
    };
    dispatch({
      type: fetchListCollaboratorTrigger.type,
      data: query,
      setLoading:setGlobalLoading
    });
  };

  const onContextMenu = (record) => {
    // setUpsaveInfo({
    //   avatar: record?.avatar,
    //   full_name: record?.full_name,
    // });
    setUpsaveCollaborator({
      id: record?.id || null,
      avatar: record?.avatar,
      title: record?.title,
      workplace: record?.workplace,
      full_name: record?.full_name,
      gender: record?.gender,
      birth_day: record?.birth_day,
      resident: record?.resident,
      phone: record?.phone,
      email: record?.email,
      other_social: record?.other_social,
      position: record?.position,
      fields: record?.fields,
      contents: record?.contents,
      care_modes: record?.care_modes
    });
    switch (record?.state) {
      case "NOT_PROPOSED":
        setItems([
          {
            label: "thông tin",
            key: 0,
            icon: <InfoCircleOutlined />,
            onClick: (e) => {
        
              dispatch({
                type: fetchCollaboratorTrigger.type,
                data: {
                  id: record?.id,
                },
                setOpen: setInfoModalOpen,
                setLoading:setGlobalLoading
              });
            },
          },
          // {
          //   label: "Đề xuất",
          //   key: 1,
          //   icon: <FormOutlined />,
      
          //   onClick: (e) => {
          //     setUpsaveInfo({
          //       ...upsaveInfo,
          //       title: "ĐỀ XUẤT",
          //     });
          //     setOpen(true);
          //   },
          // },
        ])
        break;
      case "PROPOSED":
        setItems([
           {
            label: "thông tin",
            key: 0,
            icon: <InfoCircleOutlined />,
            onClick: (e) => {
              dispatch({
                type: fetchCollaboratorTrigger.type,
                data: {
                  id: record?.id,
                },
                setOpen: setInfoModalOpen,
                setLoading:setGlobalLoading
              });
            }},
            {
              label: "Duyệt đề xuất",
              key: 2,
              icon: <CheckCircleOutlined />,
              onClick: (e) => {
                setConfirmModal({
                  open: true,
                  title: `Bạn chắc chắn muốn duyệt thành viên ${upsaveInfo.full_name} trở thành cộng tác viên chuyên gia`,
                  type: "APPROVE",
                });
              },
            },

        ])
        break;

      case "ACTIVE":
        setItems([
          {
            label: "thông tin",
            key: 0,
            icon: <InfoCircleOutlined />,
            onClick: (e) => {
              dispatch({
                type: fetchCollaboratorTrigger.type,
                data: {
                  id: record?.id,
                },
                setOpen: setInfoModalOpen,
                setLoading:setGlobalLoading
              });
            }},
            {
              label: "Chỉnh sửa bổ sung",
              key: 3,
              icon: <EditOutlined />,
              onClick: (e) => {
                setUpsaveInfo({
                  ...upsaveInfo,
                  title: "CHỈNH SỬA",
                });
                setOpen(true);
              },
            },
            {
              label: "Vô hiệu hóa",
              key: 4,
              danger: true,
              icon: <CloseCircleOutlined />,
              onClick: (e) => {
                setConfirmModal({
                  open: true,
                  title: `Bạn chắc chắn muốn vô hiệu hóa thành viên ${upsaveInfo.full_name}`,
                  type: "DELETE",
                });
              },
            },
        ])
        break;

      default:
        break;
    }
  };

  const onCreateCollaboratorModalOpen = (value) =>{
    setUpsaveInfo({
      ...upsaveInfo,
      title:'ĐỀ XUẤT'
    })
    setUpsaveCollaborator({
      id:null,
      avatar: '',
      title: '',
      workplace: '',
      full_name: '',
      gender: 0,
      birth_day: '',
      resident: '',
      phone: '',
      email: '',
      other_social: '',
      position: '',
      fields: [],
      contents: [],
      care_modes: []
    })
    dispatch({
      type:emptyUploadTrigger.type,
      payload:null
    })
    setOpen(value)
  }

  return (
    <div className={Styles["party_Sentiment"]}>
      <LoadingComponent loading={globalLoading}/>
      <Title
        title={"Quản lý cộng tác viên chuyên gia - chuyên viên"}
        setOpen={onCreateCollaboratorModalOpen}
        addButton={true}
      />
      <CreateCollaboratorModal
        setOpenModal={setOpen}
        open={open}
        collaborator={upsaveCollaborator}
        setCollaborator={setUpsaveCollaborator}
        info={upsaveInfo}
        onSubmit={onUpsaveSubmit}
      />

      <CollaboratorInfoModal
        setOpenModal={setInfoModalOpen}
        open={infoModalOpen}
        collaborator={collaborator}
      />
      <ApproveProposalModal
        onSubmit={onConfirmModalSubmit}
        title={confirmModal.title}
        openModal={confirmModal.open}
        setOpenModal={() => {
          setConfirmModal({
            ...confirmModal,
            open: !confirmModal.open,
          });
        }}
      />
      <SearchCollaborator
        setSearch={setSearch}
        search={search}
        onSearch={() => fetchData()}
      />
      <div className={Styles["party_Sentiment-table"]}>
        {!loading ? (
          <Loadding />
        ) : (
          <Dropdown
            menu={{
              items,
            }}
            trigger={["contextMenu"]}
          >
            <div>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {}, // click row
                    onDoubleClick: (event) => {}, // double click row
                    onContextMenu: (event) => {
            
                      onContextMenu(record);
                    }, // right button click row
                    onMouseEnter: (event) => {}, // mouse enter row
                    onMouseLeave: (event) => {}, // mouse leave row
                  };
                }}
                columns={columns(OnChangeDetailsPage)}
                dataSource={buildData(listCollaborator)}
                pagination={{
                  position: ["bottomCenter"],
                  total: totalItems,
                  locale: { items_per_page: "" },
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                  showTotal: (total) => {
                    if (pageNumber * page < total) {
                      return `Hiển thị ${pageNumber * page} trong ${total}`;
                    }
                    return `Hiển thị ${total} trong ${total}`;
                  },
                  onChange: (page, pageNumber) => {
           
                    setPageNumber(pageNumber);
                  },
                }}
                onChange={(pageOption) => {
             
                  setPage({
                    ...page,
                    page_size: pageOption.pageSize,
                    page: pageOption.current,
                  });
                }}
              />
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Collaborator;
