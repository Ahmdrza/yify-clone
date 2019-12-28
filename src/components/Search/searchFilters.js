import React from 'react';
import {Row, Col, Select, Pagination, Input, Divider  } from 'antd';
const { Option } = Select;
const { Search } = Input;

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

const ratingFilters = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
};

const SearchFilters = ({filters, TotalMovies, goToPage, changeGenre, applySort, setRating, searchString, handleSearchString, setSearchTerm}) => {
    return(
        <Row className="search-filters">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <p style={{
                    marginBottom: '3px',
                    fontWeight: 'bold'
                }}>Keyword:</p>
                <Search
                placeholder="Enter a keyword"
                size="large"
                className="search-keyword"
                value={searchString}
                onChange = {(event) => {
                    handleSearchString(event)
                }}
                onSearch={value => setSearchTerm(value)}
                style={{ width: '100%', marginBottom: '1rem' }}
                />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{margin: "0 0px 8px"}}>
                <p style={{
                    marginBottom: '3px',
                    fontWeight: 'bold'
                }}>Genre:</p>
                <Select
                showSearch
                placeholder="Select a genre"
                style={{ width: '90%' }}
                onChange={(value) => {
                    changeGenre(value)
                }}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={filters.genre}
                >
                    {
                        Object.keys(genreFilters).map((filter, index) => (
                            <Option key={index} value={filter}>{genreFilters[filter]}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{margin: "0 0px 8px"}}>
                <p style={{
                    marginBottom: '3px',
                    fontWeight: 'bold'
                }}>Sort By:</p>
                <Select
                showSearch
                placeholder="Sort by"
                style={{ width: '90%' }}
                onChange={(value) => {
                    applySort(value)
                }}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={filters.sort_by}
                >
                    {
                        Object.keys(sortFilters).map((filter, index) => (
                            <Option key={index} value={filter}>{sortFilters[filter]}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{margin: "0 0px 8px"}}>
                <p style={{
                    marginBottom: '3px',
                    fontWeight: 'bold'
                }}>Minimum Rating:</p>
                <Select
                placeholder="Minimum Rating"
                style={{ width: '90%' }}
                onChange={(value) => {
                    setRating(value)
                }}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={filters.minimum_rating}
                >
                    {
                        Object.keys(ratingFilters).map((filter, index) => (
                            <Option key={index} value={filter}>{ratingFilters[filter]}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
                <Pagination defaultCurrent={1} current={filters.page} pageSize={30} total={TotalMovies} hideOnSinglePage={true} onChange={(page_num) => { goToPage(page_num) }} />
            </Col>
            <Divider />
        </Row>
    );
};

export default SearchFilters;