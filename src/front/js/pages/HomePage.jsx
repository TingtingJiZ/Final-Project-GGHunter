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
        navigate("/pcgames")
    }
    const handleNintendo = () => {
        navigate("/nintendo")
    }
    const handlePlaystation = () => {
        navigate("/playstation")
    }
    const handleXbox = () => {
        navigate("xbox")
    }
    useEffect(() => {
        actions.getGamesPc();
    }, []);

    useEffect(() => {
        console.log("gamesPc:", gamesPc);
    }, [gamesPc]);

    return (
        <div className="container py-3">
            <Row>
                <Carousel />
            </Row>
            <Row className="card-body">
                <div col-12 mb-3 text-start>
                    <button className="button-pc" onClick={() => handlePc()}>PC</button>
                </div>
                <div className="container py-3">
                    <div className="card-row row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-4 g-4" style={{height: "100%"}}>
                        {gamesPc && typeof gamesPc === 'object' && Object.keys(gamesPc).length > 0 ? (
                            Object.keys(gamesPc).map(key => {
                                const game = gamesPc[key].info;
                                const price = gamesPc[key].cheapestPriceEver.price;
                                return (
                                    <div className="col d-flex justify-content-center" style={{height: "50%"}} key={game.steamAppID}>
                                        <GameCard 
                                            image={game.thumb}
                                            title={game.title}
                                            price={price}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <p>No hay juegos</p>
                        )}
                        <div className="col-6 text-center mt-4">
                            <span onClick={() => handlePc()} className="btn btn-primary">
                                <span className="tooltip">Ver más</span>
                                <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <button className="button-pc" onClick={() => handleNintendo()}>Nintendo</button>
                <div className="card-row d-flex align-items-center mb-3">
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
                    <span onClick={() => handleNintendo()} className="button-arrow ms-3">
                        <span class="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
                <button className="button-pc" onClick={() => handleXbox()}>Xbox</button>
                <div className="card-row d-flex align-items-center mb-3">
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
                    <span onClick={() => handleXbox()} className="button-arrow ms-3">
                        <span class="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
                <button className="button-pc" onClick={() => handlePlaystation()}>PlayStation</button>
                <div className="card-row d-flex align-items-center mb-3">
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
                    <span onClick={() => handlePlaystation()} className="button-arrow ms-3">
                        <span class="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
            </Row>
        </div>
    );
};
