import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PCGames = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const isLoged = store.isLoged;

    const pcData = async () => {
        await actions.getPC();
    };

    const handlePcDetails = async (id) => {
        await actions.getPcGameDetailsId(id);
        navigate("/pcgamedetails");
    };

    const handleAddToFavourites = async (gameId) => {
        await actions.addToFavourites(gameId);
    };

    useEffect(() => {
        pcData();
    }, []);

    return (
        <div className="container w-75 mb-5">
            <h1>PC</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 justify-content-center">
                {store.pc && store.pc.map((item) => (
                    <div key={item.id}>
                        <div className="card-row text-white h-100 border-0" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <img src={item.medias_game[0].url} alt={item.title} style={{ objectFit: 'contain', flexShrink: 0 }} />
                            <div className="p-3" style={{ flexGrow: 1 }}>
                                <h5 className="fs-4">{item.title}</h5>
                            </div>
                            <footer className="p-3 mb-1 d-flex justify-content-between align-items-center" style={{ background: "transparent", flexShrink: 0 }}>
                                <strong>€{item.game_characteristics[1].store.price}</strong>
                                <span>
                                    <button onClick={() => handlePcDetails(item.id)} className="btn btn-primary">Info</button>

                                    {isLoged ? (
                                        <button 
                                            onClick={() => handleAddToFavourites(item.id)} 
                                            className="btn btn-secondary favourite-btn">
                                            <i className="fa fa-heart" style={{ color: isFavourite(item.id) ? 'red' : '#ccc' }}></i>
                                        </button>
                                    ) : null}
                                </span>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
