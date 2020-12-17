// 对get和post请求进行封装
import qs from 'querystring'
export function httpGet(url){
    const result = fetch(url);
    return result
}
export function httpPost(url,params){
    const result = fetch(url,{
        method:"POST",
        headers:{
    
            //  "Content-type":'application/x-www-form-urlencoded',
            "Content-type":'application/json',
            "Accept":"application/json,text/plain,*/*",

        },
        // body:qs.stringify(params)
        body:JSON.stringify(params)
    })
    return result
}
export function httpPut(url,params){
    const result =fetch(url,{
        method:"PUT",
        body:qs.stringify(params)
    })
    return result
}