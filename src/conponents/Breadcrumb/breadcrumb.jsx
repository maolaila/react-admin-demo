import React, { Component } from 'react'
import LinkButton from '../linkButton/linkButton'

export default class Breadcrumb extends Component {
    state = {

    }
    showFirstCate(p){
        this.props.getCateList(0)
    }
    showSonCate(e){
        let pid = e.currentTarget.getAttribute("pid")
        this.props.getSecCateList(null,pid,'back')
    }
    render() {
        return (
            <span>
                { this.props.arr.length == 0 ? <LinkButton>一级分类列表</LinkButton> : (
                    <span>
                        <LinkButton onClick={() => {
                            this.showFirstCate(0)
                        }}
                        >一级分类列表
                        </LinkButton>
                        {this.props.arr.map( item => {
                            return (
                                <LinkButton 
                                    key={item.id} 
                                    onClick={(e) => {
                                        this.showSonCate(e)
                                    }}
                                    pid={item.pId}
                                >->
                                {item.name}</LinkButton>
                            )
                        })}
                    </span>
                )}
            </span>
        )
    }
}
