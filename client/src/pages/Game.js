import React, { useState, useEffect } from 'react';
import { GameContainer } from '../components/Game/Gamecomponents';
// import { useParams } from "react-router-dom"
// import BallList from '../components/BallList/BallList';
// import BallArray from '../utils/ballArray'
import { Container, Button, Modal } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LEAVE_GAME } from '../utils/mutations';
import { QUERY_SINGLE_GAME, QUERY_SINGLE_USER, QUERY_USERS } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
import JoinedUsers from '../components/Lobby/JoinedUsers'


import  Auth  from '../utils/auth'

const Game = () => {
let gametype = ""
const { gameId } = useParams();
const [leaveGame] = useMutation(LEAVE_GAME)

const [showModal, setShowModal] = useState(false);
const userId = Auth.getUser().data._id;

const { loading, error, data } = useQuery(
    gameId ? QUERY_SINGLE_GAME : QUERY_SINGLE_USER,
    {
        variables: {gameId: gameId, userId: [userId], gametype: gametype},
        pollInterval: 500,
    }
    );
// console.log(data)
const [users, setUsers] = useState(data?.game.users);
// console.log(data)
const [balls, setBalls] = useState(data?.game.balls);
const [gametypeData, setGametype] = useState(data?.game.gametype)
useEffect(() => {
    if (data) {
        setUsers(data.game.users);
        setBalls(data.game.balls);
        setGametype(data.game.gametype)
    }
}, [loading, data])

if (loading) return "Loading.........................."
if (error) return `Error  ${error.message}`
// if (loading) return "Loading.........................."
// if (error) return `Error  ${error.message}`
console.log(balls, users)

// useEffect(() => {
//     if (data) {
//         setUsers(data.game.users)
//     }
// // }, [])
// }, [loading, data])
console.log(gametypeData)

const leaveGameSubmit = async (event) => {
    console.log(userId)
    try {
        const mutationResponse = await leaveGame({
            variables: { users: userId, gameId: gameId }
        })
        window.location.href = "/"
        console.log(mutationResponse)
    } catch (e) {
        console.log(e)
        return {
            code: e.extensions.response.status,
            success: false,
            message: e.extensions.response.body,
            track: null
        };
    }
}

return(
    <>
    <Container>
        <div>
                Gametype: {data.game.gametype}
            </div>
            <GameContainer balls={balls} users={users} userId={userId} gametype={gametypeData}/>

            {/* </GameContainer> */}
    <div className="col-md-3 p-3">
                    <JoinedUsers users={users} />
            </div>
            
        {/* <Button onClick={() => setShowModal(true)}>Start a new game</Button>
        <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='ball-select-modal'>
            <Modal.Header closeButton>
                <Modal.Title id='ball-select'>
                  <Button onClick={startGameSubmit}>Start Game</Button>
                </Modal.Title>
            </Modal.Header>
            <div className='mb2' id="select-ball">
            </div>
        </Modal> */}

        <Button onClick={leaveGameSubmit}>Leave Game</Button>
        </Container>
        {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
        </>
)}

export default Game