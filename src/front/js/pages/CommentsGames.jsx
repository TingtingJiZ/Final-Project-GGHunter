import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Row, Card, Button } from 'react-bootstrap';


export const CommentsGames = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ comment: "" });

    useEffect(() => {
        // Obtener los comentarios cuando el componente se monta
        actions.getComments();
    }, []);

    useEffect(() => {
        // Verificar el contenido del store
        console.log("Comentarios en el store:", store.comments);
    }, [store.comments]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //formData.game_id = store.;  // Este valor hay que tomarlo del store.
        formData.game_id = 1;  // Este valor hay que tomarlo del store.
        actions.createComments(formData);
        setFormData({ comment: "" });
    };

    const handleDelete = (commentId) => {
        actions.deleteComment(commentId);
    };

    return (
        <div className="container py-3">
            <h2>Reseñas</h2>
            <Row className="card-row">
                <h1>Escribe tu Reseña</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4>Tu reseña:</h4>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                    <button type="submit" className="button-container">
                        <span className="button-content ">
                            <span>Enviar reseña</span>
                        </span>
                    </button>
                </form>

                <div id="reviews">
                    <h2>Reseñas:</h2>
                    <Row>
                        {store.comments.length > 0 ? (
                            store.comments.map((item, index) => (
                                <Card key={index} style={{ width: '60rem', margin: '1rem' }}>
                                    <Card.Body>
                                        <Card.Text>
                                           <strong>{item.user}</strong> {item.comment}
                                        </Card.Text>
                                       
                                        <i onClick={() => handleDelete(item.id)} className="fa-solid fa-trash-can"></i>
                                            
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>No hay reseñas todavía.</p>
                        )}
                    </Row>
                </div>
            </Row>
        </div>
    );
};
