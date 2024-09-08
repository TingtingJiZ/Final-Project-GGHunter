import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PCGames = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const pcData = async () => {
        await actions.getPcGames();
    }

    const handlePcDetails = async (gameID) => {
        await actions.getPcDetails(gameID)
        navigate("/PcGameDetails")
    }

    useEffect(() => {
        pcData()
    }, [])
    return (
        <div className="container w-75">
            <h1 className="" >PC Games</h1>
            <div className="row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner mb-3">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="https://i0.wp.com/www.codecmoments.com/wp-content/uploads/2020/09/Metamorphosis-Twitter.jpg?fit=1024%2C576&ssl=1" className="d-block w-75 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://cdn1.epicgames.com/salesEvent/salesEvent/b0745ef9-809f-4907-bdb2-b172491335c1_2560x1440-03a542725d2fe2ed950cb419ad7b70ea" className="d-block w-75 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://gaming-cdn.com/images/products/384/orig/divinity-original-sin-enhanced-edition-enhanced-edition-pc-juego-gog-com-europe-cover.jpg?v=1673611733" className="d-block w-75 mx-auto " alt="..." />
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
                                <button onClick={() => handlePcDetails(item.gameID)} className="bg-warning">Ver mas</button>
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