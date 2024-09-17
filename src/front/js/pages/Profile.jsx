import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import User_not_found from "../../img/User_not_found.jpg";
import Gg_default from "../../img/GG-DEFAULT.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card } from 'react-bootstrap';
import logo from '../../img/Recurso 1_png.png';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
export const Profile = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const handleImgError = (event) => {
        event.target.src = Gg_default;
    };

    const handleFavourites = () => {
        navigate("/favourites");
    };
    const isAdmin = store.currentUser?.rol === "admin";
    return (
        <>
            {store.currentUser == null ?
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
                :
                <div className="container">
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
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
                                        <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                                            {/* Botón visible para todos */}
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link active"
                                                    id="pills-home-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-home"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-home"
                                                    aria-selected="true"
                                                >
                                                    <FontAwesomeIcon icon={faUser} style={{ color: "#2d0bce" }} />
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"
                                                    id="pills-profile-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-profile"
                                                    aria-selected="false"
                                                    onClick={handleFavourites}
                                                >
                                                    <FontAwesomeIcon icon={faStar} />
                                                </button>
                                            </li>
                                            {isAdmin ? (
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link"
                                                        id="pills-admin-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#pills-admin"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="pills-admin"
                                                        aria-selected="false"
                                                    >
                                                        <i className="fa-solid fa-user-lock"></i>
                                                    </button>
                                                </li>
                                            ) : null}
                                        </ul>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
