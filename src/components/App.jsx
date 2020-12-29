import React from 'react'
import CameraVideo from "./Camera/CameraVideo"
import CameraHuman from './Camera/CameraHuman'
import CameraVehicle from "./Camera/CameraVehicle"
import Weather from "./Weather/Weather"
import Broadcast from "./broadcast/Broadcast"
import BroadcastContent from "./broadcast/BroadcastContent"
import BroadcastTask from "./broadcast/BroadcastTask"
import Screen from "./screen/Screen"
import ScreenContent from "./screen/ScreenContent"
import Wifi from "./wifi/Wifi"
import Charging from "./charging/Charfing"
import Alarm from "./alarm/Alarm"
import AContent from "./alarm/Content"





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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="4">
            <Link to="/">气象传感器</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><span>摄像头</span></span>}
            >
               <Menu.Item key="1"><Link to="/camera">实时视频</Link></Menu.Item>
               <Menu.Item key="2"><Link to="/camera/human">人脸抓拍</Link></Menu.Item>
               <Menu.Item key="3"><Link to="/camera/vehicle">车牌抓拍</Link></Menu.Item>
            </SubMenu>
            
            <SubMenu
              key="sub2"
              title={<span>广播</span>}
            >
              <Menu.Item key="5"><Link to="/broadcast/broadcast">设备信息</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/broadcast/content">实时播放</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/broadcast/task">定时任务</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span>显示屏</span>}
              >
                <Menu.Item key="8"><Link to="/screen">设备信息</Link></Menu.Item>
                <Menu.Item key="9"><Link to="/screen/contents">屏幕内容</Link></Menu.Item>
            </SubMenu>
            
            <Menu.Item key="">
            <Link to="/wifi">WIFI</Link>
            </Menu.Item>

            <SubMenu
              key="sub5"
              title={<span>报警器</span>}
              >
                <Menu.Item key="12"><Link to="/alarm">设备信息</Link></Menu.Item>
                <Menu.Item key="13"><Link to="/alram/contents">设备数据</Link></Menu.Item>
            </SubMenu>

            <Menu.Item key="10">
            <Link to="/charging">充电桩</Link>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout >
          <Content style={{ margin: '25px 25px',padding:'50px 50px',background: '#fff',minHeight:480 }}>
            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> */}
            <Route exact path="/" component={Weather} />
            <Route exact path="/camera" component={CameraVideo} />
            <Route exact path="/camera/human" component={CameraHuman} />
            <Route path="/camera/vehicle" component={CameraVehicle}></Route>
            <Route exact path="/broadcast/broadcast" component={Broadcast}></Route>
            <Route path="/broadcast/content" component={BroadcastContent}></Route>
            <Route path="/broadcast/task" component={BroadcastTask}></Route>
            <Route exact path="/screen" component={Screen}></Route>
            <Route path="/screen/contents" component={ScreenContent}></Route>
            <Route path="/wifi" component={Wifi}></Route>
            <Route exact path="/alarm" component={Alarm}></Route>
            <Route path="/alarm/contents" component={AContent}></Route>
            <Route path="/charging" component={Charging}></Route>
            
            {/* </div> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>HQSMS Demo ©2020 Created by Distlab</Footer>
        </Layout>
      </Layout>
     </Router> 
    )
  }
}
