import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Row } from 'react-bootstrap';


export const CommentsGames = () => {
    const { store, actions } = useContext(Context);
    const gamesPc = store.gamesPc;
    const [formData, setFormData] = useState({
        username: "",
        rating: "",
        review: ""
    });

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
        setFormData({ username: "", rating: "", review: "" });
    };

    return (
        <div className="container py-3">
            <h2>Reseñas</h2>
            <Row className="card-body">
                <h1>Escribe tu Reseña</h1>
                <form id="reviewForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">Tu nombre:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}
                    />
                    {/* <div>
                        <h4>Calificación (1-5):</h4>
                        <div className="qualification">
                            <button>
                                <i class="fas fa-star"></i>
                            </button>
                            <button>
                                <i class="fas fa-star"></i>
                            </button>
                            <button>
                                <i class="fas fa-star"></i>
                            </button>

                            
                            <button>
                                <i class="fas fa-star"></i>
                            </button>

                
                            <button>
                                <i class="fas fa-star"></i>
                            </button>

                        </div>
                    </div> */}


                    <div>
                        <h4>Tu reseña:</h4>
                        <textarea style={{ width: "100%" }} name="review" value={formData.review}
                            onChange={handleChange} rows="4"></textarea>
                    </div>

                    <button type="submit">Enviar Reseña</button>
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