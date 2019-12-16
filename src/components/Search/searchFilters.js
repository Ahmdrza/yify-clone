import React from 'react';
import {Row, Col, Select, Pagination } from 'antd';
const { Option } = Select;

const genreFilters = {
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

const sortFilters = {
    'date_added': 'Date Added',
    'year': 'Year',
    'rating': 'Rating',
    'peers': 'Peers',
    'seeds': 'Seeds'
};

const SearchFilters = ({currentPage, TotalMovies, goToPage, changeGenre, selectedGenre, applySort, selectedSort}) => {
    return(
        <Row className="search-filters">
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{margin: "0 0px 8px"}}>
                <Select
                showSearch
                placeholder="Select a genre"
                style={{ width: '80%' }}
                onChange={(value) => {
                    changeGenre(value)
                }}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectedGenre}
                >
                    {
                        Object.keys(genreFilters).map((filter, index) => (
                            <Option key={index} value={filter}>{genreFilters[filter]}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{margin: "0 0px 8px"}}>
                <Select
                showSearch
                placeholder="Sort by"
                style={{ width: '80%' }}
                onChange={(value) => {
                    applySort(value)
                }}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectedSort}
                >
                    {
                        Object.keys(sortFilters).map((filter, index) => (
                            <Option key={index} value={filter}>{sortFilters[filter]}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} style={{textAlign: 'right'}}>
                <Pagination defaultCurrent={1} current={currentPage} pageSize={50} total={TotalMovies} hideOnSinglePage={true} onChange={(page_num) => { goToPage(page_num) }} />
            </Col>
        </Row>
    );
};

export default SearchFilters;