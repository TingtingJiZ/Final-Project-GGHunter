import React from "react";
import Atropos from 'atropos/react';
import { Card } from 'react-bootstrap';
import 'atropos/atropos.css';

export const GameCard = ({ image, title, price, click }) => {
    return (
        <Atropos
            className="atropos-card mb-4 w-100 h-100" activeOffset={80} shadowScale={1.60}>
            <style>
                {`.atropos-card .atropos-shadow {background: rgba(0, 0, 255, 0.5)}`}
            </style>
            <Card style={{ height: '100%', position: 'relative', border: 'none' }} className="text-white">
                <Card.Img
                    variant="top"
                    src={image}
                    className="atropos-img"
                    style={{ objectFit: 'contain' }}/>
                <Card.Body
                    className="card-rows"
                    style={{  display: 'flex', flexDirection: 'column'}}>
                    <Card.Title className="atropos-title" >
                        {title}
                    </Card.Title>
                    <Card.Text className="atropos-price">
                        €{price}
                        <button onClick={click} className="btn btn-primary">Info</button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Atropos>
    );
};

