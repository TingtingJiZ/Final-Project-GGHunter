import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PcGameDetails = () => {
    const { store, actions } = useContext(Context);
    const [item, setItem] = useState(store.currentPC);
    
    const descriptionPC = async () => {
        await actions.getPcGameDetails()
    };

    const handleShop = async () => {
        
    }

    useEffect(() => {
        descriptionPC();
    }, []);

    return (
        <div className="container my-4 w-75">
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <p className="nav-link active" aria-current="page" href="#">PC</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link" href="#">PlayStation</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link" href="#">Nintendo</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link" href="#">Xbox</p>
                </li>
            </ul>
            <div className="characteristic w-100">
                <div className="row rounded card-body p-3">
                    <div className="col-12 col-md-4 text-center">
                        {item.medias_game && item.medias_game.length > 0 ? (
                            <img src={item.medias_game[0].url} className="img-fluid my-3" alt="Game Image" />
                        ) : (
                            <div>No media available</div>
                        )}
                    </div>
                    <div className="col-12 col-md-8">
                        <h3 className="mt-1">{item.title}</h3>
                        <h6>{item.description}</h6>
                    </div>
                </div>
                </div>
            <div className="shop mt-3">
                {store.currentPC.length > 0 ? (
                    store.currentPC.map((item) => (
                        <div className="row rounded price-item bg-dark text-white py-2 mb-1" key={item.storeID}>
                            <div className="col-md-2 store-logo d-flex align-items-center">
                                <img className="img-fluid" src={item.medias_game[0].url} style={{ maxHeight: '40px' }} />
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-center">
                                <h5 className="mb-2" style={{ fontSize: '19px' }}>{item.url}</h5>
                            </div>
                            <div className="col-md-4 d-flex flex-column align-items-md-end">
                                <p className="mb-1" style={{ fontSize: '19px' }}>
                                    <span className="discount">{item.game_characteristics[1].store.price}</span>
                                </p>
                                <p className="end-time mb-1" style={{ fontSize: '0.75rem' }}>End: in 4 days</p>
                                <button className="btn btn-shop py-1 px-2 btn-success" onClick={() => handleShop(item.game_characteristics[0].store.url)}>Shop Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading stores...</p>
                )}
            </div>
        </div>
    );
};

