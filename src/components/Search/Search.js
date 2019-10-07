import React, {Component} from 'react';
import { Input } from 'antd';
const { Search } = Input;
import { withRouter, Redirect } from 'react-router-dom';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
    }
    redirect(value) {
        this.props.history.push(`/search/${value}`)
    }
    render() {
        const { match } = this.props;
        console.log(match);
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