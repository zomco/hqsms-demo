import React,{Component} from 'react'
import {Map,Markers} from 'react-amap'
import { Modal , Input , } from 'antd'
import './style/search.css'
import {
    EnvironmentOutlined
  } from '@ant-design/icons';
const mapKey = '723446c9dd673ab54bbab5ae0b3dc011' //需要去高德官网上去申请
let that;
class MyMap extends Component {
	constructor (props) {
        super (props);
        that=props
        this.state={
            value:'',
            visible:true,
            center:[113.109701,23.018782],
            modelVisible:true,
            context: [],
            assetCount: [],
            markList: [
                {
                    context: '1号灯杆',
                    position:{
                        longitude: 113.109701,
                        latitude: 23.018782,
                    },
                    assetCount: '',
                    address: ''
                },  
                {
                    context: '2号灯杆',
                    position:{
                        longitude: 113.079185,
                        latitude: 23.005324,
                    },
                    assetCount: '',
                    address: ''
                },  
                {
                    context: '3号灯杆',
                    position:{
                        longitude: 113.116275,
                        latitude: 23.029927,
                    },
                    assetCount: '',
                    address: ''
                },  
            ]
        }
        }
        handelChange=(value)=>{
            this.setState({
                value:value
            })
        }
       
        // 查询事件
        onOk=()=>{
            console.log("查询");
            let auto
            let placeSearch
            window.AMap.plugin('AMap.Autocomplete', () => {
                auto = new window.AMap.Autocomplete({
                    input: 'tipinput',
                    pageSize: 10,
                    pageIndex: 1,
                    citylimit: true,    // 仅搜索本城市的地名
                    city: '佛山', // 限制为只能搜索当前地区的位置
                    outPutDirAuto: true
                });
            })
            // 创建搜索实例
            window.AMap.plugin('AMap.PlaceSearch', () => {
                placeSearch = new window.AMap.PlaceSearch({
                    input: 'tipinput',
                    pageSize: 10,
                    pageIndex: 1,
                    citylimit: true,    // 仅搜索本城市的地名
                });
            })
            window.AMap.event.addListener(auto, "select", (e) => {
                placeSearch.search(e.poi.name)
            })
            
        }
        

        selectAddress = {
            // created必须要拥有,用来初始化创建相应对象
            created: () => {
                let auto
                let placeSearch
                window.AMap.plugin('AMap.Autocomplete', () => {
                    auto = new window.AMap.Autocomplete({
                        input: 'tipinput',
                        pageSize: 10,
                        pageIndex: 1,
                        citylimit: true,    // 仅搜索本城市的地名
                        city: '佛山', // 限制为只能搜索当前地区的位置
                        outPutDirAuto: true
                    });
                })
                // 创建搜索实例
                window.AMap.plugin('AMap.PlaceSearch', () => {
                    placeSearch = new window.AMap.PlaceSearch({
                        input: 'tipinput',
                        pageSize: 10,
                        pageIndex: 1,
                        citylimit: true,    // 仅搜索本城市的地名
                    });
                })
                window.AMap.event.addListener(auto, "select", (e) => {
                    placeSearch.search(e.poi.name)
                })
            }
        }
        //自定义icon代码
        renderLayout(extData) {
            if(extData.context==="1号灯杆"){
                return (
                    <div style={{position: 'relative'}}>
                        <div className="map_icon_num" style={{background:'#ff0000',fontColor:"#fff"}}>{extData.context}</div>
                        <div style={{width:52,height:16}}>
                            <EnvironmentOutlined style={{ 'color': '#ff0000', 'margin': '0 4px' }}/>
                        </div>
                    </div>
                );
            }
            if(extData.context==="2号灯杆"){
                return (
                    <div style={{position: 'relative'}}>
                        <div className="map_icon_num" style={{background:'#ff0000',fontColor:"#fff"}}>{extData.context}</div>
                        <div style={{width:52,height:16}}>
                            <EnvironmentOutlined style={{ 'color': '#ff0000', 'margin': '0 4px' }}/>
                        </div>
                    </div>
                );
            }
            if(extData.context==="3号灯杆"){
                return (
                    <div style={{position: 'relative'}}>
                        <div className="map_icon_num" style={{background:'#ff0000',fontColor:"#fff"}}>{extData.context}</div>
                        <div style={{width:52,height:16}}>
                            <EnvironmentOutlined style={{ 'color': '#ff0000', 'margin': '0 4px' }}/>
                        </div>
                    </div>
                );
            }
        }

        events2 ={
            click:(MapsOption, marker)=>{
                console.log(MapsOption, marker);
                    that.history.push("/myapp")
                    // that.history.push("/myapp")
            }
        }
  
	render(){
        
		return (
                <div>
                <div style={{padding:"20px",width: '100%', height: '900px'}}>
                <Map amapkey={mapKey}
                     center={this.state.center} useAMapUI
                     zoom={15} 
                     mapStyle="amap://styles/darkblue" 
                     plugins={['ToolBar']}>
                <Markers
                    events={this.events2}
                    markers={this.state.markList}
                    render={this.renderLayout}
                >
                </Markers>
                
				</Map>
               
			</div>
            <Modal title="灯杆查询" visible={this.state.modelVisible} mask={false} width="250px" 
                    cancelText="取消" okText="查询" onCancel={()=>{this.setState({modelVisible:false})}}  closable={false}
                    onOk={this.onOk} 
                    style={{position:"absolute",top:"50px",left:"50px",borderRadius:"0.3"}}
                >
                    <Input placeholder="请输入灯杆名称" onChange={this.handelChange} />
                </Modal>
                </div>
		)
	}
}

// import React from 'react'
// import {Form,Input} from 'antd'
// import * as AMap from "./AMapModule"
// class MyMap extends React.Component{
//   render(){
//       return(
//         <div style={{width:'500px'}}>
//             <Form>
//                 <Form.Item
//                           label={
//                             <span>
//                               地址
//                             </span>
//                           }>
//                           {getFieldDecorator('position', {
//                             initialValue: '北京'
//                           })(
//                             <Input placeholder={'请输入地址'} />
//                             )}
//                 </Form.Item>
//                     <AMap 
//                         lng={''}
//                         lat={''}
//                         address={getFieldValue('position')}
//                         getMapPoint={(point)=>{
//                             setFieldsValue({
//                                 latitude: point.lat,
//                                 longitude: point.lng
//                             });
//                         }}
//                         getMapAddress={(address)=>{
//                             setFieldsValue({
//                                 position: address
//                             });
//                         }}
//                     />
                
//             </Form>
//             </div>
//       )
//   }
// }



export default MyMap
