import React from 'react'
import api from '../../api/index'

import { Input,Image} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';

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



export default class CameraVehicle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            onSearch : plateId =>{
                fetch("http://127.0.0.1:8080/camera/vehicle?plateChars="+plateId)
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    let imgUrl="http://localhost:8080/file/"+data[0].plateUrl
                    render( <Image src={imgUrl} style={{width:"160px",height:"80px"}} />)
                })
            },
            data:[]
        }
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
        return(
            <div>
                <div className="container" width="100px">
                    <Search placeholder="请输入车牌号" onSearch={this.state.onSearch} enterButton />
                </div>
                <br />
                <h1>车牌图片：</h1>
                {
                    this.state.data.map((element,index)=>{
                        let plateUrl="http://localhost:8080/file/"+element.plateUrl
                        return <img key={index} src={plateUrl} alt="" width="160" height="80"/>
                    })
                }

                
            </div>
        )
    }
}