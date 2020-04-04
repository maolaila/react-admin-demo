import React, { Component } from 'react'
import {Card,Table,Button,message} from 'antd'
import {SubnodeOutlined} from '@ant-design/icons';
import {getList,addCategory} from '../../api/index.js'
import Breadcrumb from '../../conponents/Breadcrumb/breadcrumb.jsx'

export default class Category extends Component {

    state = {
        cateList: [],
        loading: true,
        parentId: '0',  // 默认获取一级
        parentName: '',
        fakeBreadcrumbArr:[],
    }
    // 初始化列数据
    initColums = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'id标识',
                dataIndex: '_id',
                key: '_id'
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: (text,record,index) => (
                    <div>   
                        <span style={{color:'green',cursor:'pointer'}} onClick={() => {this.addCategory(text,record,index)}}>修改分类&nbsp;&nbsp;</span>
                        <span style={{color:'green',cursor:'pointer'}} onClick={() => {this.getSecCateList(text,record,index)}}>&nbsp;&nbsp;查看子分类</span>
                    </div>
                )
            },
        ];
    }
    // 二级
    getSecCateList = (text,record,index) => {
        
        this.tempArr.push({
            name:record.name,
            pId: record.parentId,
            id: record._id
        })
        
        this.setState({
            parentId:record._id,
            fakeBreadcrumbArr: this.tempArr,
            parentName:record.name
        },() => {
            this.getCateList(this.state.parentId)
        })
    }
    // 获取分类列表
    getCateList = async (parentId) => {
        if(parentId == 0){
            this.tempArr = []
        }
        const {data} = await getList(parentId)
        if(data.status === 0) {
            this.setState({
                cateList:data.data,
                loading: false,
                fakeBreadcrumbArr:[]
            })
        } else {
            this.setState({
                loading: false
            })
            message.error('列表获取失败')
        }
    }
    // 添加分类
    addCategory = async (text,record,index) => {
        const params = {
            parentId: record._id,
            categoryName: '132'
        }
        const {data} = await addCategory(params)
        console.log(data)
    }
    // willMonut同步准备数据 同步指定数据用this.xxx，异步获取数据用this.setState
    componentWillMount(){
        this.tempArr = []
        this.initColums()
    }
    // didMount发异步请求，
    componentDidMount(){
        // 获取一级分类列表
        this.getCateList(this.state.parentId)
    }
    render() {
        const title = 
        <Breadcrumb arr={this.tempArr} 
            getSecCateList={this.getSecCateList}
            getCateList={this.getCateList}
            fakeBreadcrumbArr={this.state.fakeBreadcrumbArr}
        />
        const extra = (
            <Button>
                <SubnodeOutlined />
                <span>添加</span>
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra} size="small">
                    <Table 
                        dataSource={this.state.cateList} 
                        columns={this.columns} 
                        bordered
                        rowKey='_id'
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['5','10','15','20']
                        }}
                        loading={this.state.loading}
                    />
                </Card>
            </div>
        )
    }
}
