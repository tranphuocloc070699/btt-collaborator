import React, { useState } from "react";
import { Avatar,Image, Badge } from "antd"


function AvatarContainer({linkUrl, status}) {
    const [showImage,setShowImage] = useState(false);
    if(linkUrl && linkUrl.length>0){
    }
    return ( 
        <div>
            <Badge  
                color={status ? "#29B171" : "#A1A5B7"}
                size="small"
                count={" "}
                status={status ? "success" : "warning"} 
            >
                <Avatar
                   onClick={()=>setShowImage(true)}
                   size={"large"}
                   shape="square"
                   src={`${process.env.BASE_URL_RESOURCE}${linkUrl}`}
                   style={{
                      cursor:"pointer"
                   }}
                >
                </Avatar>
            </Badge>
      </div>
     );
}

export default AvatarContainer;