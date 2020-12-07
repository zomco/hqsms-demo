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
    
             "Content-type":'application/x-www-form-urlencoded',
             "Accept":"application/json,text/plain,*/*"
        },
        body:qs.stringify(params)
    })
    return result
}