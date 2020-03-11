// 入口JS
import React from 'react'
import ReactDom from 'react-dom'
// import 'antd/dist/antd.css'
import App from './App'
import strage from './utils/storage'
import memeryUtils from './utils/memeryUtils'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';

memeryUtils.user = strage.getUser("USER_INFO")

// 将根组件渲染到index.html的root div上
ReactDom.render(
    <ConfigProvider locale={zhCN}>
        <App></App>
    </ConfigProvider>,
    document.getElementById("root"))