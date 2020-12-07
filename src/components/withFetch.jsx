import React from 'react'
const WithFetch = (url)=>(imgUrl)=>{
    return class extends React.Component{
        constructor(){
            super()
            this.state={
                isLoaging:true,
                data:null
            }
        }
    componentDidMount(){
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                isLoaging:false,
                data:data
            })
        })
    }
    render(){
        if(this.state.isLoaging){
            return(
                <div>Loading</div>
            )
        }else{
            fetch(imgUrl)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    isLoaging:false,
                    data:data
                })
               
            })
            }
    }
    }
}
 export default WithFetch