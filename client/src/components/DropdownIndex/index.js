import React from "react";
import ModelAnalysisResult from "../../components/Modal/AnalysisResult";
import DeclaringAssets from "../../components/Modal/DeclaringAssets"
import GoAbroad from "../../components/Modal/GoAbroad"
import RewardAndDiscipline from "../../components/Modal/RewardAndDiscipline"


function DropdownIndex(openModalTabIndex,open, setOpenModel, IDUpdate, QualityEvalutionListStort, setIdUpdate) {

    switch (openModalTabIndex){
        case 1 :
            return <ModelAnalysisResult open={open} setOpenModel={setOpenModel} IDUpdate={IDUpdate} setIdUpdate={setIdUpdate} QualityEvalutionListStort={QualityEvalutionListStort} />
        case 2: 
            return <RewardAndDiscipline open={open} setOpenModel={setOpenModel} />
        case 4: 
            return <DeclaringAssets open={open} setOpenModel={setOpenModel} IDUpdate={IDUpdate} setIdUpdate={setIdUpdate} />
        case 5: 
            return <GoAbroad open={open} setOpenModel={setOpenModel}  IDUpdate={IDUpdate} setIdUpdate={setIdUpdate}/>
    }
        
}

export default DropdownIndex;