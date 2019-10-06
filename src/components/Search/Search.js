import React, {Component} from 'react';
import { Input } from 'antd';
const { Search } = Input;

export default class SearchComponent extends Component {
    render() {
        return (
            <Search
            placeholder="Search Movies"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
            />
        )
    }
}