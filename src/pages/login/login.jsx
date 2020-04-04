import React,{Component} from 'react'
import './login.css'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api/index.js'
import {message} from 'antd'
import memeryUtils from '../../utils/memeryUtils.js'
import storage from '../../utils/storage.js'
import { Redirect } from 'react-router-dom';

// const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 20,
//     },
//   };
// const formTailLayout = {
//     labelCol: { span: 4 },
//     // wrapperCol: { span: 8, offset: 4 },
// };
// const btnLayout = {
//     wrapperCol: {
//         span: 24,
//     },
// }


// 登录路由组件
export default class Login extends Component {
    formRef = React.createRef();

    handleFinished = async value => {
        const {username,password} = value

        // reqLogin(username,password)
        // .then(value => console.log('成功',value))
        // .catch(reason => console.log('失败',reason))

        const res = await reqLogin(username,password)

        console.log(res)
        if(res.data.status == 0) {
            memeryUtils.user = res.data.data
            message.success('登陆成功')

            storage.saveUser("USER_INFO",memeryUtils.user)
            console.log(this,this.props)
            this.props.history.replace('/')
        } else {
            message.error(res.data.msg)
        }

    }
    handleFinishedFailes = value => {
    }
    validatePWD = (rule,value) => {
        if(value.length < 4){
            return Promise.reject("验证失败")
        } else {
            return Promise.resolve("验证成功")
        }
    }
    render() {
        // 如果已经登陆 则返回到admin
        const user = memeryUtils.user
        if(user && user._id){
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" className="logo"/>
                    <p>React:后台管理系统</p>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        ref={this.formRef}
                        onFinish={this.handleFinished}
                        onFinishFailed={this.handleFinishedFailes}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your Username!',
                            },
                            {
                                min: 4,
                                message: '用户名最少4位'
                            },
                            {
                                max: 12,
                                message: '用户名最长12位'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: '用户名只能包含英文数字下划线'
                            }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required:true,
                                    validator: this.validatePWD
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                            
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}