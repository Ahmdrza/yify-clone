import React from 'react';
import { Avatar, Icon, Card, Tooltip } from 'antd';

const { Meta } = Card;
const MovieCard = ({movie, showMovieDetail, toggleFav, isFav, watchTrailer}) => (
    <Card
        cover={
        <img
            alt={movie.title}
            src={movie.large_cover_image}
            onClick={() => {
                showMovieDetail(movie)
            }}
            style={{
                cursor: "pointer",
                minHeight: "314px"
            }}
        />
        }
        actions={[
        <Tooltip title={(movie.rating) ? movie.rating : 'N/A'} onClick={ () => {
            toggleFav(movie.id)
        }}>
            {
                isFav(movie.id) ?
                <Icon type="star" theme="twoTone" twoToneColor="#b61619" />
                :
                <Icon type="star" className="card-icon" />
            }
        </Tooltip>,
        (movie.yt_trailer_code) ? 
        <Tooltip title={(movie.yt_trailer_code) ? 'Watch Trailer' : 'N/A'} onClick={() => {
            watchTrailer(movie.yt_trailer_code)
        }}>
            <Icon type="youtube" className="card-icon" />
        </Tooltip>:null
        ]}
    >
        <Meta
        onClick={() => {
            showMovieDetail(movie)
        }}
        title={movie.title_long}
        description={(movie.summary) ? ((movie.summary.length > 150) ? movie.summary.slice(0, 150)+'...' : movie.summary) : 'Description not available.'}
        />
    </Card>
);

export default MovieCard;