import React from "react"
import { Space , Input , } from 'antd'
const { Search } = Input;
const AMap = window.AMap;
let that;
export default class Map extends React.Component{
    constructor(props){
        that=props;
        super(props);
        this.state={
            
        }
    }

    componentDidMount() {
        this.marker1 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [113.109701,23.018782],
            title: '1号灯杆'
        });
        this.marker2 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [113.079185,23.005324],
            title: '2号灯杆'
        });
        this.marker3 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [113.116275,23.029927],
            title: '3号灯杆'
        });
        
        // 初始化地图
        this.map = new AMap.Map("container", {
          resizeEnable:true,
          center:[113.109701,23.018782],
          zoom: 13,
          mapStyle:"amap://styles/darkblue"
        });
        this.marker1.on('click',function() {
            that.history.push("/myapp")
        })

        this.map.add([this.marker1,this.marker2,this.marker3])
    
    }

    onSearch = value => {
        console.log(value)
        if (value==='1号灯杆') {
            this.map.panTo([113.109701, 23.018782]);
        }else if(value==='2号灯杆') {
            this.map.panTo([113.079185,23.005324]);
        }else if(value==='3号灯杆') {
            this.map.panTo([113.116275,23.029927]);
        }else{
            alert('没有找到该灯杆')
        }
    };

    render(){
        return(
            <>
                <div id="container"  style ={{width:"100%",height:"1095px"}}></div>
                <div style={{position:"absolute",top:"50px",left:"50px"}}>
                    <Space direction="vertical">
                    <Search placeholder="请输入灯杆名称" onSearch={this.onSearch} enterButton />
                    </Space>
                </div>
                
           </>
        )
    }
}