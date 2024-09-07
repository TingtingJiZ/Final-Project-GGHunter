import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PCGames = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const pcData = async () => {
        await actions.getPcGames();
    }

    useEffect(() => {
        pcData()
    }, [])
    return (
        <div className="container">
            <h1 className="" >PC Games</h1>
            <div className="row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner mb-3">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="https://placehold.co/200x100" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://placehold.co/200x100" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://placehold.co/200x100" className="d-block w-50 mx-auto " alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
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
        </div>
    )
}