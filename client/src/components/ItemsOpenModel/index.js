import React from "react";
function ItemOpenModel(setOpenModel) {
    const items = [
        {
          key: '1',
          label: (
            <div 
                onClick={()=>{setOpenModel(true)}}
                className={Styles["title-add"]}
            >
                <div>Đề xuất</div>
            </div>
          ),
        },
    ];
    return items
}

export default ItemOpenModel;