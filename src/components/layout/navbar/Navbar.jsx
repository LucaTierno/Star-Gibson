import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartWidget from "../../common/cartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function MyNavbar() {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navbar = document.getElementById("basic-navbar-nav");
      const btnHamburguesa = document.getElementById("btnHamburguesa");

      if (
        navbar &&
        !navbar.contains(event.target) &&
        event.target !== btnHamburguesa
      ) {
        navbar.classList.remove("show");
      }
    };
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <Navbar
        expand="lg"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: "100",
          backgroundColor: "#fff",
          borderBottom: "1px rgb(232, 232, 232) solid",
        }}
      >
        <Container>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            <Navbar.Brand href="#" className="fw-medium">
              Star Gibson
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Inicio
                </Link>
              </Nav.Link>
              <NavDropdown title="Guitarras" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.4">
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "rgb(230, 101, 15)",
                    }}
                  >
                    Todos los Modelos
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Link
                  to="/category/Les Paul"
                  style={{ textDecoration: "none" }}
                >
                  <NavDropdown.Item href="#action/3.1">
                    Les Paul
                  </NavDropdown.Item>
                </Link>
                <Link to="/category/SG" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="#action/3.2">SG</NavDropdown.Item>
                </Link>
                <Link to="/category/ES" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="#action/3.3">ES</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
            <Nav.Link href="#link" className="py-3">
              <CartWidget />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
