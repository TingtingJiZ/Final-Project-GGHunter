import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Carousel } from "./Carousel.jsx";
import { TopSellers } from "./TopSellers.jsx";


export const HomePage = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <h1>HOME PAGE</h1>
             <div>
                <Carousel/>
                <TopSellers/>
            </div> 
        </div>
    )
}