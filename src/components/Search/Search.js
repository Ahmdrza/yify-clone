import React, {Component} from 'react';
import { Input } from 'antd';
const { Search } = Input;
import { withRouter } from 'react-router-dom';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
    }
    redirect(value) {
        value = value.trim().replace(/ /g, '-');
        return this.props.history.push(`/search/${value}`)
    }
    render() {
        return (
            <span>
            <Search
            placeholder="Search Movies"
            onSearch={value => this.redirect(value)}
            style={{ width: 300 }}
            />
            </span>
        )
    }
}

export default withRouter(SearchComponent);