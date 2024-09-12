import React from "react";
import Atropos from 'atropos/react';
import { Card } from 'react-bootstrap';
import 'atropos/atropos.css';

export const GameCard = ({ image, title, price }) => {
    return (
        <Atropos 
            className="atropos-card mb-4" 
            style={{ width: '18rem', height: '10rem' }} 
            activeOffset={40}
            shadowScale={1.05}
        >
            <Card style={{ height: '100%', position: 'relative', border: 'none', backgroundColor: '#1a1a1a' }} className="text-white">
                <Card.Img 
                    variant="top" 
                    src={image} 
                    className="atropos-img" 
                    style={{ objectFit: 'contain', height: '12rem' }} 
                />
                <Card.Body 
                    className="atropos-body" 
                    style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#1a1a1a' }} 
                >
                    <Card.Title className="atropos-title" style={{ marginBottom: '0.5rem' }}>
                        {title}
                    </Card.Title>
                    <Card.Text className="atropos-price" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        €{price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Atropos>
    );
};
