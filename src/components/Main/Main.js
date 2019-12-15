import React, {Component} from 'react';
import { List, Avatar, Icon, Row, Col, Card, Spin, notification   } from 'antd';
import axios from 'axios';
import MovieDetail from './MovieDetail';
import SearchFilters from '../Search/searchFilters';
import { withRouter, Redirect } from 'react-router-dom';
import MovieCard from './MovieCard';

const notifyFavFunct = (type = 'success') => {
    notification[type]({
        message: 'Add To Favorites',
        description:
        'You can now mark movies as favorites. Click on star icon to mark as favorite.',
    });
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query_term:(this.props.search)?this.props.search:'',
            page:1,
            order_by:'desc',
            movies:[],
            show_movie_detail:false,
            selected_movie:null,
            loading:true,
            with_rt_ratings: true,
            genre:'',
            fav_movies: []
        };
        this.updateMoviesList = this.updateMoviesList.bind(this);
        this.showMovieDetail = this.showMovieDetail.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleFav = this.toggleFav.bind(this);
        this.isFav = this.isFav.bind(this);
    }

    componentDidMount() {
        if(this.props.location.pathname === "/") {
            notifyFavFunct();
        }
        this.getMovies();
        let fav_movies = window.localStorage.getItem('fav_movies');
        console.log(fav_movies);
        if(fav_movies) {
            this.state.fav_movies = fav_movies.split(',');
            console.log(this.state.fav_movies)
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.search !== this.props.search){
           this.setState({
               query_term:this.props.search,
               loading:true
           }, () => {
            this.getMovies();
           });
        }
    }

    getMovies() {
        axios.get(`https://yts.lt/api/v2/list_movies.json?query_term=${this.state.query_term.replace(/-/g, ' ')}&page=${this.state.page}&order_by=${this.state.order_by}&with_rt_ratings=${this.state.with_rt_ratings}&genre=${this.state.genre}`).then(response =>
            this.updateMoviesList(response.data)
        ).catch( error => 
            console.log('error')
        )
    }

    updateMoviesList(movies) {
        console.log(movies);
        this.setState({movies:movies.data.movies, loading:false})
    }

    showMovieDetail(movie) {
        this.setState({
            selected_movie:movie,
            show_movie_detail:true
        })
    }

    toggleFav(id) {
        if(this.state.fav_movies.indexOf(id.toString()) == -1) {
            this.state.fav_movies.push(id.toString());
        } else {
            this.state.fav_movies.splice(this.state.fav_movies.indexOf(id.toString()), 1);
        }
        let temp_favmovies = this.state.fav_movies;
        this.setState({
            fav_movies: temp_favmovies
        })
        window.localStorage.setItem('fav_movies', this.state.fav_movies);
    };

    isFav(id) {
        if(this.state.fav_movies.indexOf(id.toString()) > -1) {
            return true;
        }
        return false;
    }

    hideModal() {
        this.setState({
            selected_movie:null,
            show_movie_detail:false
        })
    }

    handleChange(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <SearchFilters />
                {
                    (this.state.loading) ? 
                    <Spin className="results-loading"/>
                    : null
                }
                <Row gutter={3}>
                    {
                        this.state.movies.map((movie, index) => (
                            <Col xs={24} sm={8} md={6} lg={4} xl={4} key={'mc'+index} style={{marginBottom: "12px"}}>
                                <MovieCard movie={movie} showMovieDetail={this.showMovieDetail} toggleFav={this.toggleFav} isFav={this.isFav} />
                            </Col>
                        ))
                    }
                </Row>
                <MovieDetail visible={this.state.show_movie_detail} {...this.state.selected_movie} hideModal={this.hideModal}/>
            </div>
        )
    }
}

export default withRouter(Main);