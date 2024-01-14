import React, { useState, useEffect } from 'react';
import { GameContainer } from '../components/Game/Gamecomponents';
import { Container, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { LEAVE_GAME } from '../utils/mutations';
import { QUERY_SINGLE_GAME, QUERY_SINGLE_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import JoinedUsers from '../components/Lobby/JoinedUsers'


import  Auth  from '../utils/auth'

const Game = () => {
let gametype = "";
const { gameId } = useParams();
const [leaveGame] = useMutation(LEAVE_GAME)

const userId = Auth.getUser().data._id;
let status = "";

const { loading, error, data } = useQuery(
    gameId ? QUERY_SINGLE_GAME : QUERY_SINGLE_USER,
    {
        variables: {gameId: gameId, userId: [userId], gametype: gametype, status: status},
        pollInterval: 500,
    }
    );
const [users, setUsers] = useState(data?.game?.users);
const [balls, setBalls] = useState(data?.game?.balls);
const [gametypeData, setGametype] = useState(data?.game?.gametype)
const [gameStatus, setGameStatus] = useState(data?.game?.status)
useEffect(() => {
    if (data) {
        setUsers(data?.game?.users);
        setBalls(data?.game?.balls);
        setGametype(data?.game?.gametype);
        setGameStatus(data?.game?.status);
    }
}, [loading, data])

if (loading) return "Loading.........................."
if (error) return `Error  ${error.message}`


const leaveGameSubmit = async (event) => {
    try {
        const mutationResponse = await leaveGame({
            variables: { users: userId, gameId: gameId }
        })
        window.location.href = "/"
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
            <GameContainer balls={balls} users={users} userId={userId} gametype={gametypeData} status={gameStatus}/>
    <div className="col">
        <div className="joinedUsers">
                    <JoinedUsers users={users} />
            </div>
            </div>
        <div className="col">
        <Button className="leave-button" onClick={leaveGameSubmit}>Leave Game</Button>
        </div>
        </Container>
        {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
        </>
)}

export default Game