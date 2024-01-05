import React from "react";

import { Modal, Tabs, Input } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import stateIcon from "../../../assets/img/Duotone.svg"
import genderIcon from "../../../assets/img/gender.svg"
import mailIcon from "../../../assets/img/email.svg"
import locationIcon from "../../../assets/img/location.svg"
import Styles from "./collaborator-info.module.css";

function CollaboratorInfoModal({ open, setOpenModal,collaborator,setCollaborator  }) {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Modal
      title={`THÔNG TIN`}
      open={open}
      width={750}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      <div className={Styles[`collaborator-info-modal__container`]}>
        <div className={Styles[`collaborator-info-modal__header`]}></div>
        <div className={Styles[`collaborator-info-modal__body`]}>
            {/* Body Top */}
          <div className={Styles[`collaborator-info-modal__body__top`]}>
            <img
              className={Styles[`collaborator-info-modal__body__top__image`]}
              src={`https://mdbcdn.b-cdn.net/img/new/avatars/2.webp`}
            />
            <div className={Styles[`collaborator-info-modal__body__top__info`]}>
                {/* Username and phone */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__top__info__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__top__info__block__username`
                    ]
                  }
                >
                  Lâm Tấn Tài
                  <span
                    className={
                      Styles[
                        `collaborator-info-modal__body__top__info__block__phone`
                      ]
                    }
                  >
                    0123456789
                  </span>
                </p>
              </div>
              {/* gender and email */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__top__info__block`]
                }
              >
                 <div className={Styles[`collaborator-info-modal__body__top__info__block__item`]}>
                 <img src={stateIcon} className={Styles[`collaborator-info-modal__body__top__info__block__icon`]}/>
                 <p className={Styles[`collaborator-info-modal__body__top__info__block__icon__title`]}>Placeholder</p>   
                 </div>
                 <div className={Styles[`collaborator-info-modal__body__top__info__block__item`]}>
                 <img src={genderIcon} className={Styles[`collaborator-info-modal__body__top__info__block__icon`]}/>
                 <p className={Styles[`collaborator-info-modal__body__top__info__block__icon__title`]}>Placeholder</p>   
                 </div>
                 <div className={Styles[`collaborator-info-modal__body__top__info__block__item`]}>
                 <img src={mailIcon} className={Styles[`collaborator-info-modal__body__top__info__block__icon`]}/>
                 <p className={Styles[`collaborator-info-modal__body__top__info__block__icon__title`]}>Placeholder</p>   
                 </div>

              </div>
              {/* location */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__top__info__block`]
                }
              >
                <div className={Styles[`collaborator-info-modal__body__top__info__block__item`]}>
                 <img src={locationIcon} className={Styles[`collaborator-info-modal__body__top__info__block__icon`]}/>
                 <p className={Styles[`collaborator-info-modal__body__top__info__block__icon__title`]}>Placeholder</p>   
                 </div>
              </div>
            </div>
          </div>
          {/* Body Bottom */}
          <div className={Styles[`collaborator-info-modal__body__bottom`]}>
                <div className={Styles[`collaborator-info-modal__body__bottom__block`]}>
                    <p className={Styles[`collaborator-info-modal__body__bottom__block__title`]}>Placeholder</p>
                    <div className={Styles[`collaborator-info-modal__body__bottom__block__value`]}>Placeholder
                    
                    </div>
                </div>
                <div className={Styles[`collaborator-info-modal__body__bottom__block`]}>
                    <p className={Styles[`collaborator-info-modal__body__bottom__block__title`]}>Placeholder</p>
                    
                <div className={`${Styles['collaborator-info-modal__body__bottom__block__value']} ${Styles['flex']}`}>
                        Placeholder
                        <div className={Styles[`collaborator-info-modal__body__bottom__block__value__tag`]}>
                        <p className={Styles[`collaborator-info-modal__body__bottom__block__value__tag__item`]}>
                            Tag item 1
                            </p>
                            <p className={Styles[`collaborator-info-modal__body__bottom__block__value__tag__item`]}>
                            Tag item 1
                            </p>
                            <p className={Styles[`collaborator-info-modal__body__bottom__block__value__tag__item`]}>
                            Tag item 1
                            </p>
                        </div>
                        </div>
                </div>

          </div>
        </div>
        {/* Footer */}
        <div className={Styles[`collaborator-info-modal__footer`]}>
            <button className={Styles[`collaborator-info-modal__footer__btn`]}>ĐÓNG</button>
        </div>
      </div>
    </Modal>
  );
}

export default CollaboratorInfoModal;
