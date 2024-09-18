import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Carousel } from "./Carousel.jsx";
import { Row, Col } from 'react-bootstrap';
import { GameCard } from '../component/GameCard.jsx';
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const { store, actions } = useContext(Context);
    const gamesPc = store.gamesPc;
    const navigate = useNavigate();

    const handlePcDetails = async (id) => {
        //Console.log(id);

        await actions.getPcGameDetailsId(id);
        navigate("/pcgamedetails");
    };
    const handleNintendoDetails = async (id) => {
        await actions.getNintendoDetailsId(id);
        navigate("/nintendodetails");
    };
    const handleXboxDetails = async (id) => {
        await actions.getXboxDetailsId(id);
        navigate("/xboxdetails");
    };
    const handlePLayStationDetails = async (id) => {
        await actions.getPlaystationDetailsId(id);
        navigate("/playstationdetails");
    };
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
        actions.getPC();

    }, []);

    useEffect(() => {
        //Console.log("gamesPc:", gamesPc);
    }, [gamesPc]);

    const getRandomGames = (gamesArray, count) => {
        if (!gamesArray) return [];
        const shuffled = gamesArray.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    return (
        <div className="container py-3">
            <Row>
                <Carousel />
            </Row>
            <Row className="card-body">
                <button className="button-pc" onClick={handlePc}>PC</button>
                <div className="card-row d-flex align-items-center mb-3">
                    <Row>
                        {(store.pc && store.pc.length > 0) ? (
                            getRandomGames(store.pc, 4).map((item) => (
                                <Col key={item.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
                                    <GameCard
                                        title={item.name}
                                        image={item.medias_game[0].url}
                                        price={item.game_characteristics[0].store.price}
                                        onClick={() => handlePcDetails(item.id)}
                                    />
                                </Col>
                            ))
                        ) : (
                            <p>No hay juegos</p>
                        )}
                    </Row>
                    <span onClick={handlePc} className="button-arrow ms-3">
                        <span className="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>

                <button className="button-pc" onClick={handleNintendo}>Nintendo</button>
                <div className="card-row d-flex align-items-center mb-3">
                    <Row>
                        {(store.pc && store.pc.length > 0) ? (
                            getRandomGames(store.pc, 4).map((item) => (
                                <Col key={item.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
                                    <GameCard
                                        title={item.name}
                                        image={item.medias_game[0].url}
                                        price={item.game_characteristics[1].store.price}
                                        onClick={() => handleNintendoDetails(item.id)}
                                    />
                                </Col>
                            ))
                        ) : (
                            <p>No hay juegos</p>
                        )}
                    </Row>
                    <span onClick={handleNintendo} className="button-arrow ms-3">
                        <span className="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
                <button className="button-pc" onClick={handleXbox}>Xbox</button>
                <div className="card-row d-flex align-items-center mb-3">
                    <Row>
                        {(store.pc && store.pc.length > 0) ? (
                            getRandomGames(store.pc, 4).map((item) => (
                                <Col key={item.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
                                    <GameCard
                                        title={item.name}
                                        image={item.medias_game[0].url}
                                        price={item.game_characteristics[2].store.price}
                                        onClick={() => handleXboxDetails(item.id)}
                                    />
                                </Col>
                            ))
                        ) : (
                            <p>No hay juegos</p>
                        )}
                    </Row>
                    <span onClick={handleXbox} className="button-arrow ms-3">
                        <span className="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
                <button className="button-pc" onClick={handlePlaystation}>PlayStation</button>
                <div className="card-row d-flex align-items-center mb-3">
                    <Row>
                        {(store.pc && store.pc.length > 0) ? (
                            getRandomGames(store.pc, 4).map((item) => (
                                <Col key={item.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
                                    <GameCard
                                        title={item.name}
                                        image={item.medias_game[0].url}
                                        price={item.game_characteristics[3].store.price}
                                        onClick={() => handlePLayStationDetails(item.id)}
                                    />
                                </Col>
                            ))
                        ) : (
                            <p>No hay juegos</p>
                        )}
                    </Row>
                    <span onClick={handlePlaystation} className="button-arrow ms-3">
                        <span className="tooltip">Ver más</span>
                        <i className="fa-solid fa-circle-arrow-right fs-1"></i>
                    </span>
                </div>
            </Row>
        </div>
    );
};
