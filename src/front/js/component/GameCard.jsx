import React from "react";
import Atropos from 'atropos/react';
import { Card } from 'react-bootstrap';
import 'atropos/atropos.css';

export const GameCard = ({ image, title, price, onClick }) => {
    return (
        <Atropos
            className="atropos-card mb-4 w-100"
            activeOffset={80}
            shadowScale={1.60}
            style={{ pointerEvents: 'none' }}
        >
            <style>
                {`.atropos-card .atropos-shadow {background: rgba(0, 0, 255, 0.5)}`}
            </style>
            <Card
                style={{ height: '30%', width: '100%', position: 'relative', border: 'none' }} 
                className="text-white"
            >
                <Card.Img
                    variant="top"
                    src={image}
                    className="atropos-img"
                    style={{ objectFit: 'cover', height: '100px', width: '100%' }} // Ajuste de imagen
                />
                <Card.Body
                    className="card-rows"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Card.Title className="atropos-title">{title}</Card.Title>
                    <Card.Text className="atropos-price">
                        <span className="me-5">€{price}</span>
                        <button onClick={onClick} className="btn btn-primary ms-3" style={{ pointerEvents: 'auto' }}>
                            Info
                        </button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Atropos>
    );
};