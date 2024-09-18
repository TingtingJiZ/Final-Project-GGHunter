import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


export const Signup = ({ show, handleClose }) => {
    const { actions, store } = useContext(Context);
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [userAlias, setUserAlias] = useState('');
    const [showPassword, setshowPassword] = useState('');
    const navigate = useNavigate();
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        specialCharOrDigit: false,
        lowercase: false,
        uppercase: false,
    });

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setUserPassword(password);
        setPasswordCriteria({
            length: password.length >= 8,
            specialCharOrDigit: /[\W_0-9]/.test(password),
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        //Console.log(userLogin, userPassword);
        const dataToSend = {
            "alias": userAlias,
            "lastname": userLastname,
            "email": userLogin,
            "password": userPassword
        };
        if (!passwordCriteria.length || !passwordCriteria.lowercase || !passwordCriteria.uppercase || !passwordCriteria.specialCharOrDigit) {
            //Console.log('Error: La contraseña no cumple con todos los criterios');
            return;
        }
        const uri = process.env.BACKEND_URL + '/api/signup';
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            // tratar el error
            //Console.log('Error: ', response.status, response.statusText);
            return
        }

        const data = await response.json()
        localStorage.setItem("token", data.message);
        localStorage.setItem("user", JSON.stringify(data.results));
        actions.setCurrentUser(data.results);
        actions.setIsLoged(true)
        //Console.log(data);
        navigate("/")
        handleClose();

        // Lógica de registro
    };
    return (
        <Modal
            onHide={handleClose}
            backdrop="static"
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}
            className="card-register"
            show={show}

        >
            <Modal.Header closeButton className="custom-gradient">
                <Modal.Title>Crear una cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-gradient">
                <Form.Label className="d-block text-white mb-3 signup-grey fs-6">
                    ¡Consulta el precio de tu juegos favoritos en varias tiendas!
                </Form.Label>
                <Row className="justify-content-md-center mt-4 mb-3 custom-gradient">
                    <Col xs={12}>
                        <Card>
                            <Card.Body className="custom-gradient">
                                <Form onSubmit={handleRegister}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control type="text" placeholder="" value={userAlias} onChange={(event) => setUserAlias(event.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicLastname">
                                        <Form.Label>Apellidos:</Form.Label>
                                        <Form.Control type="text" placeholder="" value={userLastname} onChange={(event) => setUserLastname(event.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Introduce tu correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={userLogin}
                                            onChange={(event) => setUserLogin(event.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Escriba su contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={userPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </Form.Group>

                                    {/* Validación de contraseña */}
                                    <Form.Group>
                                        <Container>
                                            <Row>
                                                <Col md={6}>
                                                    {userPassword === "" ? (
                                                        <span>
                                                            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000" }} />
                                                        </span>
                                                    ) : !passwordCriteria.length ? (
                                                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000" }} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#008000" }} />
                                                    )}
                                                    Introduce al menos 8 caracteres
                                                </Col>
                                                <Col md={6}>
                                                    {userPassword === "" ? (
                                                        <span>
                                                            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000" }} />
                                                        </span>
                                                    ) : !passwordCriteria.specialCharOrDigit ? (
                                                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000" }} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#008000" }} />
                                                    )}
                                                    Introduce al menos un carácter especial
                                                </Col>
                                                <Col md={6}>
                                                    {userPassword === "" ? (
                                                        <span>
                                                            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000" }} />
                                                        </span>
                                                    ) : !passwordCriteria.lowercase ? (
                                                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000" }} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#008000" }} />
                                                    )}
                                                    Introduce al menos 1 carácter en minúsculas
                                                </Col>
                                                <Col md={6}>
                                                    {userPassword === "" ? (
                                                        <span>
                                                            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#000000" }} />
                                                        </span>
                                                    ) : !passwordCriteria.uppercase ? (
                                                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000" }} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#008000" }} />
                                                    )}
                                                    Introduce al menos 1 carácter en mayúsculas
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form.Group>
                                    <Row className="justify-content-md-center mt-4">
                                        <Col md={6}>
                                            <Button className="w-100" variant="primary" type="submit">
                                                Crear una cuenta
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}