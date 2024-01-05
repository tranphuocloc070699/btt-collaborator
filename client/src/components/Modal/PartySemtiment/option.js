export const optionSelect = [
    {
        value : "file",
        label : "Viết file"
    },
    {
        value : "book",
        label : "Viết cuốn"
    },
    {
        value : "verification",
        label : "Xác minh xu tra"
    },
    {
        value : "opinion",
        label : "Lấy ý kiến tổ chức công tác xã hội"
    },
]

 // Check tình trạng của Hồ Sơ
export const ActionStatus = (status, store)=>{
    switch (status){
        case "file":
            return {
                type: "file",
                start_date: store.start_date,
                complete_date: store.complete_date,
                file_background_addition_date: store.complete_date
            }
        case "book":
            return {
                type: "book",
                start_date: store.start_date,
                complete_date: store.complete_date,
            }
        case "verification":
            return {
                type: "verification",
                verification_destination: store.verification_destination,
                verification_party_member: store.verification_party_member
            }
        case "opinion":
            return {
                type: "opinion",
                opinion_trade_union: store.opinion_trade_union,
                opinion_youth_union: store.opinion_youth_union,
                opinion_residence_committee: store.opinion_residence_committee
            }
    }
} 