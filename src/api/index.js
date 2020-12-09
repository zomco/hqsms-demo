import {httpGet,httpPost} from '../utils/http'
import base from './base'
const api={
    getCameraHuman(){
        return httpGet(base.ownUrl+base.CameraHuman)
    },
    postRenlian(param){
        return httpPost(base.ownUrl+base.renlian,param)
    },
    getCameraVehicle(){
        return httpGet(base.ownUrl+base.CameraVehicle)
    },
    getWeather(){
        return httpGet(base.ownUrl+base.Weather)
    }
}
export default api