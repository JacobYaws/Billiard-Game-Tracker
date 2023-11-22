import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Container, Modal, Button } from 'react-bootstrap';
// import { Navbar, Nav, Tab, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_LOBBY, JOIN_LOBBY, JOIN_GAME } from '../utils/mutations';
// import { QUERY_SINGLE_LOBBY } from '../utils/queries'

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

  

  // const [formState, setFormState] = useState({
  //   lobbyId: '',
  // });

  // const handleChange = (event) => {
  //   const { lobbyId, value } = event.target;

  //   setFormState({
  //     ...formState,
  //     [lobbyId]: value,
  //   });
  // };



  const createLobbySubmit = async (event) => {
    const userId = Auth.getUser().data._id;
    let gametype = "cutthroat"
    const users = [userId]

    console.log(users)
    try {
        const  mutationResponse  = await createLobby({
            variables: { users: users, gametype: gametype }
        })

        let newLobby = mutationResponse.data;
        let newLobbyId = newLobby.createLobby._id
        console.log(mutationResponse)
        console.log(newLobbyId)
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
    // event.preventDefault();
    try {
      const { data } = await joinGame({
        variables: { users, gameId },
      });
    console.log(data)
    setGameId('')
    
    } catch (e) {
      console.error(e);
    }
  }

  const joinLobbySubmit = async (event) => {
    const users = Auth.getUser().data._id;
    // event.preventDefault();
    try {
      const { data } = await joinLobby({
        variables: { users, lobbyId },
      });
    console.log(data)
    setLobbyId('');
    } catch (e) {
      console.error(e);
    }
  }
  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
      <>
      {Auth.loggedIn() ? (
      <Container fluid>
      
      <Button variant="success" onClick={createLobbySubmit}>Start a new game</Button>
        
      {/* <Button variant="success" onClick={() => setShowModal(true)}>Select a game to play</Button> */}
      {/* </Link> */}
     

    <Button onClick={() => handleShow(joinALobby)} key="joinlobby">Join a lobby</Button>
        <Modal
        size='lg'
        show={showModal === joinALobby}
        onHide={() => handleClose()}
        aria-labelledby='join-lobby'>
          <Modal.Header closeButton>
          </Modal.Header>
          <div className="col-12 col-lg-9">
              <input
                placeholder="Enter your lobby invite code"
                value={lobbyId}
                className="form-input w-100"
                onChange={(event) => setLobbyId(event.target.value)}
              />
            <Button variant="success" onClick={joinLobbySubmit}>Join</Button>
            </div>
            </Modal>



      <Button onClick={() => handleShow(joinAGame)} key="joingame">Join a game</Button>
          <Modal
          size='lg'
          show={showModal === joinAGame}
          onHide={() => handleClose()}
          aria-labelledby='join-game'>
            <Modal.Header closeButton>
            </Modal.Header>
          <div className="col-12 col-lg-9">
                <input
                  placeholder="Enter your game invite code"
                  value={gameId}
                  className="form-input w-100"
                  onChange={(event) => setGameId(event.target.value)}
                />
              <Button variant="success" onClick={joinGameSubmit}>Join</Button>
              </div>
              </Modal>
          </Container>
      ) : (
        <Container fluid>
          Welcome to cutthroat. Please login or signup to start playing.
        </Container>
      )}
      </>
  );
};

export default Home;