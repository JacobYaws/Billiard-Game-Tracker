import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../../pages/Signup';
import LoginForm from '../../pages/Login';
import { QUERY_STATUS, QUERY_LOBBY_STATUS } from '../../utils/queries';
import { useQuery } from '@apollo/client';


import Auth from '../../utils/auth';
let GameId = null;
let LobbyId = null;
let inGameStatus = false;
let inLobbyStatus = false;
let gameDataArray = [];
let lobbyDataArray = [];


const AppNavbar = () => {
  console.log("ping")
 
  const [showModal, setShowModal] = useState(false);
  const userId = Auth.loggedIn() ? Auth.getUser().data._id : null;

 
const QueryMultiple = () => {
  const data = useQuery(QUERY_STATUS, 
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
    },);
    console.log(data.data)
    const data2 = useQuery(QUERY_LOBBY_STATUS, 
      {
          variables: {userId: userId},
          pollInterval: 500,
          fetchPolicy: "network-only",
          refectOnWindowFocus: true,
          onCompleted: (data) => {
            
            console.log("complete")
            let pathName = window.location.pathname;
            let lobbyId = (data.inLobby._id);
          if (lobbyId !== undefined && !pathName.includes("lobby") && lobbyId !== null) {
            console.log("inLobby")
            LobbyId = lobbyId
            // console.log(LobbyId)
            inLobbyStatus = true
          }
          }
      },)
      const newData = data.data;
      const newData2 = data2.data;
      // console.log(newData, newData2)
      return gameDataArray.push(data), lobbyDataArray.push(data2)
}
  console.log(gameDataArray)
  console.log(lobbyDataArray)
  let data = gameDataArray.find((element) => element?.data)?.data
  // let data = dataArray.find((element) => element?.data)?.data
  let data2 = lobbyDataArray.find((element) => element?.data)?.data
  QueryMultiple();
  console.log(data)
  console.log(data2)

 
  

 
  const [inLobbyStatus, setInLobbyStatus] = useState(data2?.inLobby?._id != undefined && data2?.inLobby?._id != null ? true : false);
  const [LobbyId, setLobbyId] = useState(data2?.inLobby?._id)
  const [currentlyOnLobbyPage, setCurrentlyOnLobbyPage] = useState(!window.location.pathname.includes("lobby"))
console.log(LobbyId)

  const [inGameStatus2, setInGameStatus] = useState(data?.inGame?._id != undefined && data?.inGame?._id != null ? true : false);
  const [GameId2, setGameId] = useState(data?.inGame?._id)
  const [currentlyOnGamePage, setCurrentlyOnGamePage] = useState(!window.location.pathname.includes("game"))
    useEffect(() => {
      if (data) { 
        setInGameStatus(data?.inGame?._id != undefined && data?.inGame?._id != null ? true : false)
        setGameId(data?.inGame?._id)
        setCurrentlyOnGamePage(!window.location.pathname.includes("game"))
      }
      if (data2) {
        setInLobbyStatus(data2?.inLobby?._id != undefined && data2?.inLobby?._id != null ? true : false)
        setLobbyId(data2?.inLobby?._id)
        setCurrentlyOnLobbyPage(!window.location.pathname.includes("lobby"))
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

    const inLobbyRedirectCheck = () => {
      if(inLobbyStatus) {
        console.log("redirecting to lobby: ")
        console.log(LobbyId)
        console.log(inLobbyStatus)
        window.location.href = (window.location.origin + "/lobby/" + LobbyId)
      }
    }
    const pagePath = useLocation()

      
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
            {inGameStatus2 && !pagePath.pathname.includes("lobby") ? ( 
              <>
              <Nav.Link as={Link} to={`/lobby/${LobbyId}`}>Back to Lobby</Nav.Link>
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