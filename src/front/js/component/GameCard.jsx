import React from "react";
import Atropos from 'atropos/react';
import { Card } from 'react-bootstrap';
import 'atropos/atropos.css';

export const GameCard = ({ image, title, price }) => {
    return (
        <Atropos 
            className="atropos-card mb-4" 
            style={{ width: '12rem', height: '16rem' }} 
            activeOffset={40}
            shadowScale={1.05}
        >
            <Card style={{ height: '100%', position: 'relative' }}>
                <Card.Img 
                    variant="top" 
                    src={image} 
                    className="atropos-img" 
                    style={{ height: '70%', objectFit: 'cover' }} 
                />
                <Card.Body 
                    className="atropos-body" 
                    style={{ height: '30%', padding: '0.5rem' }} 
                >
                    <Card.Title className="atropos-title" style={{ fontSize: '1rem' }}>
                        {title}
                    </Card.Title>
                    <Card.Text className="atropos-price" style={{ fontSize: '0.8rem' }}>
                        ${price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Atropos>
    );
};
