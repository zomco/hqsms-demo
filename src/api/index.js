import {httpGet,httpPost,httpPost1} from '../utils/http'
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
    getCameraHuman(params){
        return httpGet(base.ownUrl+base.CameraHuman+'?page='+params.page+'&sort=createdAt,desc&size=33')
    },
    // 人脸搜索
    postRenlian(params){
        return httpPost(base.ownUrl+base.renlian,params)
    },
    // 车牌信息
    getCameraVehicle(params){
        return httpGet(base.ownUrl+base.CameraVehicle+'?page='+params.page+'&sort=createdAt,desc&size=40')
    },
    // 气象信息
    getWeather(params){
        return httpGet(base.ownUrl+base.Weather+'?page='+params.page+'&sort=createdAt,&size=10')
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
        return httpPost(base.ownUrl+base.BroadcastSetandPlay+'?id='+params+'/status')
    },
    // 播放控制
    postBroadcastSetStatus(params){
        return httpPost(base.ownUrl+base.BroadcastsetStatus+'/'+params.id+'/status?command='+params.command)
    },
    // 定时任务
    postBroadcastTask(params){
        return httpPost(base.ownUrl+base.BroadcastTask,params)
    },
    // 计划内容
    getBroadcastTaskContent(){
        return httpGet(base.ownUrl+base.BroadcastTaskContent)
    },
    // 屏幕的设备信息
    getScreen(){
        return httpGet(base.ownUrl+base.Screen)
    },
    // 获取屏幕信息
    getScreenContents(){
        return httpGet(base.ownUrl+base.ScreenContents)
    },
    // 删除屏幕节目
    getScreenDelete(){
        return httpGet(base.ownUrl+base.ScreenDelete)
    },
    // 上传视频
    postVideo(params){
        return httpPost(base.ownUrl+base.SreenVideoUpload,params)
    },
    // 上传图片
    postPicture(params){
        return httpPost1(base.ownUrl+base.SreenPicUpload,params)
    },
    // 获取屏幕计划
    getScreenPlan(){
        return httpGet(base.ownUrl+base.SreenPlans)
    },
    // 更新屏幕计划
    postScreenPlanUpdata(params){
        return httpPost(base.ownUrl+base.ScreenPlanUpdate,params)
    },
    getScreenPlanDel(params){
        return httpGet(base.ownUrl+base.ScreenPlansDel+'?planId='+params.planId)
    },
    // 获取无线网列表
    getWifis(){
        return httpGet(base.ownUrl+base.Wifi)
    },
    // 获取无线网数据列表
    getWifiLogs(){
        return httpGet(base.ownUrl+base.wifiLogs)
    },
    getAlams(){
        return httpGet(base.ownUrl+base.Alarm)
    },
    getAlarmLogs(){
        return httpGet(base.ownUrl+base.alarmLogs)
    }
}
export default api