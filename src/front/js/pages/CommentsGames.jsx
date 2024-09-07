import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Carousel } from "./Carousel.jsx";
import { Row } from 'react-bootstrap';
import { GameCard } from '../component/GameCard.jsx';
import { useNavigate } from "react-router-dom";

export const CommentsGames = () => {
    const { store, actions } = useContext(Context);
    const gamesPc = store.gamesPc;
    const navigate = useNavigate();

   
    return (
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-2 justify-content-center card-body">
                {store.pcGames && store.pcGames.map((item) => (
                    <div key={item.gameID}>
                        <div className="atropos-card card-row text-white h-100 border-0" style={{ height: "18rem" }}>
                            <img src={item.thumb} className="atropos-img" alt="..." />
                            <div>
                                <h5>{item.title || item.external}</h5>
                                 {/* <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="badge bg-danger me-2">{Math.round(item.savings)}%</span>
                                    </div>
                                    <div className="d-flex flex-column text-end ms-auto me-2">
                                        <small className="text-white text-decoration-line-through">€{item.normalPrice}</small>
                                        <strong>€{item.salePrice}</strong>
                                    </div>
                                </div>  */}
                                <strong>€{item.salePrice}</strong>
                               {/*  <div className="text-end">
                                    <p href={item.metacriticLink} className="btn btn-outline-light btn-sm">Metacritic</p>
                                    <div>
                                        <span className="badge bg-success">{item.steamRatingText}</span>
                                        <span className="text-muted">({item.steamRatingPercent}%)</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
};
