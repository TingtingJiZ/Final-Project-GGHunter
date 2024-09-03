import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Carousel = () => {
    const {store, actions} = useContext(Context)
    const Navigate = useNavigate()

    return (
        <div className="container bg-dark mb-3 mt-5">
                <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner mb-3">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="https://placehold.co/200x100" class="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://placehold.co/200x100" class="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://placehold.co/200x100" class="d-block w-100 " alt="..." />
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
        
    )
}