// src/components/GameCard.js
import React from "react";
import Atropos from 'atropos/react';
import { Card } from 'react-bootstrap';
import 'atropos/atropos.css';

export const GameCard = ({ image, title, rank }) => {
    return (
        <Atropos 
            className="atropos-card mb-4" 
            style={{ width: '10rem', height: '12rem' }}
            activeOffset={40}
            shadowScale={1.05}
        >
            <Card style={{ height: '100%', position: 'relative' }}>
                <Card.Img variant="top" src={image} className="atropos-img" />
                <Card.Body className="atropos-body">
                    <div className="rank-badge">{rank}</div>
                    <Card.Title className="atropos-title">
                        {title}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Atropos>
    );
};


