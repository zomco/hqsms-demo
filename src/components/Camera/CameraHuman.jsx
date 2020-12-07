import React from 'react'
import api from '../../api/index'

export default class CameraHuman extends React.Component{
    constructor(props){
        super(props);
        this.state={
            baseUrl:"http://localhost:8080",
            data:[]
        }
    }
    componentDidMount(){
        api.getCameraHuman()
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
                <h1>人脸图片：</h1>
                {
                    this.state.data.map((element,index)=>{
                        let faceUrl="http://localhost:8080/file/"+element.faceUrl
                        // console.log(faceUrl);
                        return <img key={index} src={faceUrl} alt=""/>
                    })
                }

                
            </div>
        )
    }
}