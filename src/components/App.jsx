import React,{lazy,Suspense} from 'react'
import CameraVideo from "./Camera/CameraVideo"
import CameraHuman from './Camera/CameraHuman'
import CameraVehicle from "./Camera/CameraVehicle"
import Weather from "./Weather/Weather"
import { BrowserRouter as Router,Route,Link } from "react-router-dom"
import 'antd/dist/antd.css';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout,Menu} from 'antd';
// 引入子菜单组件
const SubMenu = Menu.SubMenu
const { Footer, Sider, Content } = Layout

export default class App extends React.Component{
  render() {
    return (
      <Router>
        <Layout>
        <Sider width={250} style={{ minHeight: '100vh', color: 'white' }}>
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            <Link to="/weather">气象传感器</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><span>摄像头</span></span>}
            >
               <Menu.Item key="2"><Link to="/camera">实时视频</Link></Menu.Item>
               <Menu.Item key="3"><Link to="/camera/human">人脸抓拍</Link></Menu.Item>
               <Menu.Item key="4"><Link to="/camera/vehicle">车牌抓拍</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><span>广播</span></span>}
            >
               <Menu.Item key="2"><Link to="/broadcast">广播</Link></Menu.Item>
               <Menu.Item key="3"><Link to="/camera/human">广播</Link></Menu.Item>
               <Menu.Item key="4"><Link to="/camera/vehicle">广播</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Content style={{ margin: '15px 14px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Route exact path="/weather" component={Weather} />
            <Route exact path="/camera" component={CameraVideo} />
            <Route exact path="/camera/human" component={CameraHuman} />
            <Route path="/camera/vehicle" component={CameraVehicle}></Route>
            {/* {props.children} */}
            </div>
          </Content>
          {/* <Content
          className="site-layout-background"
          style={{
              padding: 24,
              margin: 0,
              minHeight: 360,
          }}
          >
          <Route exact path="/camera" component={Camera} />
          </Content> */}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
     </Router> 
    )
  }
}
