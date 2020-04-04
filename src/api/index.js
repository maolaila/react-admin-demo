import ajax from './ajax.js'
import jsonp from 'jsonp'
import {message} from 'antd'
const Base = 'http://localhost:5000'
// 登录
export const reqLogin = (username,password) => ajax('/login',{username,password},'post')

// 添加用户
export const reqAddUser = (userInfo) => ajax('/manage/user/add',userInfo,'post')

// 获取天气参数
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    const opt = {}
    return new Promise((resolve,reject) => {
        jsonp(url,opt,(err,data) => {
            if(err){
                // console.log('jsonp',err,data)
                message.error('获取天气失败')
            } else {
                // console.log('jsonp',err,data)
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }
        })
    })
    
    
}
// 获取分类列表 一级或二级
export const getList = (parentId) => ajax('/manage/category/list',{parentId},'get')

// 添加分类
export const addCategory = (data) => ajax('/manage/category/add',data,'post')