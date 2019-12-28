import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
const { Header } = Layout;

import SearchComponent from '../Search/Search';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Header>
                <div className="logo"><Link to="/">YIFY CLONE</Link></div>
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px', background: '#1890ff' }}

                >
                </Menu>
                </Header>
            </div>
        )
    }
}