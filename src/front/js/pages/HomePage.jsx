// src/pages/HomePage.js
import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Row, Col } from 'react-bootstrap';
import { GameCard } from '../component/GameCard.jsx';

export const HomePage = () => {
    const { store, actions } = useContext(Context);

    const mostPlayed = [
        { image: 'https://www.universalpictures.es/tl_files/content/movies/super_mario_bros/super-mario-bros_header-mobile.jpg', 
         rank: 'Nº1' },
        { image: 'link_to_image2', title: 'Juego 2', rank: 2 },
        { image: 'link_to_image3', title: 'Juego 3', rank: 3 },
        { image: 'link_to_image4', title: 'Juego 4', rank: 4 },
        { image: 'link_to_image5', title: 'Juego 5', rank: 5 },
    ];

    const moreDiscount = [
        { image: 'link_to_image1', title: 'Juego 1', rank: 1 },
        { image: 'link_to_image2', title: 'Juego 2', rank: 2 },
        { image: 'link_to_image3', title: 'Juego 3', rank: 3 },
        { image: 'link_to_image4', title: 'Juego 4', rank: 4 },
        { image: 'link_to_image5', title: 'Juego 5', rank: 5 },
    ];

    return (
        <div className="container py-3 bg-light-subtle">
            <h3 className="neon">Most Played</h3>
            <Row>
                {mostPlayed.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
            </Row>
            <h3 className="neon">Latest Offers</h3>
            <Row>
                {moreDiscount.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
