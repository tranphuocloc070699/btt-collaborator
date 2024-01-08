import React from "react";
import { Modal, Tabs, Input, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import editIconFigma from "../../../assets/img/edit-icon-figma.svg";
import { getUpload } from "../../../store/redux/slices/uploadSlice";
import Styles from "./create-collaborator.module.css";
import { FormatDatePiker } from "../../../utils/Time";
import dayjs from "dayjs";
import { UploadSelector } from "../../../store/redux/selecters";
function CreateCollaboratorModal({
  open,
  setOpenModal,
  collaborator,
  setCollaborator,
  onSubmit,
  info,
}) {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const location = useLocation();
  const uploadList = useSelector(UploadSelector);
  const onChange = (key) => {};

  const handleContentChange = (key, val) => {
    setCollaborator({
      ...collaborator,
      [key]: val,
    });
  };

  const handleUpload = (e) => {
    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append("file", file);
    }
    dispatch({
      type: getUpload.type,
      data: formData,
    });
  };

  const extractAvatarFromArray = (avatar) => {
    if (uploadList && uploadList.length > 0)
      return `${process.env.BASE_URL_RESOURCE}${uploadList[0]}`;

    if (avatar) return `${process.env.BASE_URL_RESOURCE}${avatar}`;

    return "";
  };
  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: (
        // <div>
        //   <div className={Styles[`create-collaborator-modal__block`]}>
        //     {extractAvatarFromArray(info?.avatar)}
        //     <p>{info?.full_name}</p>
        //   </div>
        //   <div className={Styles[`create-collaborator-modal__block`]}>
        //     <p>Title</p>
        //     <Input
        //       value={collaborator.title}
        //       className={`${Styles["profile-status-modal-body__block__input"]}`}
        //       onChange={(e) => handleContentChange("title", e.target.value)}
        //       placeholder="Nhập vào đây..."
        //     />
        //   </div>
        //   <div className={Styles[`create-collaborator-modal__block`]}>
        //     <p>Nơi làm việc</p>
        //     <Input
        //       value={collaborator.workplace}
        //       className={`${Styles["profile-status-modal-body__block__input"]}`}
        //       onChange={(e) => handleContentChange("workplace", e.target.value)}
        //       placeholder="Nhập vào đây..."
        //     />
        //   </div>
        //   <div className={Styles[`create-collaborator-modal__block`]}>
        //     <p>Link Mạng xã hội</p>
        //     <Input
        //       value={collaborator.other_social}
        //       className={`${Styles["profile-status-modal-body__block__input"]}`}
        //       onChange={(e) =>
        //         handleContentChange("other_social", e.target.value)
        //       }
        //       placeholder="Nhập vào đây..."
        //     />
        //   </div>
        //   <div className={Styles[`create-collaborator-modal__footer`]}>
        //     <button
        //       className={Styles[`create-collaborator-modal__footer__btn`]}
        //       onClick={() => {
        //         onSubmit(title);
        //       }}
        //     >
        //       {title}
        //     </button>
        //   </div>
        // </div>

        <div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Ảnh đại diện</p>
            <div className={Styles["create-collaborator-modal__block__avatar"]}>
              {extractAvatarFromArray(collaborator?.avatar) && (
                <img src={extractAvatarFromArray(collaborator?.avatar)} />
              )}
              <div
                className={Styles["create-collaborator-modal__block__uploader"]}
              >
                <img
                  src={editIconFigma}
                  className={
                    Styles["create-collaborator-modal__block__uploader__icon"]
                  }
                />
                <input
                  type="file"
                  className={
                    Styles["create-collaborator-modal__block__uploader__input"]
                  }
                  onChange={handleUpload}
                />
              </div>
            </div>
          </div>

          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Danh xưng, học hàm, học vị</p>
            <Input
              value={collaborator.title}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Nhập vào đây..."
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Họ và tên</p>
            <Input
              value={collaborator.full_name}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("full_name", e.target.value)}
              placeholder="Nhập vào đây..."
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Giới tính</p>
            {/* <Input
              value={collaborator.gender}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("gender", e.target.value)}
              placeholder="Nam/Nữ"
            /> */}

            <Select
            className={`${Styles["profile-status-modal-body__block__select"]}`}
              placeholder="Giới tính"
              options={[
                {
                  value:0,
                  label:'Nữ'
                },
                {
                  value:1,
                  label:'Nam'
                },
                {
                  value:2,
                  label:'Khác'
                },
              ]}
              value={collaborator?.gender}
              onChange={(value) => handleContentChange("gender",value)}
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Chức vụ/ chức danh</p>
            <Input
              value={collaborator.position}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("position", e.target.value)}
              placeholder="Nhập vào đây..."
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Nơi công tác</p>
            <Input
              value={collaborator.workplace}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("workplace", e.target.value)}
              placeholder="Nhập vào đây..."
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Ngày tháng năm sinh</p>
            <DatePicker
              className={Styles["profile-status-modal-body__block__input"]}
              format={"DD-MM-YYYY"}
              placeholder="Chọn ngày sinh"
              value={
                collaborator?.birth_day
                  ? dayjs(`${FormatDatePiker(collaborator?.birth_day, true)}`)
                  : ""
              }
              onChange={(e) => {
                if (e) {
                  handleContentChange(
                    "birth_day",
                    `${e?.year()}-${e?.month() + 1}-${e?.date()}`
                  );
                } else {
                  handleContentChange("birth_day", ``);
                }
              }}
            />
          </div>
          <div className={Styles[`create-collaborator-modal__footer`]}>
            <button
              className={Styles[`create-collaborator-modal__footer__btn`]}
              onClick={() => {
                onSubmit(info?.title);
              }}
            >
              {info?.title}
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Liên hệ",
      children: (
        <div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Địa chỉ liên hệ</p>
            <TextArea
              style={{ width: 380 }}
              value={collaborator.resident}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("resident", e.target.value)}
              placeholder="Nhập vào đây..."
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Số điện thoại</p>
            <Input
              value={collaborator.phone}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("phone", e.target.value)}
              placeholder="0123456789"
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Email</p>
            <Input
              value={collaborator.email}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) => handleContentChange("email", e.target.value)}
              placeholder="example@gmail.com"
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Khác</p>
            <Input
              value={collaborator.other_social}
              className={`${Styles["profile-status-modal-body__block__input"]}`}
              onChange={(e) =>
                handleContentChange("other_social", e.target.value)
              }
              placeholder="Link mạng xã hội "
            />
          </div>
          <div className={Styles[`create-collaborator-modal__footer`]}>
            <button
              className={Styles[`create-collaborator-modal__footer__btn`]}
              onClick={() => {
                onSubmit(info?.title);
              }}
            >
              {info?.title}
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Công tác",
      children: (
        <div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Nội dung công tác</p>

            <Select
              mode="tags"
              style={{ width: "100%" }}
              className={`${Styles["profile-status-modal-body__block__select"]}`}
              value={collaborator?.fields}
              onChange={(value) => {
                handleContentChange("fields", value);
              }}
              dropdownStyle={{ display: "none" }}
              showSearch={false}
              suffixIcon={<></>}
              tokenSeparators={[","]}
              options={[]}
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Lĩnh vực công tác</p>

            <Select
              mode="tags"
              style={{ width: "100%" }}
              className={`${Styles["profile-status-modal-body__block__select"]}`}
              value={collaborator?.contents}
              onChange={(value) => {
                handleContentChange("contents", value);
              }}
              dropdownStyle={{ display: "none" }}
              showSearch={false}
              suffixIcon={<></>}
              tokenSeparators={[","]}
              options={[]}
            />
          </div>
          <div className={Styles[`create-collaborator-modal__block`]}>
            <p>Chế độ chăm sóc</p>

            <Select
              mode="tags"
              style={{ width: "100%" }}
              className={`${Styles["profile-status-modal-body__block__select"]}`}
              value={collaborator?.care_modes}
              onChange={(value) => {
                handleContentChange("care_modes", value);
              }}
              dropdownStyle={{ display: "none" }}
              showSearch={false}
              suffixIcon={<></>}
              tokenSeparators={[","]}
              options={[]}
            />
          </div>
          <div className={Styles[`create-collaborator-modal__footer`]}>
            <button
              className={Styles[`create-collaborator-modal__footer__btn`]}
              onClick={() => {
                onSubmit(info?.title);
              }}
            >
              {info?.title}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleChange = (value) => {};
  return (
    <Modal
      open={open}
      width={600}
      closable={false}
      title={info?.title}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      <div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          width={300}
        ></Tabs>
      </div>
    </Modal>
  );
}

export default CreateCollaboratorModal;
