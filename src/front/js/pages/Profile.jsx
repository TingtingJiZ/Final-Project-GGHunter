import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import User_not_found from "../../img/User_not_found.jpg";
import Gg_default from "../../img/GG-DEFAULT.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Card } from 'react-bootstrap';


export const Profile = () => {
    const { actions, store } = useContext(Context);
    const handleImgError = (event) => {
        //people,species y planet
        event.target.src = <FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#000000", }} />
    }
    return (
        <>
            {store.currentUser == null ?
                <>
                    <div className="container text-center">
                        <h2 className="text-center">Logueate para ver tus datos!</h2>
                        <div className="row mt-2">
                            <div class="d-flex justify-content-center">
                                <img src={User_not_found} className="w-50 h-100" />
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="container">
                    <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                                type="button" role="tab" aria-controls="pills-home" aria-selected="true">{<FontAwesomeIcon icon={faUser} style={{ color: "#2d0bce", }} />}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                                type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><FontAwesomeIcon icon={faStar} /></button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">

                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                            tabindex="0">
                            <h2>Perfil del usuario</h2>
                            <div className="card-row">
                                <Container>
                                    <Row className="align-items-center">
                                        <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
                                            <Card.Img variant="top" style={{ width: "100%", maxWidth: "30rem" }} src={Gg_default} onError={handleImgError} />
                                        </Col>
                                        <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
                                            <Card className="mx-2 my-2" style={{ width: "100%", maxWidth: "18rem" }}>
                                                <Card.Body>
                                                    <Card.Title className="text-center font-weight-bold">Pepe</Card.Title>
                                                    <Card.Text><strong>Email:</strong>Hola</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}