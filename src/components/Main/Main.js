import React, {Component} from 'react';
import { List, Avatar, Icon  } from 'antd';
import axios from 'axios';
import MovieDetail from './MovieDetail';
import { withRouter, Redirect } from 'react-router-dom';

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
            loading:true
        };
        this.updateMoviesList = this.updateMoviesList.bind(this);
        this.showMovieDetail = this.showMovieDetail.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getMovies = this.getMovies.bind(this);
    }

    componentDidMount() {
        this.getMovies();
    }

    getMovies() {
        axios.get(`https://yts.lt/api/v2/list_movies.json?query_term=${this.state.query_term.replace(/-/g, ' ')}&page=${this.state.page}&order_by=${this.state.order_by}`).then(response =>
            this.updateMoviesList(response.data)
        ).catch( error => 
            console.log('error')
        )
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

    hideModal() {
        this.setState({
            selected_movie:null,
            show_movie_detail:false
        })
    }

    render() {
        return (
            <div>
                <List
                itemLayout="horizontal"
                loading={this.state.loading}
                dataSource={this.state.movies}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">Magnet</a>, <a key="list-loadmore-more"><Icon type="download" /></a>]}
                    >
                    <List.Item.Meta
                        avatar={<Avatar src={item.small_cover_image} />}
                        title={<a onClick={this.showMovieDetail.bind(null, item)}>{item.title}</a>}
                        description={item.summary}
                    />
                    </List.Item>
                )}
                />
                <MovieDetail visible={this.state.show_movie_detail} {...this.state.selected_movie} hideModal={this.hideModal}/>
            </div>
        )
    }
}

export default withRouter(Main);