import {httpGet,httpPost} from '../utils/http'
import base from './base'
const api={
    // 查看实时视频
    postCameraVideo(params){
        return httpPost(base.ownUrl+base.CameraLive,params)
    },
    // 回放
    postCameraPlay(params){
        return httpPost(base.ownUrl+base.CameraPlay,params)
    },
    // 控制视野
    postCameraPtz(params){
        return httpPost(base.ownUrl+base.CameraPtz,params)
    },
    // 人脸信息
    getCameraHuman(){
        return httpGet(base.ownUrl+base.CameraHuman)
    },
    // 人脸搜索
    postRenlian(params){
        return httpPost(base.ownUrl+base.renlian,params)
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
    // 删除音频
    BroadcastDelete(params){
        return httpPost(base.ownUrl+base.BroadcastDelete,params)
    },
    // 创建会话
    postBroadcastCreateSession(params){
        return httpPost(base.ownUrl+base.BroadcastCreateSession,params)
    },
    // 实时播放
    postBroadcastSetandPlay(params){
        return httpPost(base.ownUrl+base.BroadcastSetandPlay,params)
    },
    // 定时任务
    postBroadcastTask(params){
        return httpPost(base.ownUrl+base.BroadcastTask,params)
    },
    // 计划内容
    getBroadcastTaskContent(){
        return httpGet(base.ownUrl+base.BroadcastTaskContent)
    }
}
export default api