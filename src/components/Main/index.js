import React, {useState, useEffect} from 'react';
import { Row, Col, Spin, notification, Empty } from 'antd';
import axios from 'axios';
import MovieDetail from './MovieDetail';
import SearchFilters from '../Search/searchFilters';
import { withRouter, Redirect } from 'react-router-dom';
import MovieCard from './MovieCard';
import TrailerModal from './TrailerModal';

const notifyFavFunct = (type = 'success') => {
    notification[type]({
        message: 'Add To Favorites',
        description:
        'You can now mark movies as favorites. Click on star icon to mark as favorite.',
    });
};

const Main = () => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [favMovies, setFavMovies] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filters, setFilters] = useState({
        query_term : '',
        page: 1,
        limit: 30,
        order_by: 'desc',
        with_rt_ratings: true,
        genre: 'all',
        sort_by: 'date_added',
        minimum_rating: 0
    });
    const [selected_movie, setSelectedMovie] = useState(null);
    const [show_movie_detail, setShowMovieDetail] = useState(false);
    const [TotalMovies, setTotalMovies] = useState(0);
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
    const [ytVideoId, setytVideoId] = useState(null);
    const [queryString, setQueryString] = useState('');

    const getMovies = () => {
        axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${filters.query_term.replace(/-/g, ' ')}&page=${filters.page}&limit=${filters.limit}&order_by=${filters.order_by}&with_rt_ratings=${filters.with_rt_ratings}&genre=${filters.genre}&sort_by=${filters.sort_by}&minimum_rating=${filters.minimum_rating}`, {crossDomain : true}).then(response => {
            if(response.data.data.movie_count > 0) {
                updateMoviesList(response.data.data.movies)
            } else {
                updateMoviesList([])
            }
            setTotalMovies(parseInt(response.data.data.movie_count));
            setLoading(false)
        }).catch( error => {
            console.log('error')
            setLoading(false)
        })
    };

    const updateMoviesList = (movies) => {
        setMovies(movies);
    };

    const showMovieDetail = (movie) => {
        setSelectedMovie(movie);
        setShowMovieDetail(true);
    }

    const hideModal = () => {
        setSelectedMovie(null);
        setShowMovieDetail(false);
    }

    const toggleFav = (id) => {
        let temp_favorites = [];
        if(favMovies.indexOf(id.toString()) == -1) {
            temp_favorites = [...favMovies, id.toString()];
        } else {
            temp_favorites = favMovies.filter((favMovie, index) => index !== favMovies.indexOf(id.toString()));
        }
        window.localStorage.setItem('favMovies', temp_favorites);
        setFavMovies(temp_favorites);
    };

    const isFav = (id) => {
        if(favMovies.indexOf(id.toString()) > -1) {
            return true;
        }
        return false;
    };

    const goToPage = (page_num) => {
        setFilters({
            ...filters,
            page: page_num
        });
    };

    const changeGenre = (genre) => {
        setFilters({
            ...filters,
            genre: genre
        });
    };

    const applySort = (option) => {
        setFilters({
            ...filters,
            sort_by: option
        });
    };

    const watchTrailer = (yt_id) => {
        setytVideoId(yt_id);
        setIsTrailerModalOpen(true);
    }

    const hideTrailerModal = () => {
        setIsTrailerModalOpen(false);
        setytVideoId(null);
    }

    const setRating = (value) => {
        setFilters({
            ...filters,
            minimum_rating: value
        })
    }

    const setSearchTerm = (value) => {
        if(value != filters.query_term) {
            setFilters({
                ...filters,
                query_term: value
            })
        }
    }

    const handleSearchString = (event) => {
        setSearchString(event.target.value)
    }

    useEffect( () => {
        setLoading(true);
        getMovies();
    }, [filters]);

    useEffect( () => {
        let fav_movies = window.localStorage.getItem('favMovies');
        if(fav_movies) {
            setFavMovies(fav_movies.split(','));
        }
    }, [favMovies.length]);

    return (
        <div>
            {
                (loading) ? 
                <Spin className="results-loading"/>
                :
                <>
                    <SearchFilters filters={filters} TotalMovies={TotalMovies} goToPage={goToPage} changeGenre={changeGenre} applySort={applySort} setRating={setRating} searchString={searchString} handleSearchString={handleSearchString} setSearchTerm={setSearchTerm} />
                    <Row gutter={3}>
                        {
                            (movies.length > 0) ?
                            movies.map((movie, index) => (
                                <Col xs={24} sm={8} md={6} lg={4} xl={4} key={'mc'+index} style={{marginBottom: "12px"}}>
                                    <MovieCard movie={movie} showMovieDetail={showMovieDetail} toggleFav={toggleFav} isFav={isFav} watchTrailer={watchTrailer} />
                                </Col>
                            ))
                            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Movies Found"/>
                        }
                    </Row>
                </>
            }
            
            <MovieDetail visible={show_movie_detail} {...selected_movie} hideModal={hideModal}/>
            <TrailerModal visible={isTrailerModalOpen} videoId={ytVideoId} hideModal={!isTrailerModalOpen} handleCancel={hideTrailerModal}/>
        </div>
    )
};

export default Main;