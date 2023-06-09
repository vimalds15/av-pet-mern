import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Container,Nav,Navbar, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../services/user/UserLoginSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect className='border-bottom border-3'>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
          <img
              src="/logo-min.png"
              width="70"
              height="45"
              style={{objectFit:"cover"}}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="ms-auto">
          <LinkContainer to="/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </LinkContainer>
            {userInfo
            ?
            (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            )
            :

            <LinkContainer to="/login">
            <Nav.Link > <i className='fas fa-user'></i> Sign In</Nav.Link>    
            </LinkContainer>
            }
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title={"Admin"} id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header