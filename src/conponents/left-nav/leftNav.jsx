import React,{Component} from 'react'
import './leftNav.less'
import {Link,withRouter} from 'react-router-dom'
import { Menu,Icon } from 'antd';
import { UpSquareFilled,AndroidFilled } from '@ant-design/icons'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
class LeftNav extends Component {
    /*
    根据menu的数据数组生成对应标签的数组
    */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu 
                        key={item.key} 
                        title={
                            <span>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    getMenuNodes_reduce = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre,item) => {
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                // 查找一个与当前请求路径匹配的子item 
                const cItem = item.children.find(cItem => cItem.key === path)
                
                if(cItem) {
                    // 如果存在，则需要打开
                    this.openKey = item.key
                }
                
                pre.push((
                    <SubMenu 
                        key={item.key} 
                        title={
                            <span>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    foo = () => {
        console.log(this.props)
    }
    componentWillMount(){
        this.node = this.getMenuNodes_reduce(menuList)
    }
    render() {
        const path =  this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to="/home" className="left-nav-head" >
                    <h1 onClick={this.foo}>我草大傻逼</h1>
                </Link>
                <Menu 
                    mode="inline" 
                    theme="dark" 
                    selectedKeys={[path]} 
                    defaultOpenKeys={[openKey]}
                >
                    {
                        // this.getMenuNodes_map(menuList)
                        // this.getMenuNodes_reduce(menuList)
                        this.node

                    }
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)