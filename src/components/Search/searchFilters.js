import React, {Component} from 'react';
import {Row, Col, Select} from 'antd';
const { Option } = Select;

const filters = {
    'all': 'All',
    'action': 'Action',
    'adventure': 'Adventure',
    'animation': 'Animation',
    'biography': 'Biography',
    'comedy': 'Comedy',
    'crime': 'Crime',
    'documentary': 'Documentary',
    'drama': 'Drama',
    'family': 'Family',
    'fantasy': 'Fantasy',
    'film-noir': 'Film-Noir',
    'game-show': 'Game-Show',
    'history': 'History',
    'horror': 'Horror',
    'music': 'Music',
    'musical': 'Musical',
    'mystery': 'Mystery',
    'news': 'News',
    'reality-tv': 'Reality-TV',
    'romance': 'Romance',
    'sci-fi': 'Sci-Fi',
    'sport': 'Sport',
    'talk-show': 'Talk-Show',
    'thriller': 'Thriller',
    'war': 'War',
    'western': 'Western'
};

class SearchFilters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Row className="search-filters">
                <Col span={24}>
                    <Select
                    showSearch
                    placeholder="Select a genre"
                    style={{ width: '20%' }}
                    onChange={this.handleChange}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            Object.keys(filters).map((filter, index) => (
                                <Option key={index} value={filter}>{filters[filter]}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
        )
    }
}

export default SearchFilters;