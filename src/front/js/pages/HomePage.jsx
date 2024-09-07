import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Carousel } from "./Carousel.jsx";
import { Row } from 'react-bootstrap';
import { GameCard } from '../component/GameCard.jsx';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const { store, actions } = useContext(Context);
    const gamesPc = store.gamesPc;
    const navigate = useNavigate();

    const handlePc = () => {
        navigate("/PCgames")
    }

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
                <button className="button-pc" onClick={() => handlePc()}>PC</button>
                <div className="card-row d-flex align-items-center ms-3 mb-4">
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
                    <span onClick={() => handlePc()} className="button-arrow ms-3">
                    <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
            </Row>
        </div>
    );
};
