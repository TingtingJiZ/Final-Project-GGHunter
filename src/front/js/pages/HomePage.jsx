import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Carousel } from "./Carousel.jsx";
import { Row } from 'react-bootstrap';
import { GameCard } from '../component/GameCard.jsx';

export const HomePage = () => {
    const { store, actions } = useContext(Context);
    const gamesPc = store.gamesPc;

    useEffect(() => {
        actions.getGamesPc();
    }, []); 

    useEffect(() => {
        console.log("gamesPc:", gamesPc);
    }, [gamesPc]);

    return (
        <div className="container py-3 ">
            <Row>
                <Carousel />
            </Row>
            <Row className="card-body">
                <h2>PC</h2> {/* Hacer un onClik para ir a plataforma PC */}
                <Row>
                    {gamesPc && typeof gamesPc === 'object' && Object.keys(gamesPc).length > 0 ? (
                        Object.keys(gamesPc).map(key => {
                            const game = gamesPc[key].info;
                            const price = gamesPc[key].cheapestPriceEver.price;
                            return (
                                <GameCard 
                                    key={game.steamAppID} 
                                    image={game.thumb} 
                                    title={game.title} 
                                    price={price} 
                                />
                            );
                        })
                    ) : (
                        <p>No hay juegos</p>
                    )}
                </Row>
            </Row>
        </div>
    );
};
