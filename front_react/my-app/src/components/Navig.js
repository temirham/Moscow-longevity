import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch} from "react-redux";
import {delSumAction, setIsAuthenticatedAction, useIsAuthenticated, useIsStaff} from "../slices/dataSlice";




function BasicExample() {

    const dispatch = useDispatch()
    const isAuthenticated = useIsAuthenticated()
    const isStaff = useIsStaff()
    return (
        <Navbar bg="light" expand="lg" className="skrug">
            <Container>
                <Navbar.Brand href="/"><img width={30} height={30} src={"/img/1828871.png"}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/catalog">Каталог</Nav.Link>
                        {!isAuthenticated ? <div></div> :
                        <NavDropdown title="Профиль" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/drawer">Корзина</NavDropdown.Item>
                            <NavDropdown.Item href="/mybooking">
                                Мои бронирования
                            </NavDropdown.Item>
                            {!isStaff ? <div></div> :
                                <NavDropdown.Item href="/manage">Страница Менеджера</NavDropdown.Item>
                            }
                            {!isStaff ? <div></div> :
                                <NavDropdown.Item href="/newservice">Добавить услугу</NavDropdown.Item>
                            }
                        </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;