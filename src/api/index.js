import {httpGet,httpPost} from '../utils/http'
import base from './base'
const api={
    getCameraHuman(){
        return httpGet(base.ownUrl+base.CameraHuman)
    },
    postRenlian(param){
        return httpPost(base.ownUrl+base.renlian,param)
    }
}
export default api