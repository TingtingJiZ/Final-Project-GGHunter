import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const Signup = () => {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setshowPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        specialCharOrDigit: false,
        lowercase: false,
        uppercase: false
    });

    const navigate = useNavigate()

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setUserPassword(password);

        // Validar criterios de la contraseña
        setPasswordCriteria({
            length: password.length >= 8,
            specialCharOrDigit: /[!@#$%^&*(),.?":{}|<>0-9]/.test(password),
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password)
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log(userLogin, userPassword, userPasswordConfirm);
        const dataToSend = {
            "email": userLogin,
            "password": userPassword
        };
        const uri = process.env.BACKEND_URL + 'api/signup';
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
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);

        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.results))
        actions.setIsLoged(true);
        actions.setCurrentUser(data.results);
        //actions.setAlert({ visible: true, back: 'info', text: data.message })
        navigate('/')
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-4 mb-3 signup">
                <Col xs={12} md={8} lg={6}>
                    <Card>
                        <Card.Body className="signup">
                            <Form onSubmit={handleRegister}>
                                <Form.Label className="text-left d-block mb-1">
                                    <h4>Crear una cuenta</h4>
                                </Form.Label>
                                <Form.Label className="d-block text-info mb-3 signup-grey">
                                    ¡Consulta el precio de tu juegos favoritos, edita tu perfil y muchas cosas más!
                                </Form.Label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Introduce tu correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="" value={userLogin} onChange={(event) => setUserLogin(event.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Escriba su contraseña contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Container>
                                        <Row className="">
                                            <Col md={6}>
                                            {userPassword === ""?(<span>Sin datos</span>):
                                            (<span>Con cosas
                                            {/* passwordCriteria.length
                                            ? 
                                            <FontAwesomeIcon icon="fa-solid fa-circle-xmark" style={{color: "#ff0000",}} />:
                                            <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#ff8040",}} />) */}
                                            </span>)
                                            }
                                            Introduce al menos 8 caracteres
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form.Group>
                            </Form>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </Container>

    )
}