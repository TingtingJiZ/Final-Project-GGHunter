import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export const NavbarGame = () => {
	const { actions, store } = useContext(Context);
	const navigate = useNavigate()
	const [show, setShow] = useState(false);
	const [userLogin, setUserLogin] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleClick = (Platform) => {
		console.log("Has pinchao la opción " + Platform);

	}

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log(userLogin, userPassword);
		const dataToSend = {
			"email": userLogin,
			"password": userPassword
		};
		// 1. fetch al /api/login enviando en el body el dataToSend
		const uri = process.env.BACKEND_URL + '/api/login'
		const options = {
			method: 'POST',
			body: JSON.stringify(dataToSend),
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const response = await fetch(uri, options)
		if (!response.ok) {
			// Tratamos el error
			console.log('Error: ', response.status, response.statusText);
			if (response.status == 401) {
				const data = await response.json()
				// let alert = {
				//     visible: true,
				//     back: 'danger',
				//     text: data.message
				// }
				// actions.setAlert(alert)
				console.log("Error: " + response.status + response.statusText)
			}
			return
		}
		const data = await response.json()
		// Almaceno los datos en localStorage y en flux (store)
		localStorage.setItem("token", data.message);
		localStorage.setItem("user", JSON.stringify(data.results));
		actions.setCurrentUser(data.results);
		actions.setIsLoged(true)
		//actions.token(data.access_token)
		//actions.setAlert({ visible: true, back: 'info', text: data.message })
		// Me voy al dashboard
		handleClose();
		navigate('/profile')
	};

	const login = () => {
		handleShow();
	}
	const register = () => {
		navigate('/Signup')
	}
	const handleLogout = () => {
		try {
			// Eliminar items específicos de localStorage
			localStorage.removeItem("token");
			localStorage.removeItem("user");

			// Limpieza del estado global
			actions.setIsLoged(false);
			actions.setCurrentUser(null);
			//console.log("Usuario deslogado de la web");
			// Redirigir al usuario a la página de inicio
		} catch (error) {
			console.error('Error al intentar desloguear:', error);
		}
		navigate('/')
	}

	return (
		<>
			<Navbar expand="lg" className="navbarGame" data-bs-theme="dark">
				<Container fluid>
					<Navbar.Brand as={Link} to="/">Tienda </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<NavDropdown
							title="Plataformas"
							id={`offcanvasNavbarDropdown-expand`}
							className="mx-5 d-flex justify-content-center down"
						>
							<NavDropdown.Item as="div">
								<Link to="/pcgames" className="dropdown-item">PC</Link>
							</NavDropdown.Item>
							<NavDropdown.Item as="div">
								<Link to="/xbox" className="dropdown-item">Xbox</Link>
							</NavDropdown.Item>
							<NavDropdown.Item as="div">
								<Link to="/playstation" className="dropdown-item">PlayStation</Link>
							</NavDropdown.Item>
							<NavDropdown.Item as="div">
								<Link to="/nintendo" className="dropdown-item">Nintendo</Link>
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown
							title="Generos"
							id={`offcanvasNavbarDropdown-expand`}
							className="mx-5 d-flex justify-content-center down"
						>
							<NavDropdown.Item as="div">
								<Nav.Link href="/">Home</Nav.Link>
							</NavDropdown.Item>
							<NavDropdown.Item as="div">
								<Nav.Link href="/">Home</Nav.Link>
							</NavDropdown.Item>
							<NavDropdown.Item as="div">
								<Nav.Link href="/">Home</Nav.Link>
							</NavDropdown.Item>
						</NavDropdown>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<NavDropdown
								title={<FontAwesomeIcon icon={faUser} style={{ color: "#2d0bce", }} />}
								className="mx-5 d-flex justify-content-center down"
							>
								{store.currentUser === null ? (
									<>
										<NavDropdown.Item as="div">
											<Button onClick={login} variant="outline-success">Login</Button>
										</NavDropdown.Item>
										<NavDropdown.Item as="div">
											<Button onClick={() => register()} variant="outline-success">Regristrarse</Button>
										</NavDropdown.Item>
									</>
								) : (
									<NavDropdown.Item as="div">
										<Button onClick={handleLogout} variant="outline-success">LogOut</Button>
									</NavDropdown.Item>
								)}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				keyboard={false}
				className="card-register"

			>
				<Modal.Header closeButton className="card-modal">
					<Modal.Title><strong>Login</strong></Modal.Title>
				</Modal.Header>
				<Modal.Body className="card-modal">
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label><strong>Dirección de correo</strong></Form.Label>
							<Form.Control type="email" placeholder="" value={userLogin} onChange={(event) => setUserLogin(event.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label><strong>Contraseña</strong></Form.Label>
							<Form.Control type="password" placeholder="" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer className="card-modal">
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
					<Button variant="primary" onClick={handleLogin}>Inciar sesión</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
