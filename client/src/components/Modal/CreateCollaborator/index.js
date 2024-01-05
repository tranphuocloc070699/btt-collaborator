import React from "react";

import { Modal, Tabs,Input } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Styles from "./create-collaborator.module.css"


function CreateCollaboratorModal({ open, setOpenModal,title,collaborator,setCollaborator,onSubmit}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const onChange = (key) => {
    console.log(key);
  };

  const handleContentChange = (key,val) =>{
    setCollaborator({
      ...collaborator,
      [key]:val
    })
  }
  const items = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      children: <div>
        <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Title</p>
        <Input
              value={collaborator.title}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange('title',e.target.value)}
              placeholder="Nhập vào đây..."
            />
            
        </div>
        <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Nơi làm việc</p>
        <Input
              value={collaborator.workplace}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange('workplace',e.target.value)}
              placeholder="Nhập vào đây..."
            />
            
        </div>
        <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Link Mạng xã hội</p>
        <Input
              value={collaborator.other_social}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange('other_social',e.target.value)}
              placeholder="Nhập vào đây..."
            />
            
        </div>
        <div className={Styles[`create-collaborator-modal__footer`]}>
          <button className={Styles[`create-collaborator-modal__footer__btn`]} onClick={() =>{
            onSubmit(title)
          }}>
          {title}
          </button>
        </div>
      </div>,
    },
    // {
    //   key: '2',
    //   label: 'Liên hệ',
    //   children: 'Content of Tab Pane 2',
    // },
    // {
    //   key: '3',
    //   label: 'Công tác',
    //   children: 'Content of Tab Pane 3',
    // },
  ];
  return (
    <Modal
      open={open}
      width={600}
      title={''}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} width={300}></Tabs>
      </div>
    </Modal>
  );
}

export default CreateCollaboratorModal;
