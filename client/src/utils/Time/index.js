// Custom thời gian tương thích với DatePiker of Antd

export const FromatDatePiker = (date = "19-09-2000", whereToCut = "-" , noReverse)=>{
    if(noReverse){
        return `${date}T00:00:00`
    }else{
        const prev = date?.split(whereToCut).reverse().join("-")
        return `${prev}T00:00:00`
    }
}


// Lấy số năm duy nhật trong 1 mảng
export const FromatYearHistory = (ListDay = [], ofQualityResult = false)=>{
    // Sử dụng cho phân tích đảng viên
    const YearList = ListDay.map((item)=>{
        return item?.date?.split("-")[0]
    })
    const OneYearList = new Set(YearList)
    if(ofQualityResult){
        return [...OneYearList].sort((a,b)=> b-a)
    }else{
        const OneYearOpen = [...OneYearList].sort((a,b)=> b-a).map((item,index)=>{
            return {
                year: item,
                open: index == 0 ? true : false
            }
        })
        return OneYearOpen
    }
}


// Sử dụng cho kê khai tài sản
export const GetElementOnYear = (year, ListDay)=>{
    return ListDay?.filter((item)=>{
        return item?.date?.split("-")[0] == year
    })
}
export const GetElementOnType= (type, data)=>{
    const home = data.filter((item)=>{
        return item.type == "Nhà"
    })
    const saveMoney = data.filter((item)=>{
        return item.type == "Tiết Kiệm"
    })
    
    const land = data.filter((item)=>{
        return item.type == "Đất"
    })
    const OtherAssets = data.filter((item)=>{
        return item.type == "Tài sản khác"
    })

    return {
        home,
        saveMoney,
        land,
        OtherAssets
    }
}




// Lấy total ngày từ start_days ==> end_days
export const TotalDays = (start,end)=>{
    const start_date = new Date(start).getTime()
    const end_date = new Date(end).getTime()

    return (end_date - start_date) / (1000 * 60 * 60 * 24)
}

// Định dạng kiểu hiển thị thời gian
export const FromatDate = (date,split = "-")=>{
    const DatePrev = date.split("-").reverse()
    return DatePrev.join(split)
}