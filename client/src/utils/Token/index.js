import { useJwt } from "react-jwt"
const jwt = require('jsonwebtoken');

// GET TOKEN
export const getToken = (key = "usertoken")=>{
    if(document.cookie.length > 0){
        const cookies = document.cookie.split("; ");
        let token;
        for (const value of cookies) {
            if(value.split("=")[0] === key){
                token = value.split("=")[1]
            }
        }
        return token
    }    
}

// DECODE TOKEN
export const parseToken = (token)=>{
    if(token){
        const { decodedToken, isExpired } = useJwt(token) 
        return decodedToken
    }
}


// GET TOKEN ON REQUEST BACKEND

export const getHeaderToken = (req)=>{
    const { authorization } = req.headers;
    return {
        headers: { Authorization: authorization }
    }
}

export const CheckMicroFrontEnd = ()=>{
    return window.location.href.includes("erp") ? "/party" : ""
}


export const parseJwt = (token = "") => {
    var base64Url = token?.split(".")[1]
    var base64 = undefined;
    var jsonPayload = undefined
    if(base64Url){
        base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join("")
        )
        return JSON.parse(jsonPayload)
    }

}


export const generateToken = () => {
    const payload = { test: 'st' };
    const secretKey = 'btt';

  return jwt.sign(payload, secretKey, { expiresIn: '3s' });
}