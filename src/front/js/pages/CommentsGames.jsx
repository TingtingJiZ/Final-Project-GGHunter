import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Row, Card, Button } from 'react-bootstrap';

export const CommentsGames = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ commentsPerGame: "" });

    useEffect(() => {
        // Obtener los comentarios cuando el componente se monta
        if (store.currentPC && store.currentPC.id) {
            actions.getCommentsGames(store.currentPC.id);
        }

    }, [store.currentPC]);  // Asegúrate de que se ejecute cuando `currentPC` cambie

    useEffect(() => {
        // Verificar el contenido del store
        console.log("Comentarios en el store:", store.commentsPerGame);
    }, [store.commentsPerGame]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Añadir el game_id al formData sin sobrescribir el objeto
        const saved = localStorage.getItem("User");
        const user = JSON.parse(saved);
        const userId = user?.id
        const updatedFormData = {
            body: formData.commentsPerGame,  // El cuerpo del comentario
            game_id: store.currentPC.id,     // ID del juego
            user_id: store.currentUser.id   // ID del usuario que comenta
        };
        actions.createComments(updatedFormData);
        // Limpiar el formulario después del envío
        setFormData({ commentsPerGame: "" });
    };

    const handleDelete = (delete_comment) => {
        actions.deleteComment(delete_comment);
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
                            name="commentsPerGame"  // Este nombre debe coincidir con el campo del estado
                            value={formData.commentsPerGame}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                    <button type="submit" className="button-container">
                        <span className="button-content">
                            <span>Enviar reseña</span>
                        </span>
                    </button>
                </form>

                <div id="reviews">
                    <h2>Reseñas:</h2>
                    <Row>
                        {store.commentsPerGame.length > 0 ? (
                            store.commentsPerGame.map((item, index) => (
                                <Card key={index} style={{ width: '60rem', margin: '1rem' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <strong>{item.user_alias}</strong> {item.body}
                                            </Row>
                                        </Card.Text>
                                        <i onClick={() => handleDelete(item.id)} className="fa-solid fa-trash-can"></i> {/* Cambiado aquí */}
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
