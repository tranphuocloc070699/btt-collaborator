import React from "react";

import PartySentimentInformation from "../PartySentiment/Party_sentiment_information";
import PartySympathiesClass from "../PartySentiment/PartySympathiesClass";
import ProfileStatus from "../PartySentiment/ProfileStatus/index"




function onTabConTentPartySentiment(tabIndex,setOnTab) {

  switch (tabIndex) {
    case 0:
      return <PartySentimentInformation tabIndex={tabIndex} setOnTab={setOnTab}/>;
    case 1:
      return <ProfileStatus tabIndex={tabIndex} setOnTab={setOnTab}/>;
    case 2:
      return <PartySympathiesClass tabIndex={tabIndex} />;
    // case 2:
    //     return <DisciplineAndReward tabIndex={tabIndex} />
    // case 3:
    //     return <ChangePartyActivities tabIndex={tabIndex} />
    // case 4:
    //     return <DeclaringAssetsInfo tabIndex={tabIndex} />
    // case 5:
    //     return <GoAbroadInfo tabIndex={tabIndex} />
  }
}

export default onTabConTentPartySentiment;
