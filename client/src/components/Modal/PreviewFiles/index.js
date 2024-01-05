import { Modal } from "antd";
import React from "react";
function PreviewFile( {setViewFiles,ViewFiles} ) {
   
    return ( 
        <Modal
            closeIcon={false}
            open={ViewFiles?.openViewFile}
            footer={false}
            width={1000}
            onCancel={()=> setViewFiles({...ViewFiles,openViewFile: false})}
        >
            <iframe width={"100%"} height={600} src={`${process.env.BASE_URL_RESOURCE}${ViewFiles?.linkUrl}`}>

            </iframe>
        </Modal>
     );
}

export default PreviewFile;