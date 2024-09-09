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
                    <button type="summit" onClick={handleSubmit} className="relative cursor-pointer opacity-90 hover:opacity-100 
                    transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] 
                    to-[#dc98fd] active:scale-95">
                        <span class="w-full h-full flex items-center gap-2 px-8 py-3 text-white 
                rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                class="w-5 h-5 inline-block"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2">
                                <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 
        3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 
        0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 
        0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z">
                                </path>
                            </svg>
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