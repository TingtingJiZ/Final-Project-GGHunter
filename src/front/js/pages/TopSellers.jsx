import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
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
export const TopSellers = () => {
    const { store, actions } = useContext(Context);
     const topSellers = [
        { image: 'link_to_image1', title: 'Juego 1', rank: 1 },
        { image: 'link_to_image2', title: 'Juego 2', rank: 2 },
        { image: 'link_to_image3', title: 'Juego 3', rank: 3 },
        { image: 'link_to_image4', title: 'Juego 4', rank: 4 },
        { image: 'link_to_image5', title: 'Juego 5', rank: 5 },
    ]; 
    const sellersData = async () => {
        await actions.getTopSellers();
    }

    useEffect(() => {
        sellersData()
    }, [])
    return (
        <div className="container bg-dark">
        {/* <h3 className="neon">Nintendo</h3>
        <Row>
            {store.topSellers && store.topSellers.map((item) => (
                <Col key={item.uid}>
                    <GameCard title={item.title} image={item.url}/>
                </Col>
            ))}
        </Row> */}
    </div>
    );
};
 