import React from "react";

import { Modal, Tabs,Input } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Styles from "./approve-proposal.module.css"


function ApproveProposalModal({ title,onSubmit,openModal,setOpenModal}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const onChange = (key) => {
    console.log(key);
  };


 
  return (
    <Modal
      open={openModal}
      width={600}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      <div className={`${Styles['approve-proposal-container']}`}>
          <h2 className={`${Styles['approve-proposal-title']}`}>{title}</h2>
          <div className={Styles['approve-proposal-footer']}> 
            <button className={`${Styles['approve-proposal-footer-btn']} ${Styles['cancel']}`} onClick={() => () => setOpenModal(false)}>
              Quay lại
            </button>
            <button className={`${Styles['approve-proposal-footer-btn']} ${Styles['submit']}`} onClick={() => onSubmit()}>
               Đồng ý
            </button>
          </div>
      </div>
    </Modal>
  );
}

export default ApproveProposalModal;
