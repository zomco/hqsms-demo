import React from 'react'
import CameraVideo from "./Camera/CameraVideo"
import CameraHuman from './Camera/CameraHuman'
import CameraVehicle from "./Camera/CameraVehicle"
import Weather from "./Weather/Weather"
import Broadcast from "./broadcast/Broadcast"
import BroadcastContent from "./broadcast/BroadcastContent"
import BroadcastTask from "./broadcast/BroadcastTask"
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
            <SubMenu
              key="sub1"
              title={<span><span>摄像头</span></span>}
            >
               <Menu.Item key="1"><Link to="/camera">实时视频</Link></Menu.Item>
               <Menu.Item key="2"><Link to="/camera/human">人脸抓拍</Link></Menu.Item>
               <Menu.Item key="3"><Link to="/camera/vehicle">车牌抓拍</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
            <Link to="/weather">气象传感器</Link>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={<span>广播</span>}
            >
              <Menu.Item key="5"><Link to="/broadcast/broadcast">设备信息</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/broadcast/content">实时播放</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/broadcast/task">定时任务</Link></Menu.Item>
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
            <Route exact path="/broadcast/broadcast" component={Broadcast}></Route>
            <Route path="/broadcast/content" component={BroadcastContent}></Route>
            <Route path="/broadcast/task" component={BroadcastTask}></Route>
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
          <Footer style={{ textAlign: 'center' }}>HQSMS Demo ©2020 Created by Distlab</Footer>
        </Layout>
      </Layout>
     </Router> 
    )
  }
}
