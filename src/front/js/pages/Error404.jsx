import React from "react";
import "../../styles/Error404.css";
import { useNavigate } from 'react-router-dom'

export const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="m-5">
            <section className="error-container">
                Error
                <span><span>4</span></span>
                <span>0</span>
                <span><span>4</span></span>
            </section>
            <div className="link-container p-5">
            <p className="d-flex justify-content-center align-items-center fs-4"><b>Ooh no...</b> No pudimos encontrar lo que buscas.</p>
                <a className="more-link" onClick={() => navigate('/')}>Go to home!</a>
            </div>
        </div>
    )
}