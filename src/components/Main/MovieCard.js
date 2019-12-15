import React from 'react';
import { Avatar, Icon, Card, Tooltip } from 'antd';

const { Meta } = Card;
const MovieCard = ({movie, showMovieDetail, toggleFav, isFav}) => (
    <Card
        cover={
        <img
            alt={movie.title}
            src={movie.large_cover_image}
            onClick={() => {
                showMovieDetail(movie)
            }}
            style={{cursor: "pointer"}}
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
        <Tooltip title={(movie.summary) ? movie.summary : 'N/A'}>
            <Icon type="info-circle" className="card-icon"/>
        </Tooltip>,
        ]}
    >
        <Meta
        onClick={() => {
            showMovieDetail(movie)
        }}
        title={movie.title}
        />
    </Card>
);

export default MovieCard;