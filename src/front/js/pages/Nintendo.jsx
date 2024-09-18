import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Nintendo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const isLoged = store.isLoged;

    // Estado local para manejar los favoritos
    const [favourites, setFavourites] = useState([]);

    // Obtener los datos de Nintendo
    const nintendoData = async () => {
        await actions.getNintendo();
    };

    // Verificar si el juego está en favoritos
    const isFavourite = (gameId) => {
        return favourites.some(fav => fav.id === gameId);
    };

    // Manejar detalles del juego de Nintendo
    const handleNintendoDetails = async (id) => {
        await actions.getNintendoDetailsId(id);
        navigate("/nintendodetails");
    };

    // Añadir o quitar de favoritos
    const handleAddToFavourites = async (gameId) => {
        await actions.addToFavourites(gameId);
        setFavourites([...store.favourites]);
    };

    useEffect(() => {
        nintendoData();
    }, []);

    useEffect(() => {
        setFavourites([...store.favourites]);
    }, [store.favourites]);

    return (
        <div className="container w-75 mb-5">
            <h1>Nintendo</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 justify-content-center">
                {store.nintendo && store.nintendo.map((item) => (
                    <div key={item.id}>
                        <div className="card-row text-white h-100 border-0" style={{ display: "flex", flexDirection: "column", height: "100%"}}>
                            <img src={item.medias_game[0].url} className="atropos-img" alt={item.title} style={{ objectFit: 'contain', flexShrink: 0}} />
                            <div className="p-3" style={{ flexGrow: 1 }}>
                                <h5 className="fs-4">{item.title}</h5>
                            </div>
                            <footer className="p-3 mb-1 d-flex justify-content-between align-items-center" style={{ background: "transparent", flexShrink: 0 }}>
                                <strong>€{item.game_characteristics[1].store.price}</strong>
                                <span>
                                    <button onClick={() => handleNintendoDetails(item.id)} className="btn btn-primary">Info</button>

                                    {isLoged ? (
                                        <button 
                                            onClick={() => handleAddToFavourites(item.id)} 
                                            className={`btn btn-secondary favourite-btn ${isFavourite(item.id) ? 'favourited' : ''}`}>
                                            <i className="fa fa-heart"></i>
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
