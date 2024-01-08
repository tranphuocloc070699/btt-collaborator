const axios = require("axios") 
const multer = require("multer")
const FormData = require('form-data')
const fs = require("fs")
const path = require("path")
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const maxFileSize = 10 * 1024 * 1024 // 10 MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".gif" &&
            ext !== ".webm" &&
            ext !== ".jpeg" &&
            ext !== ".txt" &&
            ext !== ".doc" &&
            ext !== ".docx" &&
            ext !== ".xlsx" &&
            ext !== ".xls" &&
            ext !== ".pdf" &&
            ext !== ".mp3" &&
            ext !== ".mp4"
        ) {
            return cb(new Error("Chỉ cho phép hình ảnh và tài liệu"))
        }
        cb(null, true)
    },
    limits: { fileSize: maxFileSize }
}).any()



const uploadFiles  = async (req,res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.json(err)
        } else if (err) {
            res.json({ code: err.message })
        } else {
            if(req.files){
                const formData = new FormData()
                let { authorization } = req.headers

                // console.log(process.env.BASE_URL_RESOURCE);
                for (const file of req.files) {
                    formData.append("files", fs.readFileSync(file?.path), file?.filename);
                }

                axios.post(`${process.env.BASE_URL_RESOURCE}/resources/?service_management_id=booking-service&table_management_id=booking-detail-meeting-room&alias_name=InfoSuggestBooking&type="files"&is_private=false`, formData,  
                    { headers: 
                        { 
                            "content-type": "multipart/form-data",
                            "Authorization" : authorization
                        }
                    })
                    .then((response)=>{
                        res.send(response.data)
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
            }
        }
    })
}

module.exports = {
    uploadFiles
}