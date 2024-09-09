import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Row } from 'react-bootstrap';


export const CommentsGames = () => {
    const { store, actions } = useContext(Context);
    const gamesPc = store.gamesPc;
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createComments(formData);
        setFormData({});
    };

    return (
        <div className="container py-3">
            <h2>Reseñas</h2>
            <Row className="card-body">
                <h1>Escribe tu Reseña</h1>
                <form id="reviewForm" onSubmit={handleSubmit}>
                    <div>
                        <h4>Tu reseña:</h4>
                        <textarea name="comment" value={formData.comment} onChange={handleChange} rows="4"></textarea>
                    </div>
                    <button type="submit" onClick="handleSubmit()" className="button-container">
                        <span className="button-content ">
                            <span>Enviar reseña</span>
                        </span>
                    </button>
                    {/* <button type="submit">Enviar Reseña</button> */}
                </form>

                <div id="reviews">
                    <h2>Reseñas:</h2>
                    <ul id="reviewsList">
                        {store.comments.map((review, index) => (
                            <li key={index}>
                                <strong>{review.username}</strong> ({review.rating}/5):<br />
                                {review.review}
                            </li>
                        ))}
                    </ul>
                </div>
            </Row>
        </div>
    );
}      