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
    useEffect(() => {
        playstationData()
    },[])


    return(
        <div className="container w-75">
            <h1>PlayStation Games</h1>
            <div className="row">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner mb-3">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="https://i.ytimg.com/vi/w2yZI9oGHPs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBnuPu0T3bxXpNxILvRt7izsrbRXg" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://www.switchaboo.com/content/images/2020/11/D_tf0vQXYAAE_cL.jpg" className="d-block w-50 mx-auto" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ytimg.com/vi/hGGECWcbtU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDyRaZxFSDPt-A6PSwf2_vljRvCcw" className="d-block w-50 mx-auto" alt="..." />
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
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-2 justify-content-center card-body">
                {store.playstation && store.playstation.map((item) => (
                    <div key={item.id}>
                        <div className="atropos-card card-row text-white h-100 border-0 justify-content-between" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <img src={item.medias_game[0].url} className="atropos-img h-100" alt={item.title} />
                            <div className="p-3" style={{ flexGrow: 1 }}>
                                <h5>{item.title}</h5>
                            </div>
                            <footer className="p-3 d-flex justify-content-between align-items-center" style={{ background: "transparent" }}>
                                <strong>€{item.game_characteristics[1].store.price}</strong>
                                <button onClick={() => handlePlaystationDetails(item.id)} className="btn btn-primary">Info</button>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}