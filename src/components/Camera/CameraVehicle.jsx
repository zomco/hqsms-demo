import React from 'react'
import api from '../../api/index'

export default class CameraVehicle extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
                <h1>车牌图片：</h1>
                {
                    this.state.data.map((element,index)=>{
                        let plateUrl="http://localhost:8080/file/"+element.plateUrl
                        // console.log(faceUrl);
                        return <img key={index} src={plateUrl} alt=""/>
                    })
                }

                
            </div>
        )
    }
}