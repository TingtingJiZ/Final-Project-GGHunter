import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';


export const NavbarGame = () => {
	const handleClick = (Platform) =>{
		console.log("Has pinchao la opción "+ Platform);
		
	}
	return (
		<Navbar expand="lg" className="navbarGame" data-bs-theme="dark">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">Tienda </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<NavDropdown
						title="Platform"
						id={`offcanvasNavbarDropdown-expand`}
						className="mx-5 d-flex justify-content-center"
					>
						<NavDropdown.Item as="div">
							<Button onClick={() => handleClick("PLataforma 1")} variant="outline-success">PLataforma 1</Button>
						</NavDropdown.Item>
						<NavDropdown.Item as="div">
							<Button onClick={() => handleClick("PLataforma 2")} variant="outline-success">PLataforma 2</Button>
						</NavDropdown.Item>
						<NavDropdown.Item as="div">
							<Button onClick={() => handleClick("PLataforma 3")} variant="outline-success">PLataforma 3</Button>
						</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown
						title="Generos"
						id={`offcanvasNavbarDropdown-expand`}
						className="mx-5 d-flex justify-content-center"
					>
						<NavDropdown.Item as="div">
							<Button onClick={() => handleClick("PLataforma 1")} variant="outline-success">PLataforma 1</Button>
						</NavDropdown.Item>
						<NavDropdown.Item as="div">
							<Button onClick={() => handleClick("PLataforma 2")} variant="outline-success">PLataforma 2</Button>
						</NavDropdown.Item>
						<NavDropdown.Item as="div">
							<Button onClick={() => handleClick("PLataforma 3")} variant="outline-success">PLataforma 3</Button>
						</NavDropdown.Item>
					</NavDropdown>
					<Nav className="justify-content-end flex-grow-1 pe-3">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/category">Explorador de productos</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
