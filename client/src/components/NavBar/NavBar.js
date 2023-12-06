import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../../pages/Signup';
import LoginForm from '../../pages/Login';
import { QUERY_STATUS, QUERY_SINGLE_USER, QUERY_USERS } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';


import Auth from '../../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const userId = Auth.loggedIn() ? Auth.getUser().data._id : null;
    const { loading, error, data } = useQuery(
      QUERY_STATUS,
      {
          // variables: {userId: Auth.getUser().data._id},
          variables: {userId: userId},
          pollInterval: 500,
      }
      );
  // console.log(data.inGame._id)
  let gameId = data?.inGame?._id
      console.log(gameId)
      console.log(window.location)
      let pathName = window.location.pathname;
      console.log(pathName)
      if (gameId !== undefined && !pathName.includes("game") && gameId !== null) {
  window.location.href = (window.location.origin + "/game/" + gameId)
      }
  // window
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className="p-3">
            Cutthroat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              {/* if user is logged in show saved games and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/games'>
                    See Your Games
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;