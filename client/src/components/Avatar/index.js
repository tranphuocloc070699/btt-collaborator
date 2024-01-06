import React, { useState } from "react";
import { Avatar,Image, Badge } from "antd"


function AvatarContainer({linkUrl, status}) {
    const [showImage,setShowImage] = useState(false);
    if(linkUrl && linkUrl.length>0){
    }

    const convertStatusColor = () =>{
        if(!status || status=='NOT_PROPOSED') return '#A1A5B7';
        if(status=='PROPOSED') return 'yellow';
        if(status=='ACTIVE') return '#29B171';

    }
    
    return ( 
        <div>
            <Badge  
                color={convertStatusColor()}
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