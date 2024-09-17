import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Favourites = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getFavourites();
    }, []);

    return (
        <div className="container w-75">
            <h1>Favoritos</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-2 justify-content-center card-body">
                {store.favourites && store.favourites.map((item) => (
                    <div key={item.game_id}>
                        <div className="atropos-card card-row text-white h-100 border-0" style={{ display: "flex", flexDirection: "column", height: "100%"}}>
                            <img src={item.medias_game[0].url} className="atropos-img" alt={item.title} style={{ objectFit: 'contain', flexShrink: 0}} />
                            <div className="p-3" style={{ flexGrow: 1 }}>
                                <h5 className="fs-4">{item.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
