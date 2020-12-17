import {httpGet,httpPost} from '../utils/http'
import base from './base'
const api={
    // 人脸信息
    getCameraHuman(){
        return httpGet(base.ownUrl+base.CameraHuman)
    },
    // 人脸搜索
    postRenlian(param){
        return httpPost(base.ownUrl+base.renlian,param)
    },
    // 车牌信息
    getCameraVehicle(){
        return httpGet(base.ownUrl+base.CameraVehicle)
    },
    // 气象信息
    getWeather(){
        return httpGet(base.ownUrl+base.Weather)
    },
    // 广播设备信息
    getBroadcast(){
        return httpGet(base.ownUrl+base.Broadcast)
    },
    // 音频信息
    getBroadcastContent(){
        return httpGet(base.ownUrl+base.BroadcastContent)
    },
    // 创建会话
    postBroadcastCreateSession(params){
        return httpPost(base.ownUrl+base.BroadcastCreateSession,params)
    },
    // 实时播放
    postBroadcastSetandPlay(params){
        return httpPost(base.ownUrl+base.BroadcastSetandPlay,params)
    }
}
export default api