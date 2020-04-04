import axios from 'axios'
import {message} from 'antd'
/*
封装axios库，返回值是promise对象
 优化：统一处理请求异常
 在外层包裹一层Promise对象，请求出错时不使用reject，而用message作为错误提示

 */
export default function ajax(url,data={},method='get') {
    // 封装请求异常处理
    return new Promise((resolve,reject) => {
        let promise
        if(method==='get'){
            promise = axios.get(url,{
                params: data
            })
        } else {
            promise = axios.post(url,data)
        }
        promise.then( value => resolve(value) ).catch(err => message.error('请求出错了：'+err))
    })
}