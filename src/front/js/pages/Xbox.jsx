import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Xbox = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const isLoged = store.isLoged;

    const xboxData = async () => {
        await actions.getXbox()
    }
    const isFavourite = (gameId) => {
        if(store.favouritesUser){
            const yes = store.favouritesUser.some(fav => fav.id === gameId);
            console.log(yes)
            return yes ? true : false 
        }
    };

    const handleXboxDetails = async (id) => {
        await actions.getXboxDetailsId(id)
        navigate("/xboxdetails")
    }

    const handleAddToFavourites = async (gameId) => {
        if (isFavourite(gameId)) {
            await actions.removeFromFavourites(gameId); // Asume que existe una acción para eliminar favoritos
        } else {
            await actions.addToFavourites(gameId);
        }
        await actions.getFavourites(); // Actualizar la lista de favoritos después de cada acción
    };

    useEffect(() => {
        xboxData()
        if (isLoged) {
            actions.getFavourites(); // Obtener favoritos si el usuario está logueado
        }
    }, [isLoged]);

    return(
        <div className="container w-75 mb-5">
        <h1>PC Games</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 justify-content-center">
            {store.xbox && store.xbox.map((item) => (
                <div key={item.id}>
                    <div className="card-row text-white h-100 border-0" style={{ display: "flex", flexDirection: "column", height: "100%"}}>
                        <img src={item.medias_game[0].url} className="atropos-img" alt={item.title} style={{ objectFit: 'contain', flexShrink: 0}} />
                        <div className="p-3" style={{ flexGrow: 1 }}>
                            <h5 className="fs-4">{item.title}</h5>
                        </div>
                        <footer className="p-3 mb-1 d-flex justify-content-between align-items-center" style={{ background: "transparent", flexShrink: 0 }}>
                            <strong>€{item.game_characteristics[1].store.price}</strong>
                            <span>
                                    <button onClick={() => handleXboxDetails(item.id)} className="btn btn-primary">Info</button>

                                    {isLoged ? (
                                        <button 
                                            onClick={() => handleAddToFavourites(item.id)} 
                                            className={`btn btn-secondary favourite-btn ${isFavourite(item.id) ? 'favourited' : ''}`}>
                                            <i className={`fa fa-heart ${isFavourite(item.id) ? 'text-danger' : ''}`}></i>
                                        </button>
                                    ) : null}
                                </span>
                        </footer>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}