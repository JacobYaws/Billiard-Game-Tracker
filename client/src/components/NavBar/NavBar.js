import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../../pages/Signup';
import LoginForm from '../../pages/Login';
import { QUERY_STATUS } from '../../utils/queries';
import { useQuery } from '@apollo/client';


import Auth from '../../utils/auth';
let GameId = null;
let inGameStatus = false;

const AppNavbar = () => {
  console.log("ping")
 
  const [showModal, setShowModal] = useState(false);
  const userId = Auth.loggedIn() ? Auth.getUser().data._id : null;
  
    const { loading, error, data } = useQuery(
      QUERY_STATUS,
      {
          variables: {userId: userId},
          pollInterval: 500,
          fetchPolicy: "network-only",
          refectOnWindowFocus: true,
          onCompleted: (data) => {
            let pathName = window.location.pathname;
            let gameId = (data.inGame._id);
          if (gameId !== undefined && !pathName.includes("game") && gameId !== null) {
            console.log("inGame")
            //  window.location.href = (window.location.origin + "/game/" + gameId);
            GameId = gameId
            inGameStatus = true
          }
          }
      },
      );

      const [inGameStatus2, setInGameStatus] = useState(data?.inGame?._id != undefined && data?.inGame?._id != null ? true : false);
  const [GameId2, setGameId] = useState(data?.inGame?._id)
  const [currentlyOnGamePage, setCurrentlyOnGamePage] = useState(!window.location.pathname.includes("game"))
    useEffect(() => {
      if (data) { 
        setInGameStatus(data?.inGame?._id != undefined && data?.inGame?._id != null ? true : false)
        setGameId(data?.inGame?._id)
        setCurrentlyOnGamePage(!window.location.pathname.includes("game"))
      }
    })

    const inGameRedirectCheck = () => {
      if(inGameStatus2) {
        console.log("redirecting to game: ")
        console.log(GameId2)
        console.log(inGameStatus2)
        window.location.href = (window.location.origin + "/game/" + GameId2)
      }
    }
    const pagePath = useLocation()
    console.log(pagePath)
      // let inGame = data?.inGame?._id;
      // console.log(inGame)
      // const checkInGameStatus = () => {
      //   console.log("click")
      //   if (inGame !== undefined) {
      //     console.log('click')
      //     window.location.reload()
      //   }
      

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          {/* <Navbar.Brand as={Link} to='/' className="p-3"> */}
          <Navbar.Brand as={Link} to='/' className="p-3">
          {/* <Navbar.Brand as={Link} to='/' onClick={() => window.location.reload()} className="p-3"> */}
            Cutthroat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
            {inGameStatus2 && !pagePath.pathname.includes("game") ? ( 
              <>
              <Nav.Link as={Link} to={`/game/${GameId2}`}>Back to Game</Nav.Link>
              </>
              
            ) : <></>}
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              {/* if user is logged in show saved games and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/stats'>
                    See Your Stats
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
  // checkInGameStatus();
};

export default AppNavbar;