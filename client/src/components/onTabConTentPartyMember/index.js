import React from "react";
import GoAbroadInfo from "../PartyMember/GoAbroadInfo";
import DisciplineAndReward from "../PartyMember/DisciplineAndReward";
import DeclaringAssetsInfo from "../PartyMember/DeclaringAssetsInfo";
import ChangePartyActivities from "../PartyMember/ChangePartyActivities";
import InfomationPartyMember from "../PartyMember/Party_member_information";
import PartyMemberAnalysisResultfrom from "../PartyMember/Party_member_AnalysisResult";

function onTabPartyMember(tabIndex, setOnTab) {
    switch (tabIndex){
        case 0:
            return <InfomationPartyMember tabIndex={tabIndex} setOnTab={setOnTab} />
        case 1:
            return <PartyMemberAnalysisResultfrom tabIndex={tabIndex}  setOnTab={setOnTab}/>
        case 2: 
            return <DisciplineAndReward tabIndex={tabIndex} setOnTab={setOnTab} />
        case 3: 
            return <ChangePartyActivities tabIndex={tabIndex} setOnTab={setOnTab} />
        case 4: 
            return <DeclaringAssetsInfo tabIndex={tabIndex}  setOnTab={setOnTab}  />
        case 5: 
            return <GoAbroadInfo tabIndex={tabIndex}  setOnTab={setOnTab} />
    }
}

export default onTabPartyMember;