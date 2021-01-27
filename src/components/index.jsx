import React,{Component} from 'react'
import {Map,Markers} from 'react-amap'
import { Space , Input , } from 'antd'
// import './style/search.css'
import {
    EnvironmentOutlined
  } from '@ant-design/icons';
const mapKey = '723446c9dd673ab54bbab5ae0b3dc011' //需要去高德官网上去申请
const { Search } = Input;
let that;
class MyMap extends Component {
	constructor (props) {
        super (props);
        that=props
        this.state={
            value:'',
            visible:true,
            address:'佛山市',
            distance:'禅城区',
            center:[113.109701,23.018782],
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

    
        onSearch = value => {
            console.log(value)
            if (value==='1号灯杆') {
                AMap.event.addDomListener(document.getElementById('pantoBtn'), 'click', function() {
                    map.panTo([116.405467, 39.907761]);
                });
            }
        };
        handelChange=(value)=>{
            this.setState({
                value:value
            })
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
                <div style={{position:"absolute",top:"50px",left:"50px"}}>
                    <Space direction="vertical">
                    <Search placeholder="请输入灯杆名称" onSearch={this.onSearch} enterButton />
                    </Space>
                </div>
                </div>
		)
	}
}


export default MyMap
