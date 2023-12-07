// import { LobbyContainer, LobbySidebar } from '../components/Lobby/JoinedUsers';
import JoinedUsers from '../components/Lobby/JoinedUsers';
import GameSelect from '../components/Lobby/GameSelect';
import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
// import { Navbar, Nav, Tab, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_LOBBY, QUERY_SINGLE_USER, QUERY_USERS } from '../utils/queries';
import { CREATE_GAME, LEAVE_LOBBY } from '../utils/mutations';
// import 'bootstrap/dist/css/bootstrap.min.css'

const Lobby = () => {
let gametype
const { lobbyId } = useParams();
const [createGame] = useMutation(CREATE_GAME);
const [leaveLobby] = useMutation(LEAVE_LOBBY);
const { loading, error, data } = useQuery(
    lobbyId ? QUERY_SINGLE_LOBBY : QUERY_SINGLE_USER,
    {
        variables: {lobbyId: lobbyId},
        pollInterval: 500,
    }
    );
const getGametype = (event) => {
    let text = (event.target.id)
    gametype = text.toString();
    console.log(gametype)
    return gametype = gametype
}


const [users, setUsers] = useState(data?.lobby.users);
    useEffect(() => {
        if (data) {
            setUsers(data.lobby.users)
        }
    // }, [])
    }, [loading, data])

    if (loading) return "Loading.........................."
    if (error) return `Error  ${error.message}`
const leaveLobbySubmit = async (event) => {
    const userId = Auth.getUser().data._id;
    console.log(userId);
    try {
        const mutationResponse = await leaveLobby({
            variables: { users: userId, lobbyId: lobbyId}
        })
        console.log(mutationResponse)
        
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
const createGameSubmit = async (event) => {
    // console.log(gametype)
        const userId = Auth.getUser().data._id;
        // const gametype = getGameType
        console.log(gametype)
        const userIds = users;
        try {
            const mutationResponse = await createGame({
                variables: { users: userIds, gametype: gametype}
            })
            
            let newGame = mutationResponse.data;
            let newGameId = newGame.createGame._id;
            // console.log(mutationResponse);
            // console.log(newGameId)
            window.location.href = (window.location.origin + "/game/" + newGameId)
            
        } catch (e) {
            console.log(gametype)
            console.error(e)
            return {
                code: e.extensions.response.status,
                success: false,
                message: e.extensions.response.body,
                track: null
            };
        }
    }
    const checkGametype = (event) => {
        console.log(gametype)
    }
return (
  
    <div className="flex-row justify-center">
        {loading ? (
            <div>Loading.....................</div>
        ) : (   
        <div class="container px-4 text-center">
        
            {/* <GameSelect /> */}
            {/* </GameSelect> */}
            <div class="row">
        <div class="col">
            <div class="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#cutthroat-select" aria-expanded="false" aria-controls="collapseExample">
                    Cutthroat
                </button>
                <div class="collapse" id="cutthroat-select">
                    <div class="card card-body">
                        Info about cutthroat plus a button to select the gametype
                    </div>
                    <Button onClick={(getGametype)} id="cutthroat">Select</Button>
                </div>
            </div>
        </div>
        <div class="col">

            <div class="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#standard-select" aria-expanded="false" aria-controls="collapseExample">
                    Standard
                </button>

                <div class="collapse" id="standard-select">
                    <div class="card card-body">
                        Info about regular pool plus a button to select the gametype
                    </div>
                    <Button onClick={(getGametype)} id="standard">Select</Button>
                </div>
            </div>
        </div>
        <div class="col">
        <div class="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#nineball-select" aria-expanded="false" aria-controls="collapseExample">
                Nine-Ball
            </button>

            <div class="collapse" id="nineball-select">
                <div class="card card-body">
                    Info about nine-ball plus a button to select the gametype
                </div>
                <Button onClick={(getGametype)} id="nineball">Select</Button>
                
            </div>
        </div>
        </div>
    </div>
    <div class="col-md-3 p-3">
            <JoinedUsers users={users} />
    </div> 
    <Button onClick={(checkGametype)}>Test</Button>
    <div class="row gx-5">
        <div class="col-md-3 p-3">
            <Button as={Link} to="/" onClick={leaveLobbySubmit} className="leave-button">Leave lobby</Button> 
        </div>

        <div class = "col-md-3 p-3">
            <Button onClick={createGameSubmit} className="start-button">Start game</Button>
        </div>
    </div> 
</div>
      
    )}
    </div>
   
)
}

export default Lobby