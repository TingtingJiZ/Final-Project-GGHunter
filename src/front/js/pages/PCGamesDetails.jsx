import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CommentsGames } from "../pages/CommentsGames.jsx";

export const PcGameDetails = () => {
    const { store, actions } = useContext(Context);
    const [item, setItem] = useState(store.currentPC);
    const [activePlatform, setActivePlatform] = useState('');

    const descriptionPC = async () => {
        await actions.getPcGameDetailsId()
    };

    const handleShop = (url) => {
        window.open(url, '_blank');
    }

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('/playstation')) {
            setActivePlatform('playstation');
        } else if (path.includes('/nintendo')) {
            setActivePlatform('nintendo');
        } else if (path.includes('/xbox')) {
            setActivePlatform('xbox');
        } else {
            setActivePlatform('pc');
        }
    }, []);

    return (
        <div className="container my-4 w-75">
            <div className="container">
                <div className="characteristic w-100">
                    <div className="row rounded card-row p-3">
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
                    <ul className="nav nav-underline">
                        <li className="nav-item">
                            <a className={`nav-link ${activePlatform === 'pc' ? 'active pc fs-3' : 'pc fs-4'}`} href="/pcgames">PC</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activePlatform === 'playstation' ? 'active playstation fs-3' : 'playstation fs-4'}`} href="/playstation">PlayStation</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activePlatform === 'nintendo' ? 'active nintendo fs-3' : 'nintendo fs-4'}`} href="/nintendo">Nintendo</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activePlatform === 'xbox' ? 'active xbox fs-3' : 'xbox fs-4'}`} href="/xbox">Xbox</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <div className="card text-center p-3 gradient-card">
                            {item.game_characteristics && item.game_characteristics[0] && item.game_characteristics[0].store && (
                                <>
                                    <div className="mb-3">
                                        <img className="img-fluid" src={item.game_characteristics[0].store.home_page} style={{ maxHeight: '100px' }} alt="Store Logo" />
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <span className="discount h5 mb-3">
                                            €{item.game_characteristics[0].store.price}
                                        </span>
                                        <button
                                            className="btn btn-shop py-2 px-4 btn-success" onClick={() => handleShop(item.game_characteristics[0].store.url)}>Comprar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <div className="card text-center p-3 gradient-card">
                            {item.game_characteristics && item.game_characteristics[1] && item.game_characteristics[1].store && (
                                <>
                                    <div className="mb-3">
                                        <img className="img-fluid" src={item.game_characteristics[1].store.home_page} style={{ maxHeight: '100px' }} alt="Store Logo" />
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <span className="discount h5 mb-3">
                                            €{item.game_characteristics[1].store.price}
                                        </span>
                                        <button className="btn btn-shop py-2 px-4 btn-success" onClick={() => handleShop(item.game_characteristics[1].store.url)}>Comprar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <div className="card text-center p-3 gradient-card">
                            {item.game_characteristics && item.game_characteristics[2] && item.game_characteristics[2].store && (
                                <>
                                    <div className="mb-3">
                                        <img className="img-fluid" src={item.game_characteristics[2].store.home_page} style={{ maxHeight: '100px' }} alt="Store Logo" />
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <span className="discount h5 mb-3">
                                            €{item.game_characteristics[2].store.price}
                                        </span>
                                        <button className="btn btn-shop py-2 px-4 btn-success" onClick={() => handleShop(item.game_characteristics[2].store.url)}>Comprar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <div className="card text-center p-3 gradient-card">
                            {item.game_characteristics && item.game_characteristics[3] && item.game_characteristics[3].store && (
                                <>
                                    <div className="mb-3">
                                        <img className="img-fluid" src={item.game_characteristics[3].store.home_page} style={{ maxHeight: '100px' }} alt="Store Logo" />
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <span className="discount h5 mb-3">
                                            €{item.game_characteristics[3].store.price}
                                        </span>
                                        <button className="btn btn-shop py-2 px-4 btn-success" onClick={() => handleShop(item.game_characteristics[3].store.url)}>Comprar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <CommentsGames />
            </div>
        </div>
    );
};