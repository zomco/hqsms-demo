import React from 'react'
import api from '../../api/index'

import { Input,Image,Pagination,List, Card} from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  
// const onSearch = plateId => console.log(plateId);

let plateUrl=[];

export default class CameraVehicle extends React.Component{
        state={
            imgUrl:'',
            // onSearch : plateId =>{
            //     fetch("http://127.0.0.1:8080/camera/vehicle?plateChars="+plateId)
            //     .then(res=>res.json())
            //     .then(data=>{
            //         console.log(data);
            //         let imgUrl="http://localhost:8080/file/"+data[0].plateUrl
            //         render( <Image src={imgUrl} style={{width:"160px",height:"80px"}} />)
            //     })
            // },
            data:[],
            
        }
        onSearch=(plateId)=>{
            fetch("http://127.0.0.1:8080/camera/vehicle?plateChars="+plateId)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                this.setState({
                    imgUrl:"http://47.115.144.65/api/file/"+data[0].plateUrl
                })
                console.log(this.setState.imgUrl);
            })
        
        }
        getImgUrl=()=>{
            this.state.data.map((element)=>{
                plateUrl.push(element[plateUrl])
                // let plateUrl="http://localhost:8080/file/"+element.plateUrl
                // return <img key={index} src={plateUrl} alt="" width="160" height="80"/>
                
            })
        }
    
    componentDidMount(){
        api.getCameraVehicle()
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                data:data
            })
            
        })
    }
  
    render(){
        let plateUrl=""
        let getData=[]
        getData.push (this.state.data.map((element,index)=>{
                plateUrl="http://47.115.144.65/api/file/"+element.plateUrl
                return <img key={index} src={plateUrl} alt="" width="160" height="80"/>
            }))
        console.log(getData);
        
        return(
            <div>
                <div className="container" width="100px">
                    <Search placeholder="请输入车牌号" onSearch={this.onSearch} enterButton />
                    <Image src={this.state.imgUrl} style={{width:"160px",height:"80px"}} />
                </div>
                <br />
                <h1>车牌图片：</h1>
                <List 
                grid={{
                column:8,
                gutter:10,
                }}
                pagination={{onChange:page=>{console.log(page);},pageSize:48,defaultCurrent:1,total:500}}
                dataSource={getData[0]}
                renderItem={item=>(
                    <List.Item>
                    {item}
                    </List.Item>
                )}/>
                {/* {
                    this.state.data.map((element,index)=>{
                        plateUrl="http://localhost:8080/file/"+element.plateUrl
                        return <img key={index} src={plateUrl} alt="" width="160" height="80"/>
                    })
                } */}
                
                {/* <Pagination defaultCurrent={1} total={500} onChange={this.handleChange} /> */}

                
            </div>
        )
    }
}