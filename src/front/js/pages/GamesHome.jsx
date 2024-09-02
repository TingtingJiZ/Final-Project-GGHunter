import React from "react";
import { Card, Row, Col } from 'react-bootstrap';

const GameCard = ({ image, title, rank }) => {
    return (
        <Card className="mb-4" style={{ width: '12rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{rank}. {title}</Card.Title>
            </Card.Body>
        </Card>
    );
};

const GamesList = () => {
    const mostPlayed = [
        { image: 'link_to_image1', title: 'Juego 1', rank: 1 },
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
}
export const GamesHome = () => {

    return (
        <div>
            <h3>Most Played</h3>
            <Row>
                {mostPlayed.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
            </Row>
            <h3>More Discount</h3>
            <Row>
                {moreDiscount.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
            </Row>
        </div>

    )
}