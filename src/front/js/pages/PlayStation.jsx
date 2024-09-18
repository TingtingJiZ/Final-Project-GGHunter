import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PlayStation = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    const playstationData = async () => {
        await actions.getPlaystation()
    }
    
    const handlePlaystationDetails = async (id) => {
        await actions.getPlaystationDetailsId(id)
        navigate("/playstationdetails")
    }

    const handleAddToFavourites = async (gameId) => {
        await actions.addToFavourites(gameId);
    };
    useEffect(() => {
        playstationData()
    },[])

    return(
        <div className="container w-75 mb-5">
            <h1>PlayStation</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 justify-content-center">
                {store.playstation && store.playstation.map((item) => (
                    <div key={item.id}>
                        <div className="card-row text-white h-100 border-0" style={{ display: "flex", flexDirection: "column", height: "100%"}}>
                            <img src={item.medias_game[0].url} alt={item.title} style={{ objectFit: 'contain', flexShrink: 0}} />
                            <div className="p-3" style={{ flexGrow: 1 }}>
                                <h5 className="fs-4">{item.title}</h5>
                            </div>
                            <footer className="p-3 mb-1 d-flex justify-content-between align-items-center" style={{ background: "transparent", flexShrink: 0 }}>
                                <strong>€{item.game_characteristics[1].store.price}</strong>
                                <span><button onClick={() => handlePlaystationDetails(item.id)} className="btn btn-primary">Info</button>
                                <button onClick={() => handleAddToFavourites(item.id)} className="btn btn-secondary">
                                <i className="fa-regular fa-heart"></i>
                                </button></span>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}