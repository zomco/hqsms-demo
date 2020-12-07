import React from 'react'
export default class ErrorBoundary extends React.Component{
    state={
        hasError:false,
        error:null,
        errorInfo:null
    }
    componentDidCatch(error,errorInfo){
        this.state={
            hasError:true,
            error:error,
            errorInfo:errorInfo
        }
    }
    render(){
       if(this.state.hasError){
        return  <div>{this.props.render(this.state.error,this.state.errorInfo)}</div>
       }
        return this.props.children    
    }
}