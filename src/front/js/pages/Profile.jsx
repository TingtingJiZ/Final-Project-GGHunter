import React, { useContext, useEffect, useState  } from "react";
import { Context } from "../store/appContext.js";
import User_not_found from "../../img/User_not_found.jpg";
import Gg_default from "../../img/GG-DEFAULT.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import logo from '../../img/Recurso 1_png.png';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Favourites } from "./Favourites.jsx";


export const Profile = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");
    const [gamesData, setGamesData] = useState(""); 
    const handleImgError = (event) => {
        event.target.src = Gg_default;
    };

    const handleFavourites = () => {
        navigate("/favourites");
    };
    const handleAdminButtonClick = async() =>{
        await actions.getGamesPc();

        setGamesData(JSON.stringify(store.gamesPc, null, 2));
        
    }
    const isAdmin = store.currentUser?.rol === "admin";
    
    const renderTabContent = () => {
        switch (activeTab) {
            case "home":
                return (
                    <>
                        <h1 className="fw-bold fs-1">¡Hola {store.currentUser.alias}!</h1>
                        <div className="card-row">
                            <Container>
                                <Card.Img className="mt-1" src={logo} alt="Logo" style={{ height: '90px', width: '85px' }} />
                                <Row className="align-items-center">
                                    <div className="container div-profile my-4">
                                        <Card.Body className="fs-3 card-row">
                                            <div className="row gy-3">
                                                <div className="cols-12 cols-md-4 cols-xl-1">
                                                    <Card.Text><strong>Nombre:</strong> <br />{store.currentUser.alias}</Card.Text>
                                                </div>
                                                <div className="cols-12 cols-md-4 cols-xl-1">
                                                    <Card.Text><strong>Apellidos:</strong><br />{store.currentUser.lastname}</Card.Text>
                                                </div>
                                                <div className="cols-12 cols-md-4 cols-xl-1">
                                                    <Card.Text><strong>Email:</strong><br />{store.currentUser.email}</Card.Text>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </Row>
                            </Container>
                        </div>
                    </>
                );
            case "favourites":
                return (
                    <div>
                        <Favourites/>
                    </div>
                );
            case "admin":
                return (
                    <div>
                        <h2>Área de Administración</h2>
                        <Button variant="primary" onClick={handleAdminButtonClick}>
                            Botón de Admin
                        </Button>
                        <Form.Group className="mt-3">
                            <Form.Label>Datos de Juegos PC:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                value={gamesData}
                                readOnly
                            />
                        </Form.Group>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {store.currentUser == null ? (
                <>
                    <div className="container text-center">
                        <h2 className="text-center">¡Logueate para ver tus datos!</h2>
                        <div className="row mt-2">
                            <div className="d-flex justify-content-center">
                                <img src={User_not_found} className="w-50 h-100" alt="User not found" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="container">
                    <div className="tab-content" id="pills-tabContent">
                        {renderTabContent()}
                    </div>
                    
                    {/* Botones de Pestañas Movidos Abajo */}
                    <ul className="nav nav-pills mb-3 justify-content-center mt-4" id="pills-tab" role="tablist">
                        {/* Botón visible para todos */}
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                                id="pills-home-tab"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected={activeTab === "home"}
                                onClick={() => setActiveTab("home")}
                            >
                                <FontAwesomeIcon icon={faUser} style={{ color: "#2d0bce" }} />
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "favourites" ? "active" : ""}`}
                                id="pills-profile-tab"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected={activeTab === "favourites"}
                                onClick={() => setActiveTab("favourites")}
                            >
                                <FontAwesomeIcon icon={faStar} style={{ color: "#2d0bce" }} />
                            </button>
                        </li>
                        {isAdmin ? (
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
                                    id="pills-admin-tab"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-admin"
                                    aria-selected={activeTab === "admin"}
                                    onClick={() => setActiveTab("admin")}
                                >
                                    <i className="fa-solid fa-user-lock" style={{ color: "#2d0bce" }}></i>
                                </button>
                            </li>
                        ) : null}
                    </ul>
                </div>
            )}
        </>
    );
};