import React,{Component} from 'react'
import memeryUtils from '../../utils/memeryUtils.js'
import { Redirect,Route,Switch } from 'react-router-dom'
import storage from '../../utils/storage.js'

import { Layout } from 'antd';
// Components
import LeftNav from '../../conponents/left-nav/leftNav.jsx'
import Heade from '../../conponents/header/header.jsx'
// page
import Home from '../home/home.jsx'
import Category from '../category/category.jsx'
import Product from '../product/product'
import Role from '../role/role.jsx'
import User from '../user/user.jsx'
import Pie from '../charts/pie.jsx'
import Bar from '../charts/bar.jsx'
import Line from '../charts/line.jsx'




const { Header, Footer, Sider, Content } = Layout;

// 后台管理路由组件
export default class Admin extends Component {
    render() {
        const user = memeryUtils.user
        if(!user || !user._id){
            // 在render中跳转到登录
            return <Redirect to="/login"></Redirect>
        }   else {
            return (
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header style={{padding:0}}>
                            <Heade user={user}></Heade>
                        </Header>
                        <Content style={{margin:'20px',backgroundColor:'#fff',borderRadius:'10px',padding:'10px',height:'100%',overflow:'auto'}}>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/category' component={Category} />
                                <Route path='/product' component={Product} />
                                <Route path='/role' component={Role} />
                                <Route path='/user' component={User} />
                                <Route path='/pie' component={Pie} />
                                <Route path='/bar' component={Bar} />
                                <Route path='/line' component={Line} />
                                <Redirect to='/home' />
                            </Switch>
                        </Content>
                        <Footer style={{backgroundColor:'#CCC',textAlign:'center'}}>请使用chrome浏览器</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}