import React, {Component} from 'react';
import Main from '../Main/Main';
import { withRouter, Redirect } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query:''
        };
    }

    render() {
        return (
            <div>
                <h2>Showing results for <b>{this.props.match.params.query.replace(/-/g, ' ')}</b></h2>
                <Main search={this.props.match.params.query}/>
            </div>
        )
    }
}

export default withRouter(SearchResults);