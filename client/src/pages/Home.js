import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Container, Modal, Button, Tab, Nav } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_LOBBY, JOIN_LOBBY, JOIN_GAME } from '../utils/mutations';
import LoginForm from './Login'
import SignUpForm from './Signup'

const Home = () => {
  
  const [showModal, setShowModal] = useState(undefined);
  const handleClose = () => setShowModal(undefined);
  const handleShow = (id) => setShowModal(id)
  const [lobbyId, setLobbyId] = useState('');
  const [gameId, setGameId] = useState('');
  const [createLobby, { error }] = useMutation(CREATE_LOBBY);
  const [joinLobby] = useMutation(JOIN_LOBBY);
  const [joinGame] = useMutation(JOIN_GAME);
  const joinAGame = 'joingame';
  const joinALobby = 'joinlobby'

  const createLobbySubmit = async (event) => {
    const userId = Auth.getUser().data._id;
    let gametype = "";
    const users = [userId];
    try {
      const  mutationResponse  = await createLobby({
          variables: { users: users, gametype: gametype }
      })

        let newLobby = mutationResponse.data;
        let newLobbyId = newLobby.createLobby._id
        window.location.href = "lobby/" + newLobbyId
    } catch (e) {
        console.error(e)
        return {
          code: e.extensions.response.status,
          success: false,
          message: e.extensions.response.body,
          track: null
        };
    }
  }

  const joinGameSubmit = async (event) => {
    const users = Auth.getUser().data._id;
    try {
      const { data } = await joinGame({
        variables: { users, gameId },
      });
    setGameId('')
    window.location.href = (window.location.origin + "/game/" + gameId)
    } catch (e) {
      console.error(e);
    }
  }

  const joinLobbySubmit = async (event) => {
    const users = Auth.getUser().data._id;
    try {
      const { data } = await joinLobby({
        variables: { users, lobbyId },
      });
    window.location.href = (window.location.origin + "/lobby/" + lobbyId)
    } catch (e) {
      console.error(e);
    }
  }
  return (
      <>
      {Auth.loggedIn() ? (
      <Container fluid>
  <div className="col">
    <div className="col-sm-6 mb-3 mb-sm-0 p-3 text-center mx-auto">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create a New Game</h5>
          <p className="card-text">Click below to go to the create game page. You'll be placed in a lobby where you can choose which game
          you would like to play. Once the enough people have joined for your game type, you can start tracking your score!</p>
          <Button variant="success" onClick={createLobbySubmit}>Start a Lobby</Button>
          
        </div>
      </div>
    </div>
    <div className="col-sm-6 p-3 text-center mx-auto">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Join a Lobby</h5>
          <p className="card-text">If you have a lobby invite, click below to join and you will be placed in the lobby.</p>
          <Button onClick={() => handleShow(joinALobby)} key="joinlobby">Join a Lobby</Button>
          <Modal
          size='lg'
          show={showModal === joinALobby}
          onHide={() => handleClose()}
          aria-labelledby='join-lobby'>
            <Modal.Header closeButton>
              <h2 className="mx-5">Join a Lobby</h2>
            </Modal.Header>
            <div className="col-12 col-lg-9 mx-auto text-center">
                <input
                  placeholder="Enter your lobby invite code"
                  value={lobbyId}
                  className="form-input w-100 text-center m-3"
                  onChange={(event) => setLobbyId(event.target.value)}
                />
              <Button variant="success" className="m-3" onClick={joinLobbySubmit}>Join</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>

    <div className="col-sm-6 p-3 text-center mx-auto">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Join a Game</h5>
          <p className="card-text">If you have a lobby invite, click below to join and you will be placed in the game.</p>
          <Button onClick={() => handleShow(joinAGame)} key="joingame">Join a Game</Button>
            <Modal
            size='lg'
            show={showModal === joinAGame}
            onHide={() => handleClose()}
            aria-labelledby='join-game'>
              <Modal.Header closeButton>
                <h2 className="mx-5">Join a Game</h2>
              </Modal.Header>
            <div className="col-12 col-lg-9 mx-auto text-center" >
                  <input
                    placeholder="Enter your game invite code"
                    value={gameId}
                    className="form-input w-100 text-center m-3"
                    onChange={(event) => setGameId(event.target.value)}
                  />
                <Button variant="success" className="m-3" onClick={joinGameSubmit}>Join</Button>
              </div>
            </Modal>
        </div>
      </div>
    </div>
  </div>
          </Container>
      ) : (
        <Container fluid className="p-5">
          <div className="card text-center mx-auto col-sm-6 p-3">
            <div className="card-body">
          Welcome to cutthroat. Please login or signup to start playing.
            </div>
            <div className="col-sm-6 text-center mx-auto">
              <div className="col">
                <Button onClick={() => setShowModal(true)} className="mx-3">Login or Sign Up</Button>
                <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
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
              </div>
            </div>
          </div>
         
        </Container>
      )}
      </>
  );
};

export default Home;