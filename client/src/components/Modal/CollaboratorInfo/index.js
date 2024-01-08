import React from "react";

import { Modal, Tabs, Input } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import stateIcon from "../../../assets/img/Duotone.svg";
import genderIcon from "../../../assets/img/gender.svg";
import mailIcon from "../../../assets/img/email.svg";
import locationIcon from "../../../assets/img/location.svg";
import Styles from "./collaborator-info.module.css";

function CollaboratorInfoModal({ open, setOpenModal, collaborator }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const extractAvatarFromArray = () => {
    if (!collaborator?.avatar)
      return (
        <div
          style={{ width: 80, height: 80, backgroundColor: "#dbdbdb" }}
        ></div>
      );
    return (
      <img
        className={Styles[`collaborator-info-modal__body__top__image`]}
        src={`${process.env.BASE_URL_RESOURCE}${collaborator?.avatar}`}
      />
    );
  };

  const convertBirdthDate = () => {
    if (!collaborator?.birth_day) return "";

    const dateObject = new Date(collaborator?.birth_day);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();

    const formattedDateString = `${day}-${month}-${year}`;
    return formattedDateString;
  };

  return (
    <Modal
      title={`THÔNG TIN`}
      open={open}
      width={750}
      footer={false}
      onCancel={() => setOpenModal(false)}
    >
      {collaborator && Object.keys(collaborator).length > 0 && (
        <div className={Styles[`collaborator-info-modal__container`]}>
          <div className={Styles[`collaborator-info-modal__header`]}></div>
          <div className={Styles[`collaborator-info-modal__body`]}>
            {/* Body Top */}
            <div className={Styles[`collaborator-info-modal__body__top`]}>
              {extractAvatarFromArray()}
              <div
                className={Styles[`collaborator-info-modal__body__top__info`]}
              >
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
                    {collaborator?.full_name}
                    <span
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__phone`
                        ]
                      }
                    >
                      {collaborator?.phone}
                    </span>
                  </p>
                </div>
                {/* title gender and email */}
                <div
                  className={
                    Styles[`collaborator-info-modal__body__top__info__block`]
                  }
                >
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__top__info__block__item`
                      ]
                    }
                  >
                    <img
                      src={stateIcon}
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon`
                        ]
                      }
                    />
                    <p
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon__title`
                        ]
                      }
                    >
                      {collaborator?.title}
                    </p>
                  </div>
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__top__info__block__item`
                      ]
                    }
                  >
                    <img
                      src={genderIcon}
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon`
                        ]
                      }
                    />
                    <p
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon__title`
                        ]
                      }
                    >
                      {collaborator?.gender == 1 ? "Nam" : collaborator?.gender==0 ?"Nữ" : "Khác"}
                    </p>
                  </div>
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__top__info__block__item`
                      ]
                    }
                  >
                    <img
                      src={mailIcon}
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon`
                        ]
                      }
                    />
                    <p
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon__title`
                        ]
                      }
                    >
                      {collaborator?.email}
                    </p>
                  </div>
                </div>
                {/* location */}
                <div
                  className={
                    Styles[`collaborator-info-modal__body__top__info__block`]
                  }
                >
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__top__info__block__item`
                      ]
                    }
                  >
                    <img
                      src={locationIcon}
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon`
                        ]
                      }
                    />
                    <p
                      className={
                        Styles[
                          `collaborator-info-modal__body__top__info__block__icon__title`
                        ]
                      }
                    >
                      {collaborator?.resident}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Body Bottom */}
            <div className={Styles[`collaborator-info-modal__body__bottom`]}>
              {/* dep_pos */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Chức vụ/ Chức danh:
                </p>
                <div
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__value`
                    ]
                  }
                >
                  {collaborator?.position}
                </div>
              </div>
              {/* Workplace */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Nơi công tác:
                </p>
                <div
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__value`
                    ]
                  }
                >
                  {collaborator?.workplace}
                </div>
              </div>
              {/* birth day */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Ngày tháng năm sinh:
                </p>
                <div
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__value`
                    ]
                  }
                >
                  {convertBirdthDate()}
                </div>
              </div>
              {/* other_social */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Liên kết:
                </p>
                <div
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__value`
                    ]
                  }
                >
                  {collaborator?.other_social}
                </div>
              </div>
              {/* Corllaborative fields */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Nội dung cộng tác
                </p>

                <div
                  className={`${Styles["collaborator-info-modal__body__bottom__block__value"]} ${Styles["flex"]}`}
                >
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__bottom__block__value__tag`
                      ]
                    }
                  >
                  
                    {collaborator?.fields?.length > 0 &&
                      collaborator?.fields.map((item, index) => (
                        <p
                          key={index}
                          className={
                            Styles[
                              `collaborator-info-modal__body__bottom__block__value__tag__item`
                            ]
                          }
                        >
                          {item}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              {/* Corllaborative contents */}
              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Lĩnh vực công tác:
                </p>

                <div
                  className={`${Styles["collaborator-info-modal__body__bottom__block__value"]} ${Styles["flex"]}`}
                >
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__bottom__block__value__tag`
                      ]
                    }
                  >
                    {collaborator?.contents?.length > 0 &&
                      collaborator?.contents.map((item, index) => (
                        <p
                          key={index}
                          className={
                            Styles[
                              `collaborator-info-modal__body__bottom__block__value__tag__item`
                            ]
                          }
                        >
                          {item}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              {/* Corllaborative fields */}

              <div
                className={
                  Styles[`collaborator-info-modal__body__bottom__block`]
                }
              >
                <p
                  className={
                    Styles[
                      `collaborator-info-modal__body__bottom__block__title`
                    ]
                  }
                >
                  Chế độ chăm sóc:
                </p>

                <div
                  className={`${Styles["collaborator-info-modal__body__bottom__block__value"]} ${Styles["flex"]}`}
                >
                  <div
                    className={
                      Styles[
                        `collaborator-info-modal__body__bottom__block__value__tag`
                      ]
                    }
                  >
                    {collaborator?.care_modes?.length > 0 &&
                      collaborator?.care_modes.map((item, index) => (
                        <p
                          key={index}
                          className={
                            Styles[
                              `collaborator-info-modal__body__bottom__block__value__tag__item`
                            ]
                          }
                        >
                          {item}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className={Styles[`collaborator-info-modal__footer`]}>
            <button
              className={Styles[`collaborator-info-modal__footer__btn`]}
              onClick={() => setOpenModal(false)}
            >
              ĐÓNG
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default CollaboratorInfoModal;
