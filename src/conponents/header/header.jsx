import React,{Component} from 'react'
import './header.less'
import {reqWeather} from '../../api'
import {formateDate} from '../../utils/dateUtils'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import storage from '../../utils/storage'
import memeryUtils from '../../utils/memeryUtils.js'


const { confirm } = Modal;
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
        
    }
    // 获取当前时间
    getTime = () => {
        this.interval1 = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({
                currentTime
            })
        },1000)
    }
    // 获取当前天气
    getWeather = async () => {
        const {dayPictureUrl,weather} = await reqWeather('洛阳')
        this.setState({
            dayPictureUrl,weather
        })
    }
    // 动态获取title
    getTitle = () => {
        // 动态获取路径
        const path = this.props.location.pathname
        let title 
        menuList.forEach(item => {
            if(item.key === path) {
                title = item.title
            } else if (item.children) {
                // 从当前item的children中查找是否有匹配的项，若有，则返回该项
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    // 退出登录
    logOut = () => {
        confirm({
            title:'退出',
            content: '确认退出么？',
            onOk: () => {
                storage.removeUser("USER_INFO")
                memeryUtils.user = {}
                this.props.history.push('/login')
            },
            onCancel(){
                console.log('cancel')
            }
        })
    }
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.interval1)
    }
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <div className="header-info">
                        <span>欢迎：</span>
                        <span>{this.props.user.username}</span>
                        <span onClick={this.logOut}>退出</span>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="header-title">
                        <span>
                            {title}
                        </span>
                    </div>
                    <div className="header-time">
                        <span>{currentTime}</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)