import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Carousel = () => {
    const { store, actions } = useContext(Context)
    const Navigate = useNavigate()

    return (
        <div className="container">
            <div className="row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner mb-3">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img className="carousel-item-img"
                                src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/35320/capsule_616x353.jpg?t=1572519365"
                                alt="First slide" />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img className="carousel-item-img"
                                src="https://upload.wikimedia.org/wikipedia/en/6/6a/Unstoppalbe_Gorg_cover.jpg"
                                alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="carousel-item-img"
                                src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/71000/capsule_616x353.jpg?t=1666983155"
                                alt="Third slide" />
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
        </div>


    )
}